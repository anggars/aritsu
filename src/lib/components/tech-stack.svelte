<script lang="ts">
  const techStack = [
    // Frontend
    { name: "HTML", slug: "html5" },
    { name: "CSS", slug: "css", invert: true },
    { name: "JavaScript", slug: "javascript" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Next.js", slug: "nextdotjs", invert: true },
    { name: "Svelte", slug: "svelte" },
    { name: "Tailwind CSS", slug: "tailwindcss" },
    { name: "Shadcn UI", slug: "shadcnui", invert: true },
    { name: "Framer Motion", slug: "framer" },
    // Backend & AI
    { name: "Python", slug: "python" },
    { name: "FastAPI", slug: "fastapi" },
    { name: "Hugging Face", slug: "huggingface" },
    // Database
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "MongoDB", slug: "mongodb" },
    { name: "Redis", slug: "redis" },
    // DevOps & Tools
    { name: "Docker", slug: "docker" },
    { name: "Git", slug: "git" },
    { name: "GitHub", slug: "github"}
  ];
</script>

<div class="w-full border-y border-zinc-200 dark:border-white/5 bg-zinc-50/50 dark:bg-black/30 py-6 overflow-hidden">
  <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex whitespace-nowrap gap-16 items-center animate-marquee">
    <!-- Duplicate list for seamless loop -->
    {#each [...techStack, ...techStack] as tech}
        <div class="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity cursor-default">
            <div class="w-6 h-6 flex items-center justify-center">
                <!-- Using Simple Icons CDN with brand colors (no color filter) -->
                <img 
                  src="https://cdn.simpleicons.org/{tech.slug}" 
                  alt={tech.name} 
                  class="w-full h-full object-contain {tech.invert ? 'dark:invert' : ''}"
                />
            </div>
            <span class="text-sm font-semibold tracking-wide text-zinc-900 dark:text-[#A9A9BD]">{tech.name}</span>
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
