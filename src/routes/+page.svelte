<script lang="ts">
  import TechStack from '$lib/components/tech-stack.svelte';
  import { onMount } from 'svelte';
  import { Hand } from 'lucide-svelte';
  
  let loaded = $state(false);

  onMount(() => {
    loaded = true;
  });
</script>

<main class="min-h-screen bg-[#0B0B0D] text-[#F6F7FF] selection:bg-[#BEF264] selection:text-black font-satoshi overflow-x-hidden">
  
  <!-- HERO SECTION -->
  <section class="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto pt-32 pb-20">
    
    <!-- Greeting -->
    <div class="mb-8 flex items-center gap-3 text-[#A9A9BD] transform transition-all duration-700 delay-100 {loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
      <div class="animate-wave origin-[70%_70%] text-[#BEF264]">
        <Hand size={20} strokeWidth={2.5} />
      </div>
      <p class="font-medium text-base tracking-wide">Hey! It's me Aritsu,</p>
    </div>

    <!-- Big Headline -->
    <h1 class="font-clash text-[4.5rem] leading-none md:text-6xl lg:w-3/4 lg:text-7xl font-medium text-[#F6F7FF] transform transition-all duration-700 delay-200 {loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
      Crafting <span class="text-[#BEF264]">purpose driven experiences</span> that inspire & engage.
    </h1>

    <!-- Divider & Bio Row -->
    <div class="mt-8 flex flex-col md:flex-row md:items-center gap-4 transform transition-all duration-700 delay-300 {loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
      <!-- Divider -->
      <div class="h-px w-full md:w-32 bg-zinc-800 shrink-0"></div>
      
      <!-- Bio Paragraph -->
      <p class="w-full md:w-1/2 text-pretty text-[#A9A9BD] text-base leading-relaxed">
        I work with brands globally to build pixel-perfect, engaging, and accessible digital experiences that drive results and achieve business goals.
      </p>
    </div>

    <!-- Bottom Actions -->
    <div class="flex flex-col-reverse md:flex-row justify-between items-start md:items-end mt-32 md:mt-40 gap-10 transform transition-all duration-700 delay-500 {loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
        
        <!-- Social Links -->
        <ul class="flex flex-wrap gap-6 md:gap-8">
            {#each ['LinkedIn', 'GitHub', 'Instagram', 'Gmail'] as social}
                <li>
                    <a href="#{social}" class="flex items-center gap-2 text-sm uppercase tracking-wider text-[#A9A9BD] hover:text-[#F6F7FF] transition-colors group">
                        {social}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                            <path d="M7 7h10v10" />
                            <path d="M7 17 17 7" />
                        </svg>
                    </a>
                </li>
            {/each}
        </ul>

        <!-- CTA Button -->
        <a href="/about" class="rounded-full border border-white/10 px-8 py-4 text-sm font-medium uppercase tracking-wider text-[#F6F7FF] transition-all hover:bg-[#F6F7FF] hover:text-black hover:border-[#F6F7FF]">
            Know me better
        </a>
    </div>

  </section>

  <!-- TECH STACK (Moved to separate section visually if needed, but keeping for now as requested previously) -->
  <TechStack />

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
