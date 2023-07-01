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
	description
}: {
	name: string;
	description: string;
}) {
	console.log('getChatCompletion', {
		name,
		description
	});
	return await openai.createChatCompletion({
		model: 'gpt-3.5-turbo-0613',
		messages: [
			{
				role: 'assistant',
				content: `'m in the process of creating a new ${name}, but I'm unsure about the appropriate title for it. Could you assist me in naming it? The details are encapsulated within the '#'-delimited section below:
				#
				Name: ${name}
				Description: ${description}
				#
				Your task is to suggest a single-word title, just one unique and concise term. Please approach this with an engineering mindset; think functionality, clarity, and simplicity. The response should only be a single word, the name recommended.`
			}
		]
	});
}
