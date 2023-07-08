import { Configuration, OpenAIApi } from 'openai';
import {
	OPEN_AI_PRIVATE_KEY,
	OPEN_AI_ORG_ID
} from '$env/static/private';
const configuration = new Configuration({
	organization: OPEN_AI_ORG_ID,
	apiKey: OPEN_AI_PRIVATE_KEY
});
const openai = new OpenAIApi(configuration);

export async function getChatCompletion({
	name,
	description,
	namingConvention
}: {
	name: string;
	description: string;
	namingConvention: string;
}) {
	console.log('Calling getChatCompletion...');
	console.log('getChatCompletion', {
		name,
		description,
		namingConvention
	});
	return await openai.createChatCompletion({
		model: 'gpt-3.5-turbo-0613',
		messages: [
			{
				role: 'user',
				content: `I'm developing a new ${name}, and I need help generating a suitable name. Here are the details:
					Name: ${name}
					Description: ${description}
					Naming Convention: ${namingConvention}`
			},
			{
				role: 'assistant',
				content:
					'Based on the provided details, let me suggest a few names following the specified naming convention.'
			},
			{
				role: 'system',
				content:
					'You are tasked to suggest a name following the specified naming convention. Please provide the list of names in the following JSON format: { list:[{"name": "suggestedName"}]}.'
			}
		]
	});
}
