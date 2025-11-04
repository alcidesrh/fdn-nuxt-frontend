<template>
	<div>
		<div id="intersectionObservertarget" class="absolute" />
		<div class="layout-topbar" :class="{ dark: ui.darkTheme }">
			<div class="layout-topbar-inner z-2">
				<clock />
				<BreadCumbCustom />
				<div class="layout-topbar-actions">
					<button type="button" class="layout-topbar-action">
						<i class="pi pi-calendar" />
					</button>
					<button type="button" class="layout-topbar-action">
						<i class="pi pi-inbox" />
					</button>
					<button type="button" class="layout-topbar-action" @click="ui.toggleDarkMode()">
						<i class="pi" :class="[
							{
								'pi-moon': ui.darkTheme,
								'pi-sun': !ui.darkTheme
							}
						]" />
					</button>
					<div class="relative">
						<button type="button" class="layout-topbar-action" @click="hideConfiguration = !hideConfiguration">
							<i class="pi pi-palette" />
						</button>
						<Configurator v-if="!hideConfiguration" @hidden="hideConfiguration = true" />
					</div>
					<!-- <div @click="logout" > -->
					<Icon class="cursor-pointer" name="icon-park-outline:logout" mode="svg" size="24" @click="logout" />
					<!-- </div> -->
				</div>
			</div>
			<!-- <a href="/logout" class="btn-logout"> -->
			<!-- <i class="pi pi-times-circle"></i> -->
			<!-- <Icon name="icon-park-outline:logout" mode="svg" size="24" /> -->
			<!-- </a> -->
			<div class="topbar-bg fixed left-0px top-0px z-1 h-70px w-full" />
		</div>
	</div>
</template>
<script setup lang="ts">
import Configurator from "./Configurator.vue";

const ui = useThemeStateStore();
const hideConfiguration = ref(true);
function setOptions(query: string, options: RequestInit): RequestInit {
	if (!options.method) {
		options.method = 'POST';
	}

	if (!(options.headers instanceof Headers)) {
		options.headers = new Headers(options.headers);
	}

	if (options.headers.get('Content-Type') === null) {
		options.headers.set('Content-Type', 'application/json');
	}

	if (options.method !== 'GET' && !options.body) {
		options.body = JSON.stringify({ query });
	}

	return options;
}
async function logout() {
	gloading.value = true
	await useApiRest('/logout', {
		onResponse(r) {
			gloading.value = false
			useUserSessionStore().clear();
			navigateTo({ name: "Login" });
		}
	}).catch(err => {
		alert('Logout Error')
		cl(err)
		useUserSessionStore().clear();
		navigateTo({ name: "Login" });
	})
		.finally(() => { });

}
const observer = new IntersectionObserver(
	(e) => {
		const el = document.querySelector(".layout-topbar");
		if (e[0].intersectionRatio < 1)
			el.classList.add("layout-topbar-sticky");
		else el.classList.remove("layout-topbar-sticky");
	},
	{
		threshold: 1
	}
);

onMounted(async () => {

	const el = document.querySelector("#intersectionObservertarget");

	observer.observe(el);
});
onUnmounted(() => observer.disconnect())
</script>
