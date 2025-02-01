import React from 'react';
import { CircularProgress } from '@mui/material';

function Loading() {
  return (
    <div style={styles.container}>
      <div style={styles.loaderContainer}>
        <CircularProgress />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  header: {
    backgroundColor: '#f8f8f8',
    padding: '10px',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#f8f8f8',
    padding: '10px',
    textAlign: 'center',
  },
};

export default Loading;
