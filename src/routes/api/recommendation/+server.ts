import { json } from '@sveltejs/kit';
import { getChatCompletion } from '$lib/server/openai.js';

export async function POST({
	request,
	cookies
}: {
	request: any;
	cookies: any;
}) {
	const data = await request.json();
	const { name, description } = data;

	if (!name || !description) {
		return json({
			status: 400,
			body: {
				error: 'Missing name or description'
			}
		});
	}
	const res = await getChatCompletion({
		name: name.trim(),
		description: description.trim()
	});
	if (!res || !res?.data || res.status !== 200) {
		return json({
			status: 500,
			body: {
				error: 'Something went wrong'
			}
		});
	}
	return json({
		status: 200,
		body: {
			response: res.data.choices[0].message
		}
	});
}
