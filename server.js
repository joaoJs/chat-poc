const express = require('express')
const Drift = require('drift-chat');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors')

dotenv.config();

const app = express()
const port = process.env.PORT || 3001;

app.use(cors())

const chatObj = new Drift(process.env.DRIFT_OAUTH_TOKEN);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/conversations/', async (req, res) => {
  const { conversationId } = req.params;
  // const response = await axios(`https://driftapi.com/conversations/${conversationId}/messages?next(optional)`);
  const response = await axios(`https://driftapi.com/conversations/list`);
  console.log(response);
  res.json(response);
});

app.get('/conversation/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  // const response = await axios(`https://driftapi.com/conversations/${conversationId}/messages?next(optional)`);
  const response = await axios(`https://driftapi.com/conversations/${conversationId}`);
  console.log(response);
  res.json(response);
});

const startServer = () => {
 
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

startServer();