import ffmpeg from 'fluent-ffmpeg';

const transcodeFileFunc = async (tempPath: string, outputPath: string) => {
	return new Promise<void>((resolve, reject) => {
		ffmpeg(tempPath)
			.videoCodec('libx264')
			.audioCodec('aac')
			.videoBitrate('1000k')
			.fps(25)
			.save(outputPath)
			.on('end', () => {
				console.log('FFmpeg done!');
				resolve();
			})
			.on('error', (err) => {
				console.error('an error happened: ' + err.message);
				return reject(new Error(err));
			});
	});
};

export default transcodeFileFunc;
