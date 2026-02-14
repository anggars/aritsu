import { getTopTracks } from '$lib/server/spotify';

export async function load() {
  const response = await getTopTracks();
  
  // Default fallback if API fails
  const fallback = [
    { id: '5XeFesFbtLpXzIvCmlAQl3', title: 'Do I Wanna Know?' },
    { id: '3F5CgOj3wFlRv51JsHbxhe', title: 'Tomzb' },
    { id: '4CEEEqM4N4P9q38hCM9r02', title: 'Mock Song 3' },
    { id: '407ltk0BtcZI8kgu0HH4Yj', title: 'Mock Song 4' },
    { id: '2xLMifQCjDGFmkDkpNLD9h', title: 'SICKO MODE' },
    { id: '7lQ8MOhq6IN2w8EYbPNSxt', title: 'Mock Song 6' },
    { id: '0VjIjW4GlUZAMYd2vXMi3b', title: 'Blinding Lights' },
    { id: '3ZCTVFBt2Brf31RLEnCkWJ', title: 'Everything I Wanted' },
    { id: '6pq8E6tq2bM1uD17D9uTfF', title: 'Levitating' },
    { id: '3e7sxremOE4wTrjFc8AUd0', title: 'Heartless' }
  ];

  if (response.status === 204 || response.status > 400) {
    return { tracks: fallback };
  }

  const { items } = await response.json();

  if (!items) return { tracks: fallback };

  const tracks = items.slice(0, 10).map((item: any) => {
    const track = item.track || item;
    return {
      artist: track.artists.map((_artist: any) => _artist.name).join(', '),
      title: track.name,
      id: track.id,
      url: track.external_urls.spotify,
      cover: track.album.images[0]?.url,
      duration: formatDuration(track.duration_ms)
    };
  });

  return { tracks };
}

function formatDuration(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
}
