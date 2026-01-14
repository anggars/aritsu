<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="min-h-screen bg-black text-white p-10 font-satoshi flex flex-col items-center justify-center text-center">
  <h1 class="text-4xl font-bold mb-6 font-clash">Spotify Token Generator</h1>

  {#if $page.url.searchParams.get('refresh_token')}
    <div class="bg-zinc-900 border border-lime-500/50 p-6 rounded-xl max-w-2xl w-full">
        <p class="text-lime-400 font-bold mb-2">Success! Ini Refresh Token-nya:</p>
        <div class="bg-black p-4 rounded text-xs text-zinc-400 font-mono break-all select-all mb-4">
            {$page.url.searchParams.get('refresh_token')}
        </div>
        <p class="text-sm text-zinc-400">Copy kode panjang di atas dan paste ke file <code class="bg-white/10 px-1 rounded text-white">.env</code> bagian <strong>SPOTIFY_REFRESH_TOKEN</strong>.</p>
    </div>
  {:else}
    <div class="max-w-xl space-y-6">
        <p class="text-zinc-400">
            Mas Angga bingung cara dapet token? Santai, pakai tools ini aja.<br>
            Pastikan <strong>SPOTIFY_CLIENT_ID</strong> dan <strong>SPOTIFY_CLIENT_SECRET</strong> sudah diisi di file <code class="bg-white/10 px-1 rounded">.env</code> dulu ya.
        </p>
        
        <ol class="text-left text-sm text-zinc-500 space-y-2 list-decimal list-inside bg-zinc-900 p-6 rounded-lg">
            <li>Buka <a href="https://developer.spotify.com/dashboard" target="_blank" class="underline hover:text-white">Spotify Developer Dashboard</a> create App.</li>
            <li>Copy <strong>Client ID</strong> & <strong>Secret</strong> ke file <code>.env</code>.</li>
            <li>Di settings App Spotify, tambah <strong>Redirect URI</strong>: <br><code class="text-white">http://localhost:5173/spotify-setup</code></li>
            <li>Kalau sudah, klik tombol di bawah ini.</li>
        </ol>

        <form action="?/login" method="POST">
            <button class="bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 active:scale-95">
                Login with Spotify
            </button>
        </form>
    </div>
  {/if}
</div>
