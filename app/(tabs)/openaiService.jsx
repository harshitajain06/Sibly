// openaiService.js
import axios from 'axios';

const apiKey = 'Your API Key';

export const createCompletion = async (messages) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: messages,
        temperature: 0.5,
        max_tokens: 500,
        top_p: 1,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error creating completion:', error);
    throw error;
  }
};
