import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';  // Import CORS package
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import bodyParser from 'body-parser';
import OpenAI from 'openai';



const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins (or specify specific origins if needed)
app.use(cors());

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(routes);

app.use(bodyParser.json);

const openai = new OpenAI(
    {apiKey: process.env.OPENAI_API_KEY,}
);

app.post('/api/chat', async (req, res) => {
  const {message} = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message}],
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'OpenAI made an oopsie daisies'});
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
