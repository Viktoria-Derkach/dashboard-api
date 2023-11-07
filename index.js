import express from 'express';

const port = 8000;

const app = express();

app.all('/hello', (req, res, next) => {
  console.log('all');
  next();
});

const cb = (req, res, next) => {
  console.log('CALLBACK');
  next();
};

app
  .route('/user')
  .get('/hel?lo', [cb, cb, cb], (req, res) => {
    try {
      res.send('hi!');
    } catch (error) {
      console.log(error);
    }
  })
  .post('/hel?lo', [cb, cb, cb], (req, res) => {
    try {
      res.send('hi post !');
    } catch (error) {
      console.log(error);
    }
  });



app.listen(port, () => {
  console.log(`Server is on http://localhost:${port}`);
});
