import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users.js';

const port = 8000;

const app = express();
app.use((req, re, next) => {
  console.log('time ', Date.now());
  next();
});

app.all('/hello', (req, res, next) => {
  console.log('all');
  next();
});

app.get('/hel?lo', (req, res) => {
  throw new Error('Erroe!!!!!');
});

app.use('/users', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Server is on http://localhost:${port}`);
});
