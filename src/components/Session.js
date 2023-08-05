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

const SOCKET_URL = 'http://localhost:8080/websocket';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));
 
  // const [message, setMessage] = useState('You server message here.');

  

const Session = () => {
  const [sessionData, setSessionData] = useState(null);
  const { sessionId } = useParams(); 

  const onConnected = () => {
    console.log("Connected!!")
  }

  const onMessageReceived = (msg) => {
    // console.log(msg);
    // var prevSessionData = sessionData;
    // prevSessionData.comments.push(msg);
    // console.log(prevSessionData);

    // setSessionData(prevSessionData);

    console.log(msg);
    
    const updatedSessionData = {
      ...sessionData,
      comments: [...sessionData.comments, msg]
    };

    setSessionData(updatedSessionData);
  }

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
        onConnect={onConnected}
        onDisconnect={console.log("Disconnected!")}
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />
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
