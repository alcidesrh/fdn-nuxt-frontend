<template>
	<main>
		<div class="layout-wrapper" :class="{ mobil: isMobil }">
			<Topbar v-once />
			<SidebarLeft v-once />
			<div id="layout-content" class="layout-content" :class="[sidebarLeftClass, sidebarRightClass]">
				<div class="content">
					<slot />
				</div>
			</div>
			<SidebarRight v-once />
		</div>
	</main>
</template>
<script setup lang="ts">

const sidebarLeft = useSidebarStore("sidebarLeft");
const sidebarRight = useSidebarStore("sidebarRight", "right");

const sidebarLeftClass = computed(
	() => `${sidebarLeft.position}-${sidebarLeft.mode}`
);
const sidebarRightClass = computed(
	() => `${sidebarRight.position}-${sidebarRight.mode}`
);


</script>
