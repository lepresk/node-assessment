"use strict";

import express from 'express';
import bodyParse from 'body-parser';
import router from './router.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(bodyParse.json());

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
