import { GITHUB_TOKEN } from '$env/static/private';

export const load = async () => {
    let topLanguages: { name: string; percentage: number; color: string }[] = [];

    // Default colors for common languages
    const languageColors: Record<string, string> = {
        TypeScript: '#3178c6',
        JavaScript: '#f1e05a',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Svelte: '#ff3e00',
        Python: '#3572A5',
        Vue: '#41b883',
        Java: '#b07219',
        'C#': '#178600',
        'C++': '#f34b7d',
        Dart: '#00B4AB',
        Go: '#00ADD8',
        Rust: '#dea584'
    };

    try {
        const headers: Record<string, string> = {
            'User-Agent': 'Aritsu-Portfolio'
        };

        if (GITHUB_TOKEN) {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
        }

        // Fetch repositories (limit to 100 most recent pushed)
        const response = await fetch('https://api.github.com/user/repos?sort=pushed&per_page=100&type=owner', {
            headers
        });
        
        if (!response.ok) {
            console.error('GitHub API error:', response.status);
            return { topLanguages: [] };
        }

        const repos = await response.json();
        const languageStats: Record<string, number> = {};
        let totalBytes = 0;

        // Fetch languages for each repo (parallel requests)
        // using logic to avoid rate limits if no token is somewhat risky, but we rely on the token
        const languagePromises = repos.map(async (repo: any) => {
            if (repo.fork) return; // Skip forks

            const langRes = await fetch(repo.languages_url, { headers });
            if (langRes.ok) {
                const langs = await langRes.json();
                Object.entries(langs).forEach(([lang, bytes]) => {
                    // Jupyter Notebook files are huge JSONs, so we reduce their weight
                    // to represent actual code amount better (approx 10%)
                    let weight = bytes as number;
                    if (lang === 'Jupyter Notebook') {
                        weight = weight * 0.1;
                    }
                    
                    languageStats[lang] = (languageStats[lang] || 0) + weight;
                    totalBytes += weight;
                });
            }
        });

        await Promise.all(languagePromises);

        topLanguages = Object.entries(languageStats)
            .map(([name, bytes]) => ({
                name,
                percentage: Math.round((bytes / totalBytes) * 100),
                color: languageColors[name] || '#888888'
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .filter(lang => lang.percentage > 0);

    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
    }

    return {
        topLanguages
    };
};
