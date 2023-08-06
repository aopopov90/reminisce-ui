import React, { useState, useEffect } from 'react';
import { API_URL } from '../config/config';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import SockJsClient from 'react-stomp';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const SOCKET_URL = `${API_URL}/websocket`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const Session = () => {
  const [sessionData, setSessionData] = useState(null);
  const { sessionId } = useParams();
  const [newComments, setNewComments] = useState({});
  const onNewCommentChange = (categoryId, value) => {
    console.log(categoryId);
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

  const createComment = async (categoryId) => {
    try {
      const response = await axios.post(`${API_URL}/comments`, { sessionId: sessionId, text: newComments[categoryId], categoryId: categoryId });
      setNewComments(prevComments => ({
        ...prevComments,
        [categoryId]: ''
      }));
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

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
  }, [sessionId]); // Add sessionId as a dependency to the useEffect hook

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
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
              <Stack spacing={2}>
                  <TextField label="What went well?" color="success" focused 
                    value={newComments[1]}
                    onChange={(e) => onNewCommentChange(1, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        createComment(1);
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton
                            edge="end"
                            onClick={() => createComment(1)}
                          >
                            <AddIcon></AddIcon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}/>
                  {sessionData.comments.map((comment) => {
                      if (comment.categoryId == 1) {
                          return (<Item>{comment.text}</Item>)
                      }
                  })}
              </Stack>
          </Grid>
          <Grid item xs={4}>
              <Stack spacing={2}>
                  <TextField label="What could be improved" color="warning" focused 
                    value={newComments[2]}
                    onChange={(e) => onNewCommentChange(2, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        createComment(2);
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton
                            edge="end"
                            onClick={() => createComment(2)}
                          >
                            <AddIcon></AddIcon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    />
                  {sessionData.comments.map((comment) => {
                      if (comment.categoryId == 2) {
                          return (<Item>{comment.text}</Item>);
                      }
                  })}
              </Stack>
          </Grid>
          <Grid item xs={4}>
              <Stack spacing={2}>
                  <TextField label="An idea to share" color="secondary" focused 
                  value={newComments[3]}
                  onChange={(e) => onNewCommentChange(3, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      createComment(3);
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton
                          edge="end"
                          onClick={() => createComment(3)}
                        >
                          <AddIcon></AddIcon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  />
                  {sessionData.comments.map((comment) => {
                      if (comment.categoryId == 3) {
                          return (<Item>{comment.text}</Item>);
                      }
                  })}
              </Stack>
          </Grid>
        </Grid>
      </Box>
      <pre>{JSON.stringify(newComments, null, 2)}</pre>
    </div>
  );
};

export default Session;
