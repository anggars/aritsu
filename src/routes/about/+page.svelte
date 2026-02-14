<script lang="ts">
  import Navbar from '$lib/components/navbar.svelte';
  import Footer from '$lib/components/footer.svelte';
  import { onMount } from 'svelte';
  // import { fade } from 'svelte/transition'; // Removed

  // Import images
  import photo1 from '$lib/images/photo-1.jpg';
  import photo2 from '$lib/images/photo-2.jpg';
  import photo3 from '$lib/images/photo-3.jpg';
  import photo4 from '$lib/images/photo-4.jpg';

  // Props
  let { data } = $props();

  let loaded = $state(false);
  onMount(() => {
    loaded = true;
  });
 
  // Photo Stack Logic
  let photos = $state([photo1, photo2, photo3, photo4]);
  
  function shufflePhotos() { // Changed to function declaration
    // rotate logic: first becomes last
    const first = photos[0];
    photos = [...photos.slice(1), first];
  }

  // Rotations for natural messy stack look (static assignments based on index)
  const getRotation = (index: number) => {
     if (index === 0) return 'rotate-2';
     if (index === 1) return '-rotate-3';
     if (index === 2) return 'rotate-1';
     return '-rotate-2';
  };
</script>

<Navbar />

<div class="min-h-screen bg-white dark:bg-[#09090B] text-zinc-900 dark:text-white transition-colors duration-300 font-satoshi selection:bg-lime-400 selection:text-black">
  
  <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20">
    
    <div class="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        
        <!-- Left Content: Copywriting -->
        <div class="flex-1 transform transition-all duration-700 {loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
            <h1 class="font-clash font-medium text-4xl md:text-5xl lg:text-7xl leading-none mb-8 whitespace-nowrap">
                <span class="text-lime-600 dark:text-[#BEF264]">Angga</span> Rianto Sudrajat
            </h1>
            
            <div class="space-y-6 text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-[#A9A9BD] text-justify hyphens-auto">
                <p>
                    Hi, you can call me <strong>Angga</strong>. I'm a software engineer based in Indonesia with a knack for building digital products that just <em>feel right</em>.
                </p>
                <p>
                    I started my journey with a simple curiosity about how things work on the web, and that curiosity quickly turned into an obsession. Now, I spend my days (and sometimes nights) crafting code, exploring new technologies like <strong>Svelte</strong> and <strong>AI</strong>, and solving problems that actually matter.
                </p>
                <p>
                    Currently, I'm diving deep into the world of Machine Learning, trying to bridge the gap between complex algorithms and intuitive user interfaces. I believe technology should be accessible, beautiful, and yes, a little bit magical.
                </p>
                <p>
                    Aside from the nitty-gritty of coding, I'm a huge music enthusiast. You'll often find me zoning out to my carefully curated Spotify playlists or hunting for the next hidden gem. I also have a soft spot for great coffee and minimalism.
                </p>
                
                <div class="pt-8">
                     <p class="font-medium text-zinc-900 dark:text-[#F6F7FF]">Let's chat!</p>
                     <a href="mailto:anggariantosudrajat@gmail.com" class="text-lime-600 dark:text-[#BEF264] hover:underline decoration-wavy underline-offset-4">anggariantosudrajat@gmail.com</a>
                </div>
            </div>
        </div>

        <!-- Right Content: Photo Stack -->
        <div class="w-full lg:w-[35%] mt-10 lg:mt-0 transform transition-all duration-700 delay-300 {loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}">
            
            <button 
                class="relative w-full aspect-3/4 cursor-pointer group select-none block text-left"
                onclick={shufflePhotos}
                aria-label="Shuffle photos"
            >
                <!-- Render photos in reverse order so first index is on TOP (z-index) -->
                {#each [...photos].reverse() as photo, i}
                    {@const realIndex = photos.length - 1 - i}
                    <div 
                        class="absolute inset-0 bg-white dark:bg-zinc-800 p-3 pb-8 shadow-2xl rounded-2xl border border-black/5 dark:border-white/5 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                        style:z-index={photos.length - realIndex}
                        style:transform="rotate({realIndex === 0 ? '0deg' : (realIndex % 2 === 0 ? '2deg' : '-2deg')}) scale({1 - (realIndex * 0.02)}) translate({realIndex * 2}px, {realIndex * 2}px)"
                        style:opacity={1 - (realIndex * 0.05)}
                    >
                        <div class="w-full h-full overflow-hidden relative rounded-xl grayscale-20 contrast-110 sepia-10 transition-all duration-500 group-hover:grayscale-0">
                            <img 
                                src={photo} 
                                alt="Angga" 
                                class="w-full h-full object-cover"
                                style:object-position={photo === photo1 ? 'center 25%' : 'center'}
                                draggable="false"
                            />
                            <!-- Polaroid texture/shine -->
                            <div class="absolute inset-0 bg-linear-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                {/each}
            </button>
            <div class="mt-4 text-center">
                <div class="text-sm text-zinc-400 dark:text-zinc-600 animate-pulse whitespace-nowrap">
                   (Click to shuffle)
                </div>
            </div>
        
        </div>

    </div>

    <!-- Music Section -->
    <div class="mt-24 md:mt-32 transform transition-all duration-700 delay-500 {loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} flex flex-col items-start">
        <h2 class="font-clash text-3xl font-semibold mb-10 w-full text-left">My top tracks</h2>
        
        {#if data.tracks && data.tracks.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {#each data.tracks as song}
                    <iframe 
                        src="https://open.spotify.com/embed/track/{song.id}?utm_source=generator" 
                        width="100%" 
                        height="80" 
                        frameBorder="0" 
                        allowfullscreen={false} 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        class="rounded-xl shadow-lg"
                        title="Spotify Embed: {song.title}"
                    ></iframe>
                {/each}
            </div>
        {:else}
             <!-- Fallback if no data / waiting for env -->
             <div class="p-6 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-center w-full">
                <p class="text-zinc-500">Connect to Spotify API to see tracks.</p>
             </div>
        {/if}

        <p class="mt-6 text-sm text-zinc-500 dark:text-[#A9A9BD] w-full text-left">
            *Syncs automatically with my Spotify monthly top tracks.
        </p>
    </div>
  </div>
  
  <Footer />
  </div>
