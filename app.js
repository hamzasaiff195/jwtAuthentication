const express = require('express');
const userRouter = require('./routes/userRoutes');
const morgan = require('morgan');

const app = express();

app.use(express.json({ limit: '10kb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/users', userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

module.exports = app;
