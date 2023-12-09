export const parseTimestampFromMsToDate = (timestamp: number) => {
	new Date(timestamp).toLocaleDateString();

	const DAY = new Date(timestamp).getDate().toString().padStart(2, '0');
	const MONTH = new Date(timestamp).getMonth().toString().padStart(2, '0');
	const YEAR = new Date(timestamp).getFullYear();

	return `${DAY}.${MONTH}.${YEAR}`;
};
