export const parseTimestampFromMsToDate = (timestamp: number) =>
	new Date(timestamp).toLocaleDateString();
