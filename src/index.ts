import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.post('/upload');

app.listen(process.env.PORT || 3000, () => console.log('Server started'));
