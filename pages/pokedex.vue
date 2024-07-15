<template>
	<div style="width: 100px; margin: 20px">
		<Menu
			:model="[
				{
					label: 'List',
					icon: 'pi pi-list',
					route: '/pokedex',
				},
				{
					label: 'Create',
					icon: 'pi pi-plus',
					route: '/pokedex/create',
				},
			]"
		>
			<template #item="{ item, props }">
				<router-link
					v-if="item.route"
					v-slot="{ href, navigate }"
					:to="item.route"
					custom
				>
					<a
						v-ripple
						:href="href"
						v-bind="props.action"
						@click="navigate"
					>
						<span :class="item.icon" />
						<span class="ml-2">{{ item.label }}</span>
					</a>
				</router-link>
				<a
					v-else
					v-ripple
					:href="item.url"
					:target="item.target"
					v-bind="props.action"
				>
					<span :class="item.icon" />
					<span class="ml-2">{{ item.label }}</span>
				</a>
			</template>
		</Menu>
	</div>

	<router-view />
</template>
<script setup lang="ts">
import Menu from "primevue/menu";
</script>
