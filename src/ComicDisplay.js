import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';

function ComicDisplay({ comicImages, panelTitles, panelTexts, annotations }) {
  const panelsPerRow = 2; // Number of panels to display in a row

  const renderImages = () => {
    const rows = [];
    for (let i = 0; i < comicImages.length; i += panelsPerRow) {
      const rowImages = comicImages.slice(i, i + panelsPerRow);
      const rowTitles = panelTitles?.slice(i, i + panelsPerRow);
      const rowTexts = panelTexts?.slice(i, i + panelsPerRow);

      const row = (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          {rowImages.map((image, index) => (
            <div key={index} style={{ flex: '0 0 auto', width: `calc(${100 / panelsPerRow}% - 10px)`, position: 'relative' }}>
              <Typography variant="h6" gutterBottom>
                {rowTitles?.[index] || `Panel ${i + index + 1}`}
              </Typography>
              <img
                src={image}
                alt={`Comic Panel ${i + index + 1}`}
                style={{ width: '100%', height: 'auto' }}
              />
              {rowTexts?.[index] && (
  <div
    style={{
      position: 'absolute',
      top: '20%',
      left: '10%',
      width: '80%',
      textAlign: 'center',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    }}
  >
    {rowTexts[index]}
  </div>
)}

{annotations?.[i] && (
  <div
    key={`annotation-${i}`}
    style={{
      position: 'absolute',
      top: annotations[i].top,
      left: annotations[i].left,
      color: annotations[i].color || 'white',
      fontSize: annotations[i].fontSize || '1rem',
      fontWeight: annotations[i].fontWeight || 'bold',
    }}
  >
    {annotations[i].text}
  </div>
)}


              {annotations?.[i] && (
                <div
                  key={`annotation-${i}`}
                  style={{
                    position: 'absolute',
                    top: annotations[i].top,
                    left: annotations[i].left,
                    color: annotations[i].color || 'white',
                    fontSize: annotations[i].fontSize || '1rem',
                    fontWeight: annotations[i].fontWeight || 'bold',
                  }}
                >
                  {annotations[i].text}
                </div>
              )}
            </div>
          ))}
        </div>
      );

      rows.push(row);
    }

    return rows;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          {renderImages()}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ComicDisplay;

