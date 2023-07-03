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
	console.log('getChatCompletion', {
		name,
		description,
		namingConvention
	});
	return await openai.createChatCompletion({
		model: 'gpt-3.5-turbo-0613',
		messages: [
			{
				role: 'assistant',
				content: `I'm developing a new ${name}, but I'm uncertain about the ideal title. Could you help generate a suitable name? Below, within the '#' delimited section, you'll find specific details:
				# Name: ${name}
				Description: ${description}
				Naming Convention: ${namingConvention} #
				Your task is to suggest a succinct, unique, single-word title following the ${namingConvention} naming convention. As a quick refresher:
				In snake_case, words are separated by underscores (e.g., 'my_variable')
				In camelCase, the first word is in lowercase, and the first letter of each subsequent concatenated word is capitalized (e.g., 'myVariable')
				In PascalCase, the first letter of each concatenated word is capitalized (e.g., 'MyVariable')
				Please bear in mind principles of clean code and an engineering perspective, emphasizing functionality, simplicity, and clarity. The response must solely consist of a single word - the proposed name.`
			}
		]
	});
}
