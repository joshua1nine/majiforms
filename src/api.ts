const fs = require('fs');
import { Blob } from 'buffer';
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

app.use(express.json());

app.post('/api/hello', async (req, res) => {
	try {
		// console.log(req.body);
		const app = req.body.app;

		let split = app.data.split(',');
		let type = split[0].split(':')[1].split(';')[0];
		let data = split[1];

		// let blob = new Blob([data], { type: type });

		let asset = Buffer.from(data, 'base64url');

		if (app) {
			client.assets
				.upload('image', fs.createReadStream(asset), {
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
