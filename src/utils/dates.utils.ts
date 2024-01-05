export const parseTimestampFromMsToDate = (timestamp: number) => {
	const DAY = new Date(timestamp).getDate().toString().padStart(2, '0');
	const MONTH = (new Date(timestamp).getMonth() + 1).toString().padStart(2, '0');
	const YEAR = new Date(timestamp).getFullYear();

	console.log(new Date(timestamp));
	return `${DAY}.${MONTH}.${YEAR}`;
};

export const getTimestamp = (date: string) => {
	const values = date.split('.');

	console.log(values);

	const day = values[0];
	const month = Number(values[1]);
	const year = values[2];

	const dateInUsaFormat = `${month}.${day}.${year}`;

	console.log(dateInUsaFormat);

	return new Date(`${dateInUsaFormat}`).getTime().toString();
};
