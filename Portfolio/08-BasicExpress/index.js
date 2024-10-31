const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/calculate-bmi', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (!weight || !height) {
    return res.send('Please provide valid weight and height values.');
  }

  const bmi = (weight / (height ** 2)) * 10000;

  res.send(`Your BMI is ${bmi.toFixed(2)}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
