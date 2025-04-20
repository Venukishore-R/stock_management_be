const express = require('express');
const app = express();

const cors = require('cors');

const config = require('./config/config');
const routes = require('./endpoints/products');
const stockRoutes = require('./endpoints/stocks');
const db = require('./internal/database/db');

const model = require('./internal/app/model/index');

app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use('/api', stockRoutes);

db.sync()
  .then(() => {
    console.log("Database synced successfully");
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });