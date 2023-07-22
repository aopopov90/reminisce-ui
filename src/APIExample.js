import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './components/security/AuthProvider';

const APIExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authState, authenticate } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Authenticate and retrieve the JWT token
        await authenticate('jack', 'string');
        console.log(authState.token)

        // Make the authenticated API call
        const response = await axios.get('http://localhost:8080/sessions', {
          headers: {
            Authorization: `Bearer ${authState.token}`
          }
        }); // Replace with your API endpoint

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [authState.token, authenticate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Data from API:</h2>
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default APIExample;
