import type { NextApiRequest, NextApiResponse } from 'next';

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY; // Store API key in .env

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userMessage } = req.body;

  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-7b-instruct', // Replace with your chosen model
        messages: [
          { role: 'system', content: 'You are a fashion stylist chatbot. Provide cute and stylish outfit suggestions.' },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 200,
      }),
    });

    const data = await response.json();
    res.status(200).json({ botReply: data.choices[0]?.message?.content || 'No response' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}
