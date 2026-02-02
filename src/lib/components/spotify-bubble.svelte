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

    let { variant = 'default' }: { variant?: 'default' | 'transparent' } = $props();

    const fetchNowPlaying = async () => {
        try {
            const res = await fetch('/api/now-playing');
            const data = await res.json();
            
            if (data.isPlaying) {
                isPlaying = true;
                // Only update if something changed to prevent re-renders (which reset animations)
                if (track.title !== data.title || track.artist !== data.artist) {
                    track = {
                        title: data.title,
                        artist: data.artist,
                        url: data.songUrl,
                        image: data.albumImageUrl
                    };
                }
            } else {
                isPlaying = false;
            }
        } catch (e) {
            console.error(e);
            // Don't set isPlaying = false on error to prevent flickering, just keep current state
        }
    };

    onMount(() => {
        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 3000);
        return () => clearInterval(interval);
    });
</script>

{#if isPlaying}
    <a 
        href={track.url} 
        target="_blank" 
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 group {variant === 'default' ? 'pl-3 pr-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 border border-zinc-200 dark:border-white/5' : 'p-0 border-0'}"
    >
        <!-- Static Artwork -->
        <div class="relative w-7 h-7 shrink-0">
             <img 
                src={track.image} 
                alt={track.title} 
                class="w-full h-full rounded-md object-cover"
            />
            <div class="absolute inset-0 rounded-md border border-black/10 dark:border-white/10"></div>
        </div>

        <!-- Text Info -->
        <div class="flex flex-col max-w-[140px] overflow-visible ml-0.5 justify-center">
            <div class="w-full overflow-hidden h-5 flex items-center" style={track.title.length > 28 ? "container-type: inline-size; width: 140px" : ""}>
                 {#if track.title.length > 28}
                    {#key track.title}
                        <div class="inline-flex whitespace-nowrap animate-marquee">
                            <span class="font-bold text-[11px] text-zinc-900 dark:text-white">{track.title}</span>
                        </div>
                    {/key}
                {:else}
                    <span class="text-[11px] font-bold text-zinc-900 dark:text-white truncate">{track.title}</span>
                {/if}
            </div>
            
            <div class="w-full overflow-hidden h-4 flex items-center" style={track.artist.length > 28 ? "container-type: inline-size; width: 140px" : ""}>
                {#if track.artist.length > 28}
                    {#key track.artist}
                        <div class="inline-flex whitespace-nowrap animate-marquee">
                            <span class="text-[10px] text-zinc-500 dark:text-[#A9A9BD]">{track.artist}</span>
                        </div>
                    {/key}
                 {:else}
                    <span class="text-[10px] text-zinc-500 dark:text-[#A9A9BD] truncate">{track.artist}</span>
                 {/if}
            </div>
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
    @keyframes pingpong {
        0%, 15% { transform: translateX(0); }
        50%, 65% { transform: translateX(calc(-100% + 100cqw)); }
        100% { transform: translateX(0); }
    }
    
    .animate-marquee {
        display: inline-block;
        animation: pingpong 12s linear infinite;
        will-change: transform;
        padding-left: 0;
        /* Ensure width is enough to hold double content */
        width: max-content; 
    }

    /* Custom Equalizer Animations */
    @keyframes music-bar-1 { 0%, 100% { height: 40%; } 50% { height: 80%; } }
    @keyframes music-bar-2 { 0%, 100% { height: 60%; } 50% { height: 100%; } }
    @keyframes music-bar-3 { 0%, 100% { height: 30%; } 50% { height: 70%; } }

    .animate-music-bar-1 { animation: music-bar-1 0.8s ease-in-out infinite; }
    .animate-music-bar-2 { animation: music-bar-2 1.2s ease-in-out infinite; }
    .animate-music-bar-3 { animation: music-bar-3 1s ease-in-out infinite; }
</style>
