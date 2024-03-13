const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const osUtils = require('os-utils');
const { exec } = require('child_process');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();


const agentRoutes = require('./routes/agentRoutes');
const userRoutes = require('./routes/userRoutes');
const userAccountRoutes = require('./routes/userAccountRoutes');
const lobRoutes = require('./routes/lobRoutes');
const carrierRoutes = require('./routes/carrierRoutes');
const policyRoutes = require('./routes/policyRoutes');


const uploadService = require('./services/uploadService');
const messageService = require('./services/messageService');
const searchService = require('./services/searchService');
const aggregationService = require('./services/aggregationService');

const app = express();


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
  },
  apis: ['./index.js', './routes/*.js'], 
};


const specs = swaggerJsdoc(options);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.use(bodyParser.json());

let URL = "mongodb+srv://pawarar435:zgVzWniGZvkRJDTM@cluster0.uzg6ag7.mongodb.net/"
// mongoose.connect(process.env.URL)
mongoose.connect(URL)
.then(()=> console.log("Database Connected Successfully..."))
.catch((err) => console.log("connection error : ",err));




app.use('/agents', agentRoutes);
app.use('/users', userRoutes);
app.use('/user-accounts', userAccountRoutes);
app.use('/lobs', lobRoutes);
app.use('/carriers', carrierRoutes);
app.use('/policies', policyRoutes);



/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File Upload
 */

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     description: Upload a file to the server
 *     tags: [Upload]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         required: true
 *         description: Choose the file to upload
 *     responses:
 *       '200':
 *         description: File uploaded successfully
 *       '400':
 *         description: Invalid file or file upload failed
 *       '500':
 *         description: Internal server error
 */
// app.post('/upload', async (req, res) => {
//   // const { filePath } = req.body;
//   try {
//     const filePath = "C:/Users/NDH00774/Desktop/Docs/NodeJS/Nodejs Assessment/data_sheet.csv";
//     const result = await uploadService.parseAndUploadData(filePath);
//     res.status(200).json({ message: result });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path; 
    const result = await uploadService.parseAndUploadData(filePath);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * tags:
 *   name: Schedule Message
 *   description: schedule-message
 */

/**
 * @swagger
 * /schedule-message:
 *   post:
 *     summary: Schedule a message
 *     tags: [Schedule Message]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Message details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Message content
 *             day:
 *               type: string
 *               description: Day to send the message
 *             time:
 *               type: string
 *               description: Time to send the message
 *     responses:
 *       200:
 *         description: Message scheduled successfully
 *       500:
 *         description: Internal server error
 */
app.post('/schedule-message', async (req, res) => {
  const { message, day, time } = req.body;
  try {
    const result = await messageService.scheduleMessage(message, day, time);
    res.status(200).json({ message: 'Message scheduled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/**
 * @swagger
 * tags:
 *   name: Search Policies
 *   description: search-policies
 */

/**
 * @swagger
 * /search-policies/{username}:
 *   get:
 *     summary: Search policies by username
 *     tags : [Search Policies]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username to search policies for
 *         type: string
 *     responses:
 *       200:
 *         description: Policies found
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Policy'
 *       500:
 *         description: Internal server error
 */
app.get('/search-policies/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const policies = await searchService.searchPolicyByUsername(username);
    res.status(200).json(policies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * tags:
 *   name: Aggregate Policies
 *   description: aggregate-policies
 */

/**
 * @swagger
 * /aggregate-policies:
 *   get:
 *     summary: Aggregate policies by user
 *     tags : [Aggregate Policies]
 *     responses:
 *       200:
 *         description: Policies aggregated successfully
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/AggregatedPolicy'
 *       500:
 *         description: Internal server error
 */
app.get('/aggregate-policies', async (req, res) => {
  try {
    const aggregatedPolicies = await aggregationService.aggregatePoliciesByUser();
    res.status(200).json(aggregatedPolicies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// task 2
setInterval(() => {
  osUtils.cpuUsage((usage) => {
    if (usage > 0.7) {
      const messageData = {
        day: new Date(),
        time: new Date().toLocaleTimeString(),
        message : "Restarting the Server"
      };
      
      axios.post('http://localhost:3000/schedule-message', messageData)
        .then(response => {
          console.log('Response:', response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });

      console.log('CPU usage is high. Restarting server...');
      exec('pm2 restart insuredmine_assessment');
    }
  });
}, 5000); 