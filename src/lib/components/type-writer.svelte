<script lang="ts">
	import { onMount } from 'svelte';

	let { roles }: { roles: string[] } = $props();
	let currentRole = $state('');
	let currentIndex = $state(0);
	let charIndex = $state(0);
	let isDeleting = $state(false);

	onMount(() => {
		const typeSpeed = 100;
		const deleteSpeed = 50;
		const pauseTime = 2000;

		const type = () => {
			const fullText = roles[currentIndex];

			if (!isDeleting) {
				// Typing
				if (charIndex < fullText.length) {
					currentRole = fullText.substring(0, charIndex + 1);
					charIndex++;
					setTimeout(type, typeSpeed);
				} else {
					// Pause before deleting
					setTimeout(() => {
						isDeleting = true;
						type();
					}, pauseTime);
				}
			} else {
				// Deleting
				if (charIndex > 0) {
					currentRole = fullText.substring(0, charIndex - 1);
					charIndex--;
					setTimeout(type, deleteSpeed);
				} else {
					// Move to next role
					isDeleting = false;
					currentIndex = (currentIndex + 1) % roles.length;
					setTimeout(type, typeSpeed);
				}
			}
		};

		type();
	});
</script>

<span class="inline-flex items-center">
	{currentRole}<span class="animate-pulse ml-0.5">|</span>
</span>
