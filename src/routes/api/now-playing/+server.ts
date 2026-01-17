import { getNowPlaying } from '$lib/server/spotify';
import { json } from '@sveltejs/kit';

export const GET = async () => {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
        if (response.status > 400) {
             console.log('Spotify API Error/Status:', response.status);
             const text = await response.text();
             console.log('Spotify API Error Body:', text);
        }
        return json({ isPlaying: false });
    }

    const song = await response.json();

    if (song.item === null) {
        return json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return json({
        isPlaying,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl
    });
};
