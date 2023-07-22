import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/sessions'); // Replace with the actual API URL for sessions
        setSessions(response.data);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div>
      {sessions && <pre>{JSON.stringify(sessions, null, 2)}</pre>}
    </div>
  );
};

export default Sessions;
