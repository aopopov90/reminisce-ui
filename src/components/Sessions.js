import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { API_URL } from '../config/config';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StopIcon from '@mui/icons-material/Stop';
import Session from './Session';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [newSessionName, setNewSessionName] = useState([]);
  const onNewSessionNameChange = (e) => setNewSessionName(e.target.value);

  const createNewSession = async () => {
    try {
      const response = await axios.post(`${API_URL}/sessions`, { name: newSessionName });
      setSessions((prevSessions) => [...prevSessions, response.data]);
      setNewSessionName('');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const deleteSession = async (sessionId) => {
    console.log(sessionId)
    try {
      const response = await axios.delete(`${API_URL}/${sessionId}`);
      setSessions((prevSessions) => prevSessions.filter((session) => session.id !== sessionId));
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const endSession = async (sessionId) => {
    console.log(sessionId)
    try {
      const response = await axios.patch(`${API_URL}/sessions/${sessionId}/end`);
      setSessions((prevSessions) =>
        prevSessions.map((session) => {
          if (session.id === sessionId) {
            return response.data;
          }
          return session;
        })
      );
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };  

  useEffect(() => {
    const fetchSessions = async () => {
        try {
            const response = await axios.get(`${API_URL}/sessions`);
            setSessions(response.data);
        } catch (error) {
            console.error('Error fetching sessions:', error);
        }
    };

    fetchSessions();
  }, []);

  return (
    <Box>
        <Box
            display="flex"
            justifyContent="flex-end" // To align items to the right
            alignItems="center" // To vertically center items
            sx={{ '& > :not(style)': { m: 1 } }}
        >
          <IconButton color="primary" aria-label="add to shopping cart" onClick={createNewSession}>
              <AddIcon />
          </IconButton>
          <TextField
              id="filled-basic"
              label="Enter a new session name"
              variant="filled"
              value={newSessionName}
              onChange={onNewSessionNameChange}
              style={{ width: '500px' }} // Set the width using a custom style
          />
        </Box>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Created On</TableCell>
            <TableCell align="right">Ended On</TableCell>
            <TableCell align="right">Actions</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {sessions.map((session) => (
            <TableRow
                key={session.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    <Link to={`/sessions/${session.id}`}>{session.name}</Link>
                </TableCell>
                <TableCell align="right">{session.createdBy}</TableCell>
                <TableCell align="right">{session.status}</TableCell>
                <TableCell align="right">{session.createdOn}</TableCell>
                <TableCell align="right">{session.endedOn}</TableCell>
                <TableCell align="right">
                    <IconButton color="secondary" onClick={() => endSession(session.id)}>
                        <StopIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => deleteSession(session.id)}>
                        <DeleteForeverIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
  </Box>
  );
};

export default Sessions;
