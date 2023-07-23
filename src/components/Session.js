import React, { useState, useEffect } from 'react';
import { API_URL } from '../config/config';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
  }, [sessionId]); // Add sessionId as a dependency to the useEffect hook

  if (!sessionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Session Details</h1>
      <pre>{JSON.stringify(sessionData, null, 2)}</pre>
    </div>
  );
};

export default Session;
