import { GITHUB_TOKEN } from '$env/static/private';



export const config = {
    isr: {
        expiration: 600 // Cache for 10 minutes
    }
};

export const load = async () => {
    let topLanguages: { name: string; percentage: number; color: string }[] = [];

    // Fallback colors
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
        if (!GITHUB_TOKEN) {
            console.warn('GITHUB_TOKEN is missing. Returning empty stats.');
            return { topLanguages: [] };
        }

        const query = `
            query {
                viewer {
                    repositories(first: 100, ownerAffiliations: OWNER, orderBy: {field: PUSHED_AT, direction: DESC}, isFork: false) {
                        nodes {
                            name
                            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                                edges {
                                    size
                                    node {
                                        color
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;

        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${GITHUB_TOKEN}`,
                'User-Agent': 'Aritsu-Portfolio'
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            console.error('GitHub GraphQL API error:', response.status);
            return { topLanguages: [] };
        }

        const result = await response.json();
        
        if (result.errors) {
            console.error('GitHub GraphQL errors:', result.errors);
            return { topLanguages: [] };
        }

        const repos = result.data.viewer.repositories.nodes;
        const languageStats: Record<string, number> = {};
        const learnedColors: Record<string, string> = {};
        let totalBytes = 0;

        repos.forEach((repo: any) => {
            if (repo.languages && repo.languages.edges) {
                repo.languages.edges.forEach((edge: any) => {
                    const langName = edge.node.name;
                    const langColor = edge.node.color;
                    let size = edge.size;

                    // Store color from API if available
                    if (langColor) {
                        learnedColors[langName] = langColor;
                    }

                    // Jupyter Notebook files are huge JSONs, so we reduce their weight
                    // to represent actual code amount better (approx 10%)
                    if (langName === 'Jupyter Notebook') {
                        size = size * 0.1;
                    }

                    languageStats[langName] = (languageStats[langName] || 0) + size;
                    totalBytes += size;
                });
            }
        });

        topLanguages = Object.entries(languageStats)
            .map(([name, bytes]) => ({
                name,
                percentage: Math.round((bytes / totalBytes) * 100),
                color: learnedColors[name] || languageColors[name] || '#888888'
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
