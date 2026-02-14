import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } from '$env/static/private';

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN || ''
    })
  });
  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  return fetch(`${TOP_TRACKS_ENDPOINT}?time_range=short_term&limit=10`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getOnRepeatTracks = async () => {
  const { access_token } = await getAccessToken();

  // 1. Search user's playlists for "On Repeat"
  const playlistsResponse = await fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  if (!playlistsResponse.ok) {
    return getTopTracks();
  }

  const { items } = await playlistsResponse.json();
  // On Repeat is a personalized playlist created by Spotify for the user
  const playlist = items.find((p: any) => p.name === 'On Repeat');

  if (!playlist) {
    // If not found in the first 50 playlists, fall back to Top Tracks (short term)
    // as it's the closest thing to On Repeat.
    return getTopTracks();
  }

  return fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks?limit=10`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const getMe = async () => {
  const { access_token } = await getAccessToken();
  return fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
