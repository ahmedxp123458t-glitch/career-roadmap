const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/careers', require('./routes/careers'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/learning-paths', require('./routes/learningPaths'));
app.use('/api/progress', require('./routes/progress'));

app.get('/', (req, res) => {
  res.json({ message: 'Career Roadmap API' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
