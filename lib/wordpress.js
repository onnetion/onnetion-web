const API_URL = "https://onnetion.com/graphql";

export async function fetchAPI(query, variables = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }
  });
  const json = await res.json();
  return json.data;
}
