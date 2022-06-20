import { useState, useRef, FC, useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { PlayFill, PauseFill } from 'react-bootstrap-icons';

import IFile from '../types/file';

interface IPlayer {
	file: IFile;
}

const Player: FC<IPlayer> = ({ file }) => {
	console.log('file', file);
	const [isPlaying, setIsplaying] = useState(false);
	const vidRef = useRef<HTMLVideoElement>(null);

	const handlePlayVideo = () => {
		console.log('vidRef', vidRef);
		if (vidRef.current !== null) {
			isPlaying ? vidRef.current.pause() : vidRef.current.play();
			setIsplaying(!isPlaying);
		}
	};

	useEffect(() => {
		if (vidRef.current !== null) {
			vidRef.current.load();
		}
	}, [file.fileUrl]);

	return (
		<Row className='mb-5  d-flex flex-column align-items-center'>
			<video ref={vidRef}>
				<source src={file.fileUrl} type='video/mp4' />
			</video>

			<Button
				variant='primary'
				className='m-3 p-2 w-25'
				onClick={handlePlayVideo}
			>
				{isPlaying ? (
					<PauseFill className='fs-3' />
				) : (
					<PlayFill className='fs-3' />
				)}
			</Button>
		</Row>
	);
};
export default Player;
