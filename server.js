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

app.get('/conversation/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  const message = {
    body: {
      data: {
        conversationId
      }
    }
  }
  
  try {
    const response = await chatObj.getConvo(message);
    // console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post('/webhook', async (req,res) => {
  console.log('in webbhook');
  console.log(req.body);
});

const startServer = () => {
 
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

startServer();