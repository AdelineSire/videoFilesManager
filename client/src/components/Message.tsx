import { FC } from 'react';

import Toast from 'react-bootstrap/Toast';

interface IMessage {
	message: string;
}

const Message: FC<IMessage> = ({ message }) => {
	return (
		<Toast bg='info' className='p-2 m-4'>
			<Toast.Body>{message}</Toast.Body>
		</Toast>
	);
};

export default Message;
