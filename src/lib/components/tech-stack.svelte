<script lang="ts">
  const techStack = [
    "Docker", "Firebase", "AWS", "GSAP", "Framer Motion", "Figma", 
    "Tailwind CSS", "GIT", "HTML", "CSS", "JavaScript", "TypeScript"
  ];
</script>

<div class="w-full border-y border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-black/30 py-6 overflow-hidden">
  <div class="flex whitespace-nowrap gap-16 items-center animate-marquee">
    <!-- Duplicate list for seamless loop -->
    {#each [...techStack, ...techStack] as tech}
        <div class="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
            <div class="w-5 h-5 rounded-md bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-900 dark:text-white">
                {tech[0]}
            </div>
            <span class="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-[#A9A9BD]">{tech}</span>
        </div>
    {/each}
  </div>
</div>

<style>
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
  /* Pause on hover optional */
  .animate-marquee:hover {
    animation-play-state: paused;
  }
</style>
