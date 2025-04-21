import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get the GraphQL URL from environment variable
    const graphqlUrl = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL;
    
    if (!graphqlUrl) {
      return res.status(500).json({ error: 'GraphQL URL not configured' });
    }

    // Forward the request to Hasura
    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || '',
      },
      body: JSON.stringify(req.body),
    });

    // Get the response data
    const data = await response.json();

    // Return the response
    return res.status(200).json(data);
  } catch (error) {
    console.error('GraphQL proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 