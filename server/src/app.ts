import connect from './connect';
import express from 'express'; 
import { config } from 'dotenv'; 
import ApiRouter from './api/api'; 
import cookieParser from 'cookie-parser'; 
import cors from 'cors'; 

// config({
//   path: `C:\\Users\\henry\\Desktop\\GitHub\\Hackathon\\server\\.env`
// }); 

// console.log(__dirname + "/../.env");

const PORT = 8000; 


(async () => {
  const a = await connect();
  await a.synchronize(); 
  const app = express(); 

// middlewares
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(cookieParser()); 
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
})); 

  app.use('/api', ApiRouter); 
  app.listen(PORT, () => {
    console.log(`listening on port, ${PORT}`);
  });
})();
