import { app } from '@azure/functions';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    organization: "org-K1h8ElptCNroWAkosiH3PKnm",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.http('gptfunction', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const { message } = await request.json();
        context.log(message);    
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `${message}`
                }
            ]
        });

        return {
            body: {
                completion: completion.data.choices[0].text
            }
         };
    }
});
