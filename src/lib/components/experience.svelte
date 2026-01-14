<script lang="ts">
  const experiences = [
    {
      company: "Badan Pusat Statistik",
      role: "System Analyst",
      period: "Jun 2025 - Aug 2025",
      type: "Internship",
      description: "Analyzed system requirements and workflows for statistical data processing applications."
    },
    {
      company: "PT Sahabat Jaya Solusindo",
      role: "IT Support",
      period: "Feb 2022 - Apr 2022",
      type: "Full-time",
      description: "Managed IT infrastructure including CCTV installation (IP/Analog), computer hardware troubleshooting, and LAN-WAN maintenance."
    },
    {
      company: "ServBridge Incorporated Pte Ltd",
      role: "Technical Engineer",
      period: "Oct 2021 - Dec 2021",
      type: "Freelance",
      description: "Deployed to Google Data Center for physical layer installation, fiber optics cabling, and hardware setup."
    },
    {
      company: "D'Health",
      role: "System Implementor",
      period: "Oct 2021",
      type: "Freelance",
      description: "Implemented hospital information systems onsite (Morotai Island) including software installation and OS configuration."
    },
    {
      company: "Padepokan Tujuh Sembilan",
      role: "Bootcamp Participant",
      period: "Sep 2020 - Dec 2020",
      type: "Internship",
      description: "Intensive training in Java, Spring Boot, NetBeans, and PostgreSQL backend development."
    },
    {
      company: "PT Berca Hardayaperkasa",
      role: "Desktop Support Engineer",
      period: "Nov 2019 - May 2020",
      type: "Full-time",
      description: "Provided technical support for desktop environments, hardware troubleshooting, and network connectivity (LAN-WAN)."
    },
    {
      company: "BLC Telkom",
      role: "Network Intern",
      period: "Jan 2018 - Apr 2018",
      type: "Internship",
      description: "Handled Mikrotik configuration, Linux system administration, and network troubleshooting."
    }
  ];
</script>

<section class="py-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
    <h2 class="font-clash text-4xl md:text-5xl font-medium mb-16 text-zinc-900 dark:text-[#F6F7FF] transform transition-all duration-700">
        Work <span class="text-lime-600 dark:text-[#BEF264]">Experience</span>
    </h2>

    <div class="flex flex-col gap-12 border-l border-zinc-200 dark:border-white/10 pl-8 md:pl-16 relative">
        {#each experiences as exp}
            <div class="relative group transform transition-all duration-500 hover:translate-x-2">
                <!-- Dot -->
                <div class="absolute -left-[37px] md:-left-[69px] top-2 w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-[#0B0B0D] group-hover:bg-lime-600 dark:group-hover:bg-[#BEF264] transition-colors duration-300"></div>
                
                <h3 class="font-clash text-2xl font-semibold text-zinc-900 dark:text-[#F6F7FF] mb-2">{exp.role}</h3>
                <div class="flex items-center gap-3 mb-4 flex-wrap">
                    <span class="text-lg text-zinc-500 dark:text-[#A9A9BD] font-medium">{exp.company}</span>
                    <span class="hidden md:block w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                    <span class="text-sm font-medium uppercase tracking-wider text-lime-600 dark:text-[#BEF264]">{exp.period}</span>
                    <span class="px-2 py-0.5 rounded-full border border-zinc-200 dark:border-white/10 text-xs text-zinc-500 dark:text-[#A9A9BD] bg-zinc-100 dark:bg-[#1A1A1D]">{exp.type}</span>
                </div>
                <p class="text-zinc-600 dark:text-[#A9A9BD] leading-relaxed max-w-2xl text-base">
                    {exp.description}
                </p>
            </div>
        {/each}
    </div>
</section>
