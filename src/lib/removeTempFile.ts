import fs, { PathLike } from 'fs';

const removeTempFile = async (tempPath: PathLike) => {
	try {
		await fs.promises.unlink(tempPath);
		console.log('file removed');
	} catch (err) {
		console.error('error in removeTempFile', err);
	}
};

export default removeTempFile;
