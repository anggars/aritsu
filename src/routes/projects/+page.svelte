<script lang="ts">
  import Navbar from '$lib/components/navbar.svelte';
  import Footer from '$lib/components/footer.svelte';
  import personalifyThumb from '$lib/images/personalify.png';
  import sentimindThumb from '$lib/images/sentimind.png';
  import { ArrowUpRight } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  let loaded = false;
  onMount(() => {
    loaded = true;
  });

  const projects = [
    {
       name: "Personalify",
       desc: "Spotify Analytics & Lyrics Analyzer. Features top tracks/artists, Genius lyrics integration, and deep emotional insights using Transformer models.",
       stack: ["Next.js", "FastAPI", "Hugging Face", "PostgreSQL", "MongoDB", "Redis", "Spotify API"],
       thumb: personalifyThumb,
       link: "https://personalify.vercel.app"
    },
    {
       name: "Sentimind",
       desc: "Advanced Personality & Emotion AI. Features MBTI/Emotion detection (SVM, DistilBERT, Roberta), YouTube analysis, Gemini Chatbot, and Quizzes.",
       stack: ["Next.js", "FastAPI", "TensorFlow", "SVM", "DistilBERT", "Gemini API", "YouTube API"],
       thumb: sentimindThumb,
       link: "https://sentimind.vercel.app"
    }
  ];
</script>

<Navbar />

<main class="min-h-screen bg-white dark:bg-[#0B0B0D] text-zinc-900 dark:text-[#F6F7FF] selection:bg-lime-500/30 selection:text-lime-900 dark:selection:text-[#BEF264] font-satoshi overflow-x-hidden transition-colors duration-300">
  <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-32 pb-20">
    
    <!-- Header -->
    <div class="mb-24 md:mb-32 transform transition-all duration-700 delay-100 {loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}">
        <h1 class="font-clash font-medium text-5xl md:text-6xl lg:text-7xl leading-none mb-6">
           Selected <span class="text-lime-600 dark:text-[#BEF264]">Work</span>
        </h1>
        <p class="text-zinc-500 dark:text-[#A9A9BD] text-lg md:text-xl max-w-2xl text-pretty">
            A showcase of my featured projects, from data visualization dashboards to AI-powered applications.
        </p>
        <div class="h-px bg-zinc-200 dark:bg-zinc-800 w-full max-w-sm mt-8"></div>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {#each projects as project, i}
            <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                class="group flex flex-col gap-6 transform transition-all duration-700 delay-[{200 + i * 150}ms] {loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
            >
                <!-- Thumbnail Card -->
                <div class="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 group-hover:border-zinc-300 dark:group-hover:border-white/20 transition-all duration-500">
                    <img 
                        src={project.thumb} 
                        alt={project.name} 
                        class="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                <!-- Content -->
                <div class="flex flex-col gap-3">
                    <div class="flex items-center justify-between">
                        <h3 class="font-clash text-2xl md:text-3xl font-medium group-hover:text-lime-600 dark:group-hover:text-[#BEF264] transition-colors">{project.name}</h3>
                        <ArrowUpRight class="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-zinc-400 dark:text-[#A9A9BD]" />
                    </div>
                    
                    <p class="text-zinc-500 dark:text-[#A9A9BD] leading-relaxed text-sm md:text-base">
                        {project.desc}
                    </p>

                    <!-- Tech Capsules -->
                    <div class="flex flex-wrap gap-2 mt-2">
                        {#each project.stack as tech}
                            <span class="px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-[#A9A9BD] border border-zinc-200 dark:border-white/10">
                                {tech}
                            </span>
                        {/each}
                    </div>
                </div>
            </a>
        {/each}
    </div>

  </div>
  
  <Footer />
</main>
