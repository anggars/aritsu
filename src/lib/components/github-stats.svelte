<script lang="ts">
    interface Language {
        name: string;
        percentage: number;
        color: string;
    }

    let { data } = $props<{ data: Language[] }>();
</script>

{#if data && data.length > 0}
    <section class="py-12 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto">
        <h2 class="font-clash text-4xl md:text-5xl font-medium mb-16 text-zinc-900 dark:text-[#F6F7FF] transform transition-all duration-700">
            Language <span class="text-lime-600 dark:text-[#BEF264]">Statistics</span>
        </h2>

        <div class="p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-black/40">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                 {#each data as lang}
                    <div class="group flex flex-col gap-3">
                        <div class="flex justify-between items-baseline mb-1">
                            <span class="text-lg font-medium text-zinc-700 dark:text-[#E0E1EC] whitespace-nowrap">{lang.name}</span>
                            <span class="text-sm text-zinc-500 font-mono tracking-wider opacity-80">{lang.percentage}%</span>
                        </div>
                        
                        <div class="h-2.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                                class="h-full rounded-full transition-all duration-1000 ease-out group-hover:brightness-110"
                                style="width: {lang.percentage}%; background-color: {lang.color};"
                            ></div>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </section>
{/if}
