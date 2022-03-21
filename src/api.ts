import express from 'express';

const app = express();

app.use(express.json());

app.post('/api/hello', (req, res) => {
	try {
		res.status(200).send('OK');
		console.log(req.body);
	} catch (error) {
		res.status(400).send('Bad Request');
		console.log(error);
	}
});

export const handler = app;
