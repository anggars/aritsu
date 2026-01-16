<script lang="ts">
  import TechStack from '$lib/components/tech-stack.svelte';
  import Experience from '$lib/components/experience.svelte';
  import TypeWriter from '$lib/components/type-writer.svelte';
  import Footer from '$lib/components/footer.svelte';
  import { onMount } from 'svelte';
  import { Hand } from 'lucide-svelte';
  import SpotifyBubble from '$lib/components/spotify-bubble.svelte';
  
  // Bio descriptions for typing animation
  const bioPhrases = [
    'Software engineer & designer who turns ideas into pixel-perfect digital experiences.',
    'Full-stack developer crafting modern web applications with React, TypeScript, and everything in between.',
    'Creative builder obsessed with user experience and clean code.',
    'Problem solver who loves bringing ideas to life through code.'
  ];
  
  let loaded = $state(false);

  onMount(() => {
    loaded = true;
  });
</script>

<main class="min-h-screen bg-white dark:bg-[#0B0B0D] text-zinc-900 dark:text-[#F6F7FF] selection:bg-black selection:text-white dark:selection:bg-[#BEF264] dark:selection:text-black font-satoshi overflow-x-hidden">
  
  <!-- HERO SECTION -->
  <section class="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto pt-32 pb-20">
    
    <!-- Greeting -->
    <div class="mb-8 flex items-center gap-3 text-zinc-500 dark:text-[#A9A9BD] transform transition-all duration-700 delay-100 {loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
      <div class="animate-wave origin-[70%_70%] text-lime-600 dark:text-[#BEF264]">
        <Hand size={20} strokeWidth={2.5} />
      </div>
      <p class="font-medium text-base tracking-wide">Hi, I'm Angga.</p>
    </div>

    <!-- Big Headline -->
    <h1 class="font-clash text-5xl leading-none md:text-6xl lg:w-3/4 lg:text-7xl font-medium text-zinc-900 dark:text-[#F6F7FF] transform transition-all duration-700 delay-200 {loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
      I build <span class="text-lime-600 dark:text-[#BEF264]">exceptional web experiences</span> from concept to code.
    </h1>

    <!-- Divider Row with Spotify Bubble overlapping the line -->
    <div class="mt-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-4 w-full transform transition-all duration-700 delay-300 {loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
      <!-- Left side: Spotify Bubble + Divider Line -->
      <div class="relative flex items-center w-full md:flex-1">
        <!-- Spotify Bubble - Shown on both mobile and desktop -->
        <div class="z-10">
          <SpotifyBubble />
        </div>
        <!-- Divider Line - stretches to fill remaining space -->
        <div class="h-px bg-zinc-200 dark:bg-zinc-800 w-full md:flex-1"></div>
      </div>
      
      <!-- Bio Paragraph - Full width on mobile, flex-1 on desktop -->
      <p class="w-full md:flex-1 text-pretty text-zinc-600 dark:text-[#A9A9BD] text-base leading-relaxed">
        <TypeWriter roles={bioPhrases} />
      </p>
    </div>

    <!-- Bottom Actions -->
    <div class="flex flex-col-reverse md:flex-row justify-between items-start md:items-end mt-32 md:mt-40 gap-10 transform transition-all duration-700 delay-500 {loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
        
        <!-- Social Links -->
        <ul class="flex flex-nowrap gap-3 md:gap-8 w-full md:w-auto">
            {#each [
                { name: 'LinkedIn', url: 'https://linkedin.com/in/anggarnts' },
                { name: 'GitHub', url: 'https://github.com/anggars' },
                { name: 'Instagram', url: 'https://instagram.com/anggarnts' },
                { name: 'Gmail', url: 'mailto:anggariantosudrajat@gmail.com' }
            ] as social}
                <li>
                    <a href={social.url} class="flex items-center gap-1.5 md:gap-2 text-[12px] md:text-sm uppercase tracking-wider text-zinc-500 dark:text-[#A9A9BD] hover:text-black dark:hover:text-[#F6F7FF] transition-colors group whitespace-nowrap">
                        {social.name}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                        </svg>
                    </a>
                </li>
            {/each}
        </ul>

        <!-- CTA Button -->
        <a href="/about" class="rounded-full border border-zinc-200 dark:border-white/10 px-8 py-4 text-sm font-medium uppercase tracking-wider text-zinc-900 dark:text-[#F6F7FF] transition-all hover:bg-black hover:text-white dark:hover:bg-[#F6F7FF] dark:hover:text-black hover:border-black dark:hover:border-[#F6F7FF]">
            Know me better
        </a>
    </div>

  </section>


  <!-- TECH STACK (Moved to separate section visually if needed, but keeping for now as requested previously) -->
  <TechStack />
  
  <Experience />
  
  <Footer />


</main>

<style>
    @keyframes wave {
        0% { transform: rotate(0.0deg) }
        10% { transform: rotate(14.0deg) }
        20% { transform: rotate(-8.0deg) }
        30% { transform: rotate(14.0deg) }
        40% { transform: rotate(-4.0deg) }
        50% { transform: rotate(10.0deg) }
        60% { transform: rotate(0.0deg) }
        100% { transform: rotate(0.0deg) }
    }
    .animate-wave {
        animation-name: wave;
        animation-duration: 2.5s;
        animation-iteration-count: infinite;
        transform-origin: 70% 70%;
        display: inline-block;
    }
</style>
