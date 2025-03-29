export async function fetchApi(query: string, variables = {}) {
    const res = await fetch(process.env.CRAFT_CMS_GRAPHQL_ENDPOINT!, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CRAFT_CMS_GRAPHQL_TOKEN}`
        },
        body: JSON.stringify({ query, variables }),
    });
  
    if (!res.ok) throw new Error('Failed to fetch API');
    return res.json();
}