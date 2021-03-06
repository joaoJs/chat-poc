const express = require('express')
const Drift = require('drift-chat');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors')
const Intercom = require('intercom-client');
const bodyParser = require('body-parser')


dotenv.config();

const app = express()
const port = process.env.PORT || 3001;

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const chatObj = new Drift(process.env.DRIFT_OAUTH_TOKEN);

const intercomClient = new Intercom.Client({ token: process.env.INTERCOM_ACCESS_TOKEN });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/intercom/:conversationId', (req, res) => {
  const { conversationId } = req.params;
  console.log(conversationId);
  intercomClient.conversations.find({ id: conversationId}, (conversations) => {
    console.log(conversations);
    res.json(conversations);
  });
});

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
  console.log(req.body.data.item);

  console.log('Joao C')
  // Find user by user_id
  intercomClient.users.find({ user_id: req.body.data.item.user_id }, async (data) => {
    console.log(data);
  });

  // call intercom to get data from user 
})

const startServer = () => {
 
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

startServer();