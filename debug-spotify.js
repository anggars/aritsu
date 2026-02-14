const fs = require('fs');
const path = require('path');

const envPath = path.resolve('.env');
const env = fs.readFileSync(envPath, 'utf8');

const getEnvVar = (name) => {
    const match = env.match(new RegExp(`${name}=(.*)`));
    return match ? match[1].trim() : null;
};

const clientId = getEnvVar('SPOTIFY_CLIENT_ID');
const clientSecret = getEnvVar('SPOTIFY_CLIENT_SECRET');
const refreshToken = getEnvVar('SPOTIFY_REFRESH_TOKEN');

const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

async function debug() {
    console.log('--- Spotify Token Debug ---');
    
    // 1. Get Access Token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        })
    });

    if (!tokenResponse.ok) {
        console.error('Failed to get access token:', tokenResponse.status, await tokenResponse.text());
        return;
    }

    const { access_token } = await tokenResponse.json();
    console.log('Access token retrieved successfully.');

    // 2. Get Current User Info
    const meResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${access_token}` }
    });

    if (meResponse.ok) {
        const me = await meResponse.json();
        console.log(`Authenticated as: ${me.display_name} (${me.unique_id || me.id})`);
    } else {
        console.error('Failed to get user profile:', meResponse.status);
    }

    // 3. Try Fetching "On Repeat" Playlist
    const ON_REPEAT_ID = '37i9dQZF1EpfJlP6d5dhKg';
    const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${ON_REPEAT_ID}/tracks?limit=10`, {
        headers: { Authorization: `Bearer ${access_token}` }
    });

    if (playlistResponse.ok) {
        const playlist = await playlistResponse.json();
        console.log(`On Repeat Playlist Tracks found: ${playlist.items.length}`);
        playlist.items.forEach((item, i) => {
            const track = item.track;
            console.log(`${i + 1}. ${track.name} - ${track.artists.map(a => a.name).join(', ')}`);
        });
    } else {
        console.error(`Failed to fetch On Repeat Playlist (${ON_REPEAT_ID}):`, playlistResponse.status);
        const errBody = await playlistResponse.text();
        console.error('Error Details:', errBody);
    }
}

debug().catch(console.error);
