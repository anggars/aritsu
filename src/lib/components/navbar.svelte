<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import resumeUrl from '$lib/resume.pdf';
  import { fly, fade, scale } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  
  // State
  let scrolled = $state(false);
  let isDark = $state(true);
  let mobileMenuOpen = $state(false);

  // Nav Items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Resume", href: resumeUrl, target: "_blank" },
  ];

  // Lifecycle
  onMount(() => {
    // Theme Init
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
      isDark = false;
      document.documentElement.classList.remove("dark");
    } else {
      isDark = true;
      document.documentElement.classList.add("dark");
    }

    // Scroll Handler
    const handleScroll = () => {
        scrolled = window.scrollY > 20;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      isDark = false;
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      isDark = true;
    }
  };
</script>

<!-- Navbar Wrapper -->
<div class="fixed left-0 right-0 top-0 z-100 w-full pt-4 pointer-events-none">
  <!-- Inner Content (pointer-events-auto needed because wrapper is none) -->
  <!-- Inner Content (pointer-events-auto needed because wrapper is none) -->
  <nav class="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 flex items-center h-16 pointer-events-auto">
    
    <!-- Dynamic Inner Container -->
    <!-- Dynamic Inner Container -->
    <!-- Dynamic Inner Container -->
    <!-- Dynamic Inner Container -->
    <div 
      class="relative flex items-center justify-between mx-auto transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] 
      {scrolled 
        ? 'w-full md:w-[60%] bg-white/50 dark:bg-[#0B0B0D]/50 backdrop-blur-3xl rounded-full px-6 md:px-8 py-2.5 shadow-2xl shadow-black/5 dark:shadow-black/50 border border-black/5 dark:border-white/10 md:mt-4' 
        : 'w-full bg-transparent'}"
    >
      
      <!-- Logo Container -->
      <a
        href="/"
        class="flex items-center font-clash text-xl font-semibold text-zinc-900 dark:text-[#F6F7FF] hover:text-[#BEF264] transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] whitespace-nowrap overflow-hidden"
        style:width="80px"
      >
        {scrolled ? 'ア' : 'アリツ'}
      </a>

      <!-- Navigation Links (Center - Absolute Positioned) -->
      <div 
          class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] {scrolled ? 'bg-transparent' : 'bg-white/50 dark:bg-[#0B0B0D]/50 backdrop-blur-xl'}"
      >
        {#each navItems as item}
          <a
            href={item.href}
            target={item.target}
            rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
            class="relative flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors duration-200 
            {$page.url.pathname === item.href 
                ? 'text-lime-600 dark:text-[#BEF264]' 
                : 'text-zinc-600 dark:text-[#A9A9BD] hover:text-zinc-900 dark:hover:text-[#F6F7FF]'}"
          >
            <span>{item.name}</span>
          </a>
        {/each}
      </div>

      <!-- Right Actions -->
      <div 
        class="flex items-center justify-end"
        style:width="80px"
      >
        <!-- Theme Toggle (Desktop Only) -->
        <button
          onclick={toggleTheme}
          class="hidden md:flex items-center justify-center rounded-full h-10 w-10 text-zinc-600 dark:text-[#A9A9BD] transition-colors duration-300 hover:text-zinc-900 dark:hover:text-[#F6F7FF] hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Toggle Theme"
        >
          {#if isDark}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9 Z" />
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          {/if}
        </button>

        <!-- Hamburger Menu (Mobile Only) -->
        <button
          onclick={() => mobileMenuOpen = !mobileMenuOpen}
          class="flex md:hidden items-center justify-center rounded-full h-10 w-10 text-zinc-600 dark:text-[#A9A9BD] transition-colors duration-300 hover:text-zinc-900 dark:hover:text-[#F6F7FF] hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Toggle Menu"
        >
          {#if mobileMenuOpen}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    {#if mobileMenuOpen}
      <div 
        transition:fade={{ duration: 300 }}
        class="fixed inset-0 bg-white/95 dark:bg-[#0B0B0D]/95 backdrop-blur-3xl z-[999] flex flex-col md:hidden"
        onclick={() => mobileMenuOpen = false}
      >
        <!-- Menu Content -->
        <div 
          in:fly={{ x: 100, duration: 400, easing: cubicOut }}
          out:fly={{ x: 100, duration: 300, easing: cubicOut }}
          class="flex flex-col h-full" 
          onclick={(e) => e.stopPropagation()}
        >
          <!-- Header with Close Button -->
          <div class="flex items-center justify-between px-6 pt-8 pb-4">
            <a href="/" class="font-clash text-xl font-semibold text-zinc-900 dark:text-[#F6F7FF]">
              アリツ
            </a>
            <button
              onclick={() => mobileMenuOpen = false}
              class="flex items-center justify-center rounded-full h-10 w-10 text-zinc-600 dark:text-[#A9A9BD] transition-colors duration-300 hover:text-zinc-900 dark:hover:text-[#F6F7FF] hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Close Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>

          <!-- Navigation Links (Centered) -->
          <div class="flex-1 flex flex-col items-center justify-center gap-8 px-6">
            {#each navItems as item, i}
              <a
                href={item.href}
                target={item.target}
                onclick={() => mobileMenuOpen = false}
                in:fly={{ y: 30, duration: 400, delay: 100 + (i * 80), easing: cubicOut }}
                class="font-clash text-3xl font-semibold text-zinc-900 dark:text-[#F6F7FF] hover:text-lime-600 dark:hover:text-[#BEF264] transition-colors {$page.url.pathname === item.href ? 'text-lime-600 dark:text-[#BEF264]' : ''}"
              >
                {item.name}
              </a>
            {/each}

            <!-- Theme Toggle in Menu -->
            <div 
              in:scale={{ duration: 400, delay: 500, easing: cubicOut, start: 0.8 }}
              class="mt-8 flex flex-col items-center gap-3"
            >
              <button
                onclick={toggleTheme}
                class="flex items-center justify-center rounded-lg h-12 w-12 bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-[#A9A9BD] transition-all duration-300 hover:bg-zinc-200 dark:hover:bg-white/10"
                aria-label="Toggle Theme"
              >
                {#if isDark}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9 Z" />
                  </svg>
                {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                {/if}
              </button>
              <span class="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-[#A9A9BD]">Appearance</span>
            </div>
          </div>

          <!-- Footer -->
          <div 
            in:fade={{ duration: 400, delay: 600 }}
            class="px-6 pb-8 text-center"
          >
            <p class="text-sm text-zinc-500 dark:text-[#A9A9BD]">© {new Date().getFullYear()} Angga Rianto Sudrajat</p>
          </div>
        </div>
      </div>
    {/if}
  </nav>
</div>
