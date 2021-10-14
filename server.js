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
  try {
    const response = await axios(`https://driftapi.com/conversations/list`);
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.get('/conversation/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  // const response = await axios(`https://driftapi.com/conversations/${conversationId}/messages?next(optional)`);
  chatObj.getConvo(conversationId)
    .then(response => response.json())
    .then(response => console.log(response));
  // try {
  //   const response = await axios(`https://driftapi.com/conversations/${conversationId}`);
  //   console.log(response);
  //   res.json(response);
  // } catch (error) {
  //   console.log(error);
  // }
});

const startServer = () => {
 
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

startServer();