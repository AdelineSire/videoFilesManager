import { useState, useRef, FC, Dispatch } from 'react';

import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

interface IErrorMessage {
	msg: string;
}

interface IFileUpload {
	uploaded: boolean;
	setUploaded: Dispatch<React.SetStateAction<boolean>>;
}

const FileUpload: FC<IFileUpload> = ({ uploaded, setUploaded }) => {
	const [file, setFile] = useState<File>();
	const [message, setMessage] = useState('');
	const [uploadPercentage, setUploadPercentage] = useState(0);
	const fileRef = useRef<HTMLInputElement>(null);
	const apiUrl = process.env.API_URL || 'http://localhost:3002';

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFile(event.target.files[0]);
		}
	};

	const onSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		const formData = new FormData();
		if (!file) {
			return;
		}

		formData.append('file', file);
		try {
			const res = await axios.post(`${apiUrl}/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: (progressEvent) => {
					setUploadPercentage(
						Math.round((progressEvent.loaded * 100) / progressEvent.total)
					);
				},
			});
			console.log('res.status', res.status);
			console.log('fileRef', fileRef);
			if (fileRef.current !== null) {
				fileRef.current.value = '';
			}
			console.log(fileRef);

			setMessage('La vidéo a été enregistrée');
			setTimeout(() => {
				setUploadPercentage(0);
				setMessage('');
				setUploaded(!uploaded);
			}, 2000);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					if (error.response.status === 500) {
						setMessage('Il y a eu un problème avec le serveur');
					} else {
						if (error.response) {
							const erroMessage = error.response.data as IErrorMessage;
							setMessage(erroMessage.msg);
						}
					}
				}
			}
			setUploadPercentage(0);
		}
	};

	return (
		<Row className='mb-5 p-1 d-flex flex-column align-items-center'>
			<h2 className='mb-4'>Télécharger une vidéo</h2>
			{message ? <Message message={message} /> : null}
			<Form onSubmit={onSubmit}>
				<Form.Group controlId='formFile' className='mb-3'>
					<Form.Control ref={fileRef} type='file' onChange={onChange} />
				</Form.Group>
				<Progress percentage={uploadPercentage} />
				<Button type='submit' variant='primary' className='m-3 p-2'>
					Télécharger
				</Button>
			</Form>
		</Row>
	);
};

export default FileUpload;
