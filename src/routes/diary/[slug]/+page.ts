import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (params.slug === 'general') {
		return {
			title: 'Hello world!',
			description: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
			data: []
		};
	}

	return {
		id: params.slug
	};

	error(404, 'Not found');
};
