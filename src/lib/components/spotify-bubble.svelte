<script lang="ts">
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    import { Music } from 'lucide-svelte';

    let isPlaying = $state(false);
    let track = $state({
        title: '',
        artist: '',
        url: '',
        image: ''
    });

    const fetchNowPlaying = async () => {
        try {
            const res = await fetch('/api/now-playing');
            const data = await res.json();
            
            if (data.isPlaying) {
                isPlaying = true;
                track = {
                    title: data.title,
                    artist: data.artist,
                    url: data.songUrl,
                    image: data.albumImageUrl
                };
            } else {
                isPlaying = false;
            }
        } catch (e) {
            console.error(e);
            isPlaying = false;
        }
    };

    onMount(() => {
        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 30000);
        return () => clearInterval(interval);
    });
</script>

{#if isPlaying}
    <a 
        href={track.url} 
        target="_blank" 
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 ml-3 pl-1 pr-3 py-1 rounded-full bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors border border-zinc-200 dark:border-white/5 group"
    >
        <!-- Rotating Artwork -->
        <div class="relative w-8 h-8 flex-shrink-0">
             <img 
                src={track.image} 
                alt={track.title} 
                class="w-full h-full rounded-full object-cover animate-[spin_4s_linear_infinite]"
            />
            <div class="absolute inset-0 rounded-full border border-black/10 dark:border-white/10"></div>
        </div>

        <!-- Text Info -->
        <div class="flex flex-col max-w-[120px]">
            <span class="text-[10px] font-bold text-zinc-900 dark:text-white leading-tight truncate">{track.title}</span>
            <span class="text-[9px] text-zinc-500 dark:text-[#A9A9BD] leading-tight truncate">{track.artist}</span>
        </div>

        <!-- Mini Equalizer -->
        <div class="flex items-end gap-[1.5px] h-3 ml-1">
            <span class="w-[1.5px] bg-lime-600 dark:bg-[#BEF264] rounded-full animate-music-bar-1 h-full"></span>
            <span class="w-[1.5px] bg-lime-600 dark:bg-[#BEF264] rounded-full animate-music-bar-2 h-full"></span>
            <span class="w-[1.5px] bg-lime-600 dark:bg-[#BEF264] rounded-full animate-music-bar-3 h-full"></span>
        </div>
    </a>
{/if}

<style>
    /* Custom Equalizer Animations */
    @keyframes music-bar-1 { 0%, 100% { height: 40%; } 50% { height: 80%; } }
    @keyframes music-bar-2 { 0%, 100% { height: 60%; } 50% { height: 100%; } }
    @keyframes music-bar-3 { 0%, 100% { height: 30%; } 50% { height: 70%; } }

    .animate-music-bar-1 { animation: music-bar-1 0.8s ease-in-out infinite; }
    .animate-music-bar-2 { animation: music-bar-2 1.2s ease-in-out infinite; }
    .animate-music-bar-3 { animation: music-bar-3 1s ease-in-out infinite; }
</style>
