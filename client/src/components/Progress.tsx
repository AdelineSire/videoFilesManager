import { FC } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

interface IProgress {
	percentage: number;
}

const Progress: FC<IProgress> = ({ percentage }) => {
	return <ProgressBar animated now={percentage} label={`${percentage}%`} />;
};

export default Progress;
