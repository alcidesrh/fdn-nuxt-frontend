// https://nuxt.com/docs/api/configuration/nuxt-config
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import tailwindcss from '@tailwindcss/vite';
import Components from 'unplugin-vue-components/vite';
import { createResolver } from '@nuxt/kit';

export default defineNuxtConfig({
	modules: [
		'@vueuse/nuxt',
		'@pinia/nuxt',
		'pinia-plugin-persistedstate/nuxt',
		'@unocss/nuxt',
		'@formkit/nuxt',
		'dayjs-nuxt',
		'@nuxt/fonts',
	],
	plugins: ['~/plugins/primevue/primevue.ts'],
	ssr: false,
	// pages: true,
	components: {
		dirs: [
			{ global: true, path: '~/form/inputs/components' },
			'~/components/global',
			'~/components',
		],
	},
	// typescript: {
	//   strict: false,
	// },
	imports: {
		presets: [
			{
				from: 'voca',
				imports: ['voca'],
			},
			{
				from: '@formkit/vue',
				imports: ['FormKitMessages'],
			},
		],
	},
	devtools: { enabled: false },
	css: ['@/assets/styles.css'],
	compatibilityDate: '2025-07-15',
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	vite: {
		plugins: [
			Components({
				resolvers: [PrimeVueResolver()],
			}),
			tailwindcss(),
		],
		define: {
			'globalThis.__DEV__': JSON.stringify(true),
		},
	},
	// page: true,
	router: {
		options: {
			// hashMode: true,
			scrollBehaviorType: 'smooth',
		},
	},
	hooks: {
		// 'pages:routerOptions': function ({ files }) {
		// 	const resolver = createResolver(import.meta.url);
		// 	// add a route
		// 	files.push({
		// 		path: '~/graphql/router.options.ts', // resolver.resolve("~/router.options.ts"),
		// 		// optional: true,
		// 	});
		// },
		'pages:extend': function (pages) {
			function setMiddleware(pages) {
				for (const page of pages) {
					if (!['Login', 'Test'].includes(page.name)) {
						page.meta ||= {};
						// Note that this will override any middleware set in `definePageMeta` in the page
						page.meta.auth = true;
					}

					if (page.children) setMiddleware(page.children);
				}
			}
			setMiddleware(pages);

			// add a route
			// pages.push({
			//     path: resolver.resolve('./router.options'),
			//     optional: true
			// });
			// remove routes
			// function removePagesMatching(pattern: RegExp, pages: NuxtPage[] = []) {
			//     const pagesToRemove: NuxtPage[] = [];
			//     for (const page of pages) {
			//         if (page.file && pattern.test(page.file)) {
			//             pagesToRemove.push(page);
			//         } else {
			//             removePagesMatching(pattern, page.children);
			//         }
			//     }
			//     for (const page of pagesToRemove) {
			//         pages.splice(pages.indexOf(page), 1);
			//     }
			// }
			// removePagesMatching(/\.ts$/, pages);
		},
	},
	pinia: {
		storesDirs: ['app/stores/**'],
	},

	piniaPluginPersistedstate: {
		storage: 'localStorage',
	},
});
