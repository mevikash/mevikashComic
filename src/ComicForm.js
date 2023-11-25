import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, CircularProgress, Snackbar } from '@mui/material';
import './ComicForm.css'; // Import the CSS file

function ComicForm({ updateComicImages }) {
  const [numPanels, setNumPanels] = useState('');
  const [panelsData, setPanelsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleNumPanelsChange = (value) => {
    const newValue = Math.min(Math.max(parseInt(value, 10) || 0, 0), 10);
    setNumPanels(newValue);
    setPanelsData(Array(newValue).fill(''));
  };

  const handleChange = (index, value, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      return;
    }

    const newPanelsData = [...panelsData];
    newPanelsData[index] = value;
    setPanelsData(newPanelsData);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const generateComic = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      // Simulate a delay before making the API call
      await new Promise(resolve => setTimeout(resolve, 100));

      const panelImages = [];

      for (let i = 0; i < panelsData.length; i++) {
        const text = panelsData[i];
        const response = await query({ inputs: text });

        // Check for successful response
        if (!response.ok) {
          throw new Error('Failed to generate image for panel ' + (i + 1));
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        panelImages.push(imageUrl);
      }

      updateComicImages(panelImages);
      setSuccessMessage('Comic generated successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error.message);
      setError('Failed to generate comic. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const query = async (data) => {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: {
          "Accept": "image/png",
          "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    return response;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '10px' }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              label="Number of Panels"
              variant="outlined"
              margin="normal"
              type="number"
              value={numPanels}
              onChange={(e) => handleNumPanelsChange(e.target.value)}
              inputProps={{ min: 0, max: 10 }}
              required
              style={{ width: '21%', marginBottom: '0px' }}
              className="panelTextField"
            />
            <div id="panels">
              {panelsData.map((text, index) => (
                <TextField
                  key={index}
                  label={`Panel ${index + 1}`}
                  variant="outlined"
                  margin="normal"
                  value={text}
                  onChange={(e) => handleChange(index, e.target.value, e)}
                  onKeyPress={(e) => e.key === 'Enter' && e.preventDefault()}
                  required
                  style={{ width: '19%', marginBottom: '0px' }}
                  className="panelTextField"
                />
              ))}
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={generateComic}
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Comic'}
            </Button>
          </form>
        </Paper>
      </Grid>

      {/* Snackbar for feedback messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error || successMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Grid>
  );
}

export default ComicForm;

