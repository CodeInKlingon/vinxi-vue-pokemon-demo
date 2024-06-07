<script setup lang="ts">
import { ref } from "vue";
import { getCount, incrementCount } from "../actions/count.ts";

defineProps<{ msg: string }>();

const count = ref(await getCount());

async function increment() {
	count.value = await incrementCount();
}
</script>

<template>
	<div class="card">
		<button type="button" @click="increment">count is {{ count }}</button>
	</div>
</template>

<style scoped>
.read-the-docs {
	color: #888;
}
</style>
