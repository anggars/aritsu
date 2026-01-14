import { getTopTracks } from '$lib/server/spotify';
import { json } from '@sveltejs/kit';

export async function GET() {
  const response = await getTopTracks();
  
  if (response.status === 204 || response.status > 400) {
    return json({ tracks: [] });
  }

  const { items } = await response.json();

  const tracks = items.slice(0, 10).map((track: any) => ({
    artist: track.artists.map((_artist: any) => _artist.name).join(', '),
    title: track.name,
    url: track.external_urls.spotify,
    cover: track.album.images[0].url,
    duration: track.duration_ms
  }));

  return json({ tracks });
}
