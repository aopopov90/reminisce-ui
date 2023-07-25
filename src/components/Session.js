import React, { useState, useEffect } from 'react';
import { API_URL } from '../config/config';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import io from 'socket.io-client';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));

const Session = () => {
  const [sessionData, setSessionData] = useState(null);
  const { sessionId } = useParams(); 

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        console.log(`sessionId: ${sessionId}`);
        const response = await axios.get(`${API_URL}/sessions/${sessionId}`);
        setSessionData(response.data);
      } catch (error) {
        console.error('Error fetching session details:', error);
      }
    };

    fetchSessionData();

    // Set up WebSocket event listeners
    const socket = io(API_URL, { path: '/websocket' }); // Connect to the WebSocket server with the correct path
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('/topic/newComment', (newComment) => {
      // Handle the newly received comment from the WebSocket
      console.log('New comment received:', newComment);

      // Update the new comments state with the new comment
    //   setNewComments((prevComments) => [...prevComments, newComment]);
    });

    // Clean up WebSocket event listeners when the component unmounts
    return () => {
      socket.disconnect(); // Disconnect the WebSocket when the component unmounts
      socket.off('connect');
      socket.off('/topic/newComment');
    };
  }, [sessionId]); // Add sessionId as a dependency to the useEffect hook

  if (!sessionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
            <Stack spacing={2}>
                {sessionData.comments.map((comment) => {
                    if (comment.categoryId == 1) {
                        return (<Item>{comment.text}</Item>);
                    }
                })}
            </Stack>
        </Grid>
        <Grid item xs={4}>
        <Stack spacing={2}>
                {sessionData.comments.map((comment) => {
                    if (comment.categoryId == 2) {
                        return (<Item>{comment.text}</Item>);
                    }
                })}
            </Stack>
        </Grid>
        <Grid item xs={4}>
        <Stack spacing={2}>
                {sessionData.comments.map((comment) => {
                    if (comment.categoryId == 3) {
                        return (<Item>{comment.text}</Item>);
                    }
                })}
            </Stack>
        </Grid>
      </Grid>
    </Box>
      <pre>{JSON.stringify(sessionData, null, 2)}</pre>
    </div>
  );
};

export default Session;
