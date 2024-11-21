const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3001" 
}));

app.use(cors());

const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

app.post('/process-data', (req, res) => {
  const { data, file_b64 } = req.body;

  const numbers = [];
  const alphabets = [];
  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
    }
  });

  const lowercaseAlphabets = alphabets.filter((char) => char === char.toLowerCase());
  const highestLowercaseAlphabet = lowercaseAlphabets.sort().reverse()[0] || null;

  const primeFound = numbers.some((num) => isPrime(Number(num)));

  const fileMimeType = 'image/png'; // Example MIME type
  const fileSizeKB = 400; // Example file size in KB
  const fileValid = file_b64 ? true : false;

  const response = {
    is_success: true,
    user_id: 'john_doe_17091999',
    email: 'john@xyz.com',
    roll_number: 'ABCD123',
    numbers: numbers.map(String),
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
    is_prime_found: primeFound,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB,
  };

  res.status(200).json(response);
});

app.get('/process-data', (req, res) => {
   res.send({operation_code:"1"});
})


// deployment 
// if(process.env.NODE_ENV == "production"){
//   app.use(express.static("frontend/build"))
// }


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
