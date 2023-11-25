import React, { useState } from 'react';
import { Container, CssBaseline, Typography, Stepper, Step, StepLabel, Grid, Paper, Button, CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AlbumIcon from '@mui/icons-material/Album';
import ChatIcon from '@mui/icons-material/Chat';
import CreateIcon from '@mui/icons-material/Create';
import ComicForm from './ComicForm';
import ComicDisplay from './ComicDisplay';
import step1Image from './images/step1.png';
import step2Image from './images/step2.png';
import step3Image from './images/step3.png';
import backgroundImage from './images/back.jpg';
import backgroundImage1 from './images/back1.jpg';
import backgroundImage2 from './images/back2.jpg';

import './App.css';

function App() {
  const [comicImages, setComicImages] = useState([]);
  const [panelTitles, setPanelTitles] = useState([]);
  const [panelTexts, setPanelTexts] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [panelsData, setPanelsData] = useState([]);

  const updateComicImages = (images, titles, texts, annotations) => {
    setComicImages(images);
    setPanelTitles(titles);
    setPanelTexts(texts);
    setAnnotations(annotations);
  };
  
    const query = async (data) => {
    // ... your implementation of the query function
  };

  const handleGenerateComic = async () => {
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

      // Assuming you have annotations data as an array
      const generatedAnnotations = [
        { text: 'Speech bubble 1', top: '30%', left: '10%', color: 'white', fontSize: '1rem', fontWeight: 'bold' },
        // ... other annotations
      ];

      updateComicImages(panelImages, panelTitles, panelTexts, generatedAnnotations);
      setSuccessMessage('Comic generated successfully!');
      setSnackbarOpen(true);
      query(generatedAnnotations);
    } catch (error) {
      console.error(error.message);
      setError('Failed to generate comic. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main"  >
      <CssBaseline />
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
      
        <Typography variant="h4" component="h1" gutterBottom>
        
          Comic Generator App
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Create and Share your comic strip!
        </Typography>

        {/* Instructions with Stepper */}
      <Stepper activeStep={comicImages.length > 0 ? 3 : 0} alternativeLabel>
        <Step>
          <StepLabel>
            <div>
              <Typography variant="h6">
                Step 1
                <AlbumIcon style={{ marginLeft: '8px' }} />
              </Typography>
              <img src={step1Image} alt="Step 1" style={{ maxWidth: '100%', marginBottom: '10px' }} />
              <Typography>Enter the number of panels you want for your comic (1 to 10).</Typography>
            </div>
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>
            <div>
              <Typography variant="h6">
                Step 2
                <CreateIcon style={{ marginLeft: '8px' }} />
              </Typography>
              <img src={step2Image} alt="Step 2" style={{ maxWidth: '100%', marginBottom: '10px', padding: '10px' }} />
              <Typography>Fill in the text for each panel.</Typography>
            </div>
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>
            <div>
              <Typography variant="h6">
                Step 3
                <ChatIcon style={{ marginLeft: '8px' }} />
              </Typography>
              <img src={step3Image} alt="Step 1" style={{ maxWidth: '100%', marginBottom: '20px', padding: '20px' }} />
              <Typography>Click "Generate Comic" to see your comic strip.</Typography>
            </div>
          </StepLabel>
        </Step>
      </Stepper>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '10px' }}>
            <Typography variant="h5" gutterBottom>
              Comic Strip Preview
            </Typography>
            <ComicForm updateComicImages={updateComicImages} />
            <div style={{ textAlign: 'center' }}></div>
            {comicImages.length > 0 && (
              <ComicDisplay comicImages={comicImages} panelTitles={panelTitles} panelTexts={panelTexts} annotations={annotations} />

            )}
          </Paper>
        </Grid>
      </Grid>
      
      
      </div>
    </Container>
  );
}

export default App;
