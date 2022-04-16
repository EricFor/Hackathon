import connect from './connect';
import express from 'express'; 
import { config } from 'dotenv'; 
import ApiRouter from './api/api'; 


(async () => {
  await connect();
  const app = express(); 
  app.use('./api', ApiRouter); 
  app.listen(process.env.PORT); 
})();
