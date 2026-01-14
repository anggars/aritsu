import { redirect } from '@sveltejs/kit';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

const REDIRECT_URI = 'http://127.0.0.1:5173/spotify-setup';

export const load = async ({ url }) => {
  const code = url.searchParams.get('code');

  if (code) {
    // Exchange code for tokens
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI
      })
    });

    const data = await response.json();

    if (data.refresh_token) {
        // Redirect back to same page but with refresh_token in query param to display it
        throw redirect(302, `/spotify-setup?refresh_token=${data.refresh_token}`);
    }
    
    return { error: data };
  }
};

export const actions = {
  login: async () => {
    const scope = 'user-read-recently-played user-top-read';
    const state = Math.random().toString(36).substring(7);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: SPOTIFY_CLIENT_ID,
      scope,
      redirect_uri: REDIRECT_URI,
      state
    });

    throw redirect(302, `https://accounts.spotify.com/authorize?${params.toString()}`);
  }
};
