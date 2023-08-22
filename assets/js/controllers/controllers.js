const API_URL = "https://the-trivia-api.com/v2/questions?limit=50";

export async function getData() {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
}