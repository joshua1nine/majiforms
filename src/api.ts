const fs = require('fs');
const sanityClient = require('@sanity/client');
const client = sanityClient({
	projectId: 'gug9xys0',
	dataset: 'production',
	apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
	token:
		'skcWLG0HcEUqvPJsj3PQS5WCiCTPmH8L99QyMTVME5zlXJuk1488HbaxBRzkSntJTbYGprZttFfFuiXzTEZNK3b2EeOe0VXmSn8yFwMgipbsdzNwdoHfmaprcWA8UNVLWd4Y7JXZBFd7uLPetGe8eS7XHR9lAAhp2qP4oxRswep2MFbfgtul', // or leave blank for unauthenticated usage
	useCdn: true, // `false` if you want to ensure fresh data
});
import express from 'express';

const app = express();

app.use(express.json({ limit: '200mb' }));

app.post('/api/hello', async (req, res) => {
	try {
		const app = req.body.app;
		console.log(req.body);

		if (app) {
			let data = app.data.split(',')[1];
			let asset = Buffer.from(data, 'base64url');
			client.assets
				.upload('file', asset, {
					filename: app.name,
				})
				.then((doc: any) => {
					console.log('image uploaded', doc);
				})
				.catch((err: { message: any }) => {
					console.error('Upload failed:', err.message);
				});
		}

		res.status(200).send('OK');
	} catch (error) {
		res.status(400).send('Bad Request');
		console.log(error);
	}
});

export const handler = app;
