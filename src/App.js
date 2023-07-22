import React from 'react';
import AuthProvider from './components/security/AuthProvider';
import APIExample from './APIExample';

const App = () => {
  return (
    <AuthProvider>
      <div>
        <h1>React App with API Authentication</h1>
        <APIExample />
      </div>
    </AuthProvider>
  );
};

export default App;
