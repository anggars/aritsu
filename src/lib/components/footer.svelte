<script lang="ts">
  import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-svelte';
  
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/in/anggarnts', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/anggars', icon: Github },
    { name: 'Instagram', href: 'https://instagram.com/anggarnts', icon: Instagram },
    { name: 'Gmail', href: 'mailto:anggariantosudrajat@gmail.com', icon: Mail }
  ];
</script>

<footer class="w-full py-20 pb-10 bg-white dark:bg-[#0B0B0D] border-t border-zinc-200 dark:border-white/5 transition-colors duration-300">
  <div class="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col gap-16 md:gap-24">
    
    <!-- CTA Section -->
    <div class="flex flex-col gap-8 md:gap-10 items-start">
      <h2 class="font-clash text-4xl md:text-5xl lg:text-6xl font-medium text-zinc-900 dark:text-[#F6F7FF] leading-[0.9]">
        Have an idea? <br />
        <span class="text-zinc-400 dark:text-zinc-600">Let's build it.</span>
      </h2>
      
      <a 
        href="mailto:anggariantosudrajat@gmail.com" 
        class="group flex items-center gap-4 px-8 py-4 bg-zinc-900 dark:bg-[#F6F7FF] text-white dark:text-black rounded-full text-lg font-medium hover:scale-105 hover:bg-zinc-800 dark:hover:bg-white transition-all duration-300"
      >
        <span>Get in touch</span>
        <ArrowUpRight class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </a>
    </div>

    <!-- Bottom Bar -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-t border-zinc-200 dark:border-white/10 pt-10">
      
      <!-- Copyright -->
      <div class="flex flex-col gap-2">
        <p class="font-clash text-xl font-medium text-zinc-900 dark:text-[#F6F7FF]">Angga Rianto Sudrajat</p>
        <p class="text-zinc-500 dark:text-[#A9A9BD] text-sm">
          &copy; {currentYear} All rights reserved. <br class="md:hidden"/> Designed & Built with <a href="https://svelte.dev" target="_blank" rel="noreferrer" class="hover:text-black dark:hover:text-white transition-colors">Svelte</a>
        </p>
      </div>

      <!-- Social Icons -->
      <div class="flex flex-wrap gap-4">
        {#each socialLinks as social}
          <a 
            href={social.href}
            class="p-3 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-[#A9A9BD] hover:bg-zinc-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors duration-300"
            aria-label={social.name}
          >
            <social.icon size={20} strokeWidth={1.5} />
          </a>
        {/each}
      </div>

    </div>
  </div>
</footer>
