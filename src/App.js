import React, { useState, useEffect } from 'react';

function App() {
  const [latestAnswer, setLatestAnswer] = useState('');

  // Function to fetch the latest answer via POST request.
  const fetchLatestAnswer = async () => {
    try {
      fetch('https://interviewscrapper-api.onrender.com/api/answers')
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network error: ${response.status} - ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          setLatestAnswer(data.storedData.answer);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    } catch (error) {
      console.error('Error fetching latest answer:', error);
    }
  };

  // Poll the backend every 3 seconds (3000ms)
  useEffect(() => {
    const intervalId = setInterval(fetchLatestAnswer, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={styles.container}>
      <h1>Latest AI Answer</h1>
      <div style={styles.answerContainer}
        // Use dangerouslySetInnerHTML to render the HTML content from the answer.
        dangerouslySetInnerHTML={{ __html: latestAnswer }}>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
  },
  answerContainer: {
    maxWidth: '800px',
    margin: '20px auto',
    background: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  }
};

export default App;
