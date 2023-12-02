import fs from 'node:fs';

export async function POST({ request: req }) {
	const meals = JSON.stringify(await req.json());
	fs.writeFileSync('./meals.json', meals);

	return new Response();
}

export async function GET() {
	const meals = fs.readFileSync('./meals.json', {
		encoding: 'utf8'
	});

	return new Response(meals);
}
