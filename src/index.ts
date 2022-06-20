import express from 'express';
import fs from 'fs';
import fileUpload, { UploadedFile } from 'express-fileupload';
import cors from 'cors';
import path from 'path';

import transcodeFile from './lib/transcodeFile';
import removeTempFile from './lib/removeTempFile';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const publicPath = path.join(__dirname, '../public');
console.log('publicPath : ', publicPath);
app.use(express.static(publicPath));
app.use(fileUpload());

const apiUrl = process.env.API_URL || 'http://localhost:3002';

app.post('/upload', async (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ msg: 'No file uploaded' });
	}

	const videoFile = req.files?.file as UploadedFile;
	const fileName = videoFile.name;
	const tempPath = path.join(publicPath, 'uploads', 'temp', fileName);
	const outputPath = path.join(publicPath, 'uploads', 'video', fileName);

	try {
		videoFile.mv(tempPath, (err) => {
			if (err) {
				console.error('error in move file', err);
				return res.status(500).send(err);
			}
		});
		await transcodeFile(tempPath, outputPath);
		await removeTempFile(tempPath);
		res.send();
	} catch (err) {
		res
			.status(400)
			.json({ msg: 'the file has not been stranscoded or removed' });
	}
});

app.get('/files', async (req, res) => {
	try {
		const dirPath = path.join(publicPath, 'uploads', 'video');
		console.log('dirPath in get files: ', dirPath);
		const files = [];
		const fileNames = await fs.promises.readdir(dirPath);
		for (const fileName of fileNames) {
			const fileUrl = new URL(`uploads/video/${fileName}`, apiUrl);
			files.push({ fileName, fileUrl });
		}
		res.json(files);
	} catch (err) {
		console.error(err);
	}
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
