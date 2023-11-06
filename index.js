import express from 'express';

const port = 8000;

const app = express();

app.get('/hello', (req, res) => {
  try {
    res.send('hi!');
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is on http://localhost:${port}`);
});
