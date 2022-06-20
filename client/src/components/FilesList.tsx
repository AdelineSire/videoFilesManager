import { useState, useEffect, FC, Dispatch } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

import IFile from '../types/file';

interface IFilesList {
	uploaded: boolean;
	setSelectedFile: Dispatch<React.SetStateAction<IFile>>;
}

const FilesList: FC<IFilesList> = ({ setSelectedFile, uploaded }) => {
	const [filesList, setFilesList] = useState<IFile[]>([]);
	const apiUrl = process.env.API_URL || 'http://localhost:3002';

	const getFiles = async () => {
		const response = await axios.get(`${apiUrl}/files`);
		console.log('response.data', response.data);
		setFilesList(response.data);
	};

	useEffect(() => {
		getFiles();
	}, [uploaded]);

	return (
		<Row className='mb-5 d-flex flex-column align-items-center'>
			<h2 className='mb-4'>Lire une vidéo</h2>
			<ListGroup className='p-3'>
				{filesList.map((file: IFile) => (
					<ListGroup.Item
						key={file.fileName}
						action
						onClick={() => setSelectedFile(file)}
						className='m-0'
					>
						{file.fileName}
					</ListGroup.Item>
				))}
			</ListGroup>
		</Row>
	);
};

export default FilesList;
