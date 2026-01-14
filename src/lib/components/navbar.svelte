<script lang="ts">
  import { onMount } from 'svelte';
  
  // State
  let scrolled = $state(false);
  let isDark = $state(true);

  // Nav Items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
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
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

<!-- Navbar: centered, sticky with scroll behavior -->
<div class="fixed left-0 right-0 top-0 z-100 flex w-full justify-center transition-all duration-300 {scrolled ? 'pt-4' : 'pt-8'}">
  <nav class="flex items-center gap-2 rounded-full transition-all duration-500 {scrolled 
    ? 'bg-[#0B0B0D]/80 backdrop-blur-xl shadow-2xl shadow-black/50 border-0' 
    : 'bg-[#0B0B0D]/80 backdrop-blur-xl border border-white/10'} px-2 py-1.5">
    
    <!-- Logo -->
    <a
      href="/"
      class="font-clash text-base font-semibold text-[#F6F7FF] hover:text-[#BEF264] transition-colors px-3 whitespace-nowrap"
    >
      アリツ
    </a>

    <!-- Indicator dot untuk active page -->
    <div class="h-1 w-1 rounded-full bg-[#BEF264]"></div>
    
    <!-- Links -->
    {#each navItems as item}
      <a
        href={item.href}
        class="relative flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap text-[#A9A9BD] hover:text-[#F6F7FF] transition-colors"
      >
        <span>{item.name}</span>
      </a>
    {/each}

    <!-- Theme Toggle -->
    <button
      onclick={toggleTheme}
      class="flex items-center justify-center rounded-full h-8 w-8 text-[#A9A9BD] transition-colors hover:text-[#F6F7FF] hover:bg-white/5"
      aria-label="Toggle Theme"
    >
      {#if isDark}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
  </nav>
</div>
