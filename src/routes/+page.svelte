<script lang="ts">
	import { onMount } from 'svelte';
	let name: string;
	let namingConvention: string;
	let description = '';
	let res: string;
	let loading = false;

	const getCookieValue = (name: string) =>
		document.cookie
			.match(
				'(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'
			)
			?.pop() || '';

	const updateBackendCallCookie = () => {
		let currentCalls = parseInt(
			getCookieValue('backend_calls') || '0'
		);
		document.cookie = `backend_calls=${
			currentCalls + 1
		}`;
	};

	const generateName = async () => {
		loading = true;
		const response = await fetch(
			'/api/recommendation',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					description
				})
			}
		);
		if (!response.ok) {
			res = 'Error fetching recommendation';
			console.error(
				'Error fetching recommendation'
			);
		}

		const data = await response.json();
		res = data.body.response.content;
		loading = false;
		updateBackendCallCookie();
	};

	onMount(() => {
		document.cookie = `backend_calls=0`;
	});
</script>

<h1 class="text-center text-6xl">VarVogue</h1>
<div
	class="flex flex-col items-center justify-center gap-6 my-auto"
>
	<h1
		class="lg:text-3xl text-2xl text-center text-primary-content font-bold"
	>
		Establishing names for your variables,
		functions, classes, and methods...
	</h1>
	<div
		class="flex md:flex-row flex-col gap-3 md:gap-0 justify-between w-3/4"
	>
		<select
			name="name"
			class="select select-bordered w-full max-w-xs text-lg"
			bind:value={name}
		>
			<option disabled selected
				>What are you creating...</option
			>
			<option>Method</option>
			<option>Class</option>
			<option>Function</option>
			<option>Variable</option>
		</select>
		<select
			name="name"
			class="select select-bordered w-full max-w-xs text-lg"
			bind:value={namingConvention}
		>
			<option disabled selected
				>Naming Convention</option
			>
			<option>Camel Case</option>
			<option>Pascal Case</option>
			<option>Snake Case</option>
		</select>
	</div>

	<textarea
		name="description"
		class="textarea textarea-bordered lg:w-3/4 w-full text-lg"
		placeholder="Describe what it does, or the purpose."
		bind:value={description}
	/>

	<button
		class="btn rounded-md text-lg"
		on:click={generateName}
	>
		{#if loading}
			<span class="loading loading-spinner" />
			loading
		{:else}
			Submit
		{/if}
	</button>
	<div class="text-lg">
		{#if res != undefined}
			My recommendation is: {res}
		{/if}
	</div>
</div>
