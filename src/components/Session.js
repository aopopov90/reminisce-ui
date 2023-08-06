import React, { useState, useEffect } from 'react';
import { API_URL } from '../config/config';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SockJsClient from 'react-stomp';
import CommentInput from './CommentInput'; // Renamed from CategoryInput
import CommentSection from './CommentSection';

const SOCKET_URL = `${API_URL}/websocket`;

const categories = [
  { id: 1, label: "What went well?", color: "success" },
  { id: 2, label: "What could be improved", color: "warning" },
  { id: 3, label: "An idea to share", color: "secondary" }
];

const Session = () => {
  const [sessionData, setSessionData] = useState(null);
  const { sessionId } = useParams();
  const [newComments, setNewComments] = useState({});

  const onNewCommentChange = (categoryId, value) => {
    setNewComments(prevComments => ({
      ...prevComments,
      [categoryId]: value
    }));
  };

  const onCommentReceived = (comment) => {
    const updatedSessionData = {
      ...sessionData,
      comments: [...sessionData.comments, comment]
    };
    setSessionData(updatedSessionData);
  }

  const onReactionReceived = (reaction) => {
    console.log(reaction);
    // Find the index of the comment to update
    const commentIndex = sessionData.comments.findIndex(comment => comment.id === reaction.commentId);
  
    if (commentIndex !== -1) {
      // Create a copy of the comments array to update
      const updatedComments = [...sessionData.comments];
      
      // Update the reactions for the specific comment
      updatedComments[commentIndex] = {
        ...updatedComments[commentIndex],
        reactions: [...updatedComments[commentIndex].reactions, reaction]
      };

      // Update the sessionData with the updated comments array
      setSessionData(prevSessionData => ({
        ...prevSessionData,
        comments: updatedComments
      }));
    }
  }

  const createComment = async (categoryId) => {
    try {
      const response = await axios.post(`${API_URL}/comments`, {
        sessionId: sessionId,
        text: newComments[categoryId],
        categoryId: categoryId
      });
      setNewComments(prevComments => ({
        ...prevComments,
        [categoryId]: ''
      }));
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const likeComment = async (commentId) => {
    try {
      const response = await axios.post(`${API_URL}/reactions`, {
        commentId: commentId,
        reactionType: 'LIKE'
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get(`${API_URL}/sessions/${sessionId}`);
        setSessionData(response.data);
      } catch (error) {
        console.error('Error fetching session details:', error);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  if (!sessionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/newComment']}
        onDisconnect={() => console.log("Disconnected!")}
        onMessage={msg => onCommentReceived(msg)}
        debug={false}
      />
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/newReaction']}
        onDisconnect={() => console.log("Disconnected!")}
        onMessage={msg => onReactionReceived(msg)}
        debug={false}
      />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid item xs={4} key={category.id}>
              <Stack spacing={2}>
                <CommentInput
                  label={category.label}
                  color={category.color}
                  categoryId={category.id}
                  value={newComments[category.id] || ''}
                  onChange={onNewCommentChange}
                  onSubmit={createComment}
                />
                <CommentSection 
                  sessionData={sessionData}
                  categoryId={category.id}
                  onSubmit={likeComment}
                />
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
      <pre>{JSON.stringify(sessionData, null, 2)}</pre>
    </div>
  );
};

export default Session;
