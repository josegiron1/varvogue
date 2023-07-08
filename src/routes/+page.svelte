<script lang="ts">
	let propertiesForName: {
		name: string;
		namingConvention: string;
		description: string;
	} = {
		name: 'What are you creating...',
		namingConvention: 'Naming Convention',
		description: ''
	};
	let res: { name: string }[];
	let loading = false;
	let error: string;

	const generateName = async () => {
		error = '';
		loading = true;

		if (
			propertiesForName.name ===
			'What are you creating...'
		) {
			error =
				'Please select what you are creating.';
			loading = false;
			return;
		}

		if (
			propertiesForName.namingConvention ===
			'Naming Convention'
		) {
			error =
				'Please select a naming convention.';
			loading = false;
			return;
		}

		if (propertiesForName.description === '') {
			error = 'Please enter a description.';
			loading = false;
			return;
		}

		try {
			const response = await fetch(
				'/api/recommendation',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(propertiesForName)
				}
			);

			if (!response.ok) {
				throw new Error(
					'Error fetching recommendation'
				);
			}

			let data = await response.json();
			data = JSON.parse(
				data.body.response.content
			).list;
			res = data;
		} catch (err: any) {
			error = err.message;
			console.error(err);
		} finally {
			loading = false;
		}
	};
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
			bind:value={propertiesForName.name}
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
			name="namingConvention"
			class="select select-bordered w-full max-w-xs text-lg"
			bind:value={propertiesForName.namingConvention}
		>
			<option disabled selected
				>Naming Convention</option
			>
			<option value="camelCase">Camel Case</option
			>
			<option value="PascalCase"
				>Pascal Case</option
			>
			<option value="snake_case"
				>Snake Case</option
			>
		</select>
	</div>

	<textarea
		name="description"
		class="textarea textarea-bordered lg:w-3/4 w-full text-lg"
		placeholder="Describe what it does, or the purpose."
		bind:value={propertiesForName.description}
	/>

	<button
		class="btn rounded-md text-lg"
		on:click={generateName}
	>
		{#if loading}
			<span class="loading loading-spinner" />
			Please wait...
		{:else}
			Submit
		{/if}
	</button>

	{#if error}
		<div class="text-lg text-red-500">
			{error}
		</div>
	{/if}

	{#if res != undefined}
		<div class="text-lg">
			My list of recommendation:
		</div>
		{#each res as item}
			<div class="text-lg">
				{item.name}
			</div>
		{/each}
	{/if}
</div>
