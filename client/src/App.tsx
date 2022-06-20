import { useState } from 'react';

import Container from 'react-bootstrap/Container';

import FileUpload from './components/FileUpload';
import FilesList from './components/FilesList';
import Player from './components/Player';

import IFile from './types/file';

const App = () => {
	const [selectedFile, setSelectedFile] = useState<IFile>({
		fileName: '',
		fileUrl: '',
	});
	const [uploaded, setUploaded] = useState(false);
	console.log('selectedFile in app', selectedFile);
	let isSelectedFile = selectedFile.fileName !== '';

	return (
		<Container className='text-center'>
			<h1 className='m-5 fw-bold fst-italic'>Video Manager</h1>
			<FileUpload setUploaded={setUploaded} uploaded={uploaded} />
			<FilesList setSelectedFile={setSelectedFile} uploaded={uploaded} />
			{isSelectedFile && <Player file={selectedFile} />}
		</Container>
	);
};

export default App;
