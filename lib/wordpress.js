const API_URL = "https://onnetion.com/graphql";

export async function fetchAPI(query, variables = {}) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 }
    });

    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      return null;
    }
    return json.data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    return null;
  }
}
