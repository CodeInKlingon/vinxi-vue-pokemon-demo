<script setup lang="ts">
import { ref } from "vue";
import { getCount, incrementCount } from "../actions/count.ts";
import Button from "primevue/button";

defineProps<{ msg: string }>();

const count = ref(await getCount());
const isLoading = ref(false);

async function increment() {
	isLoading.value = true;
	count.value = await incrementCount();
	isLoading.value = false;
}
</script>

<template>
	<div class="card">
		<Button type="button" @click="increment" :loading="isLoading"
			>count is {{ count }}</Button
		>
	</div>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
