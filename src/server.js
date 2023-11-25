const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/generateComic', async (req, res) => {
  const { panelsData } = req.body;
  const panelImages = [];

  try {
    for (let i = 0; i < panelsData.length; i++) {
      const text = panelsData[i];
      const response = await query({ inputs: text });
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      panelImages.push(imageUrl);
    }

    res.json({ comicImages: panelImages });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

