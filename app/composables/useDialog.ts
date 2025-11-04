import { useDialog as d } from 'primevue/usedialog';
export function useDialog() {
	const dialog = d();
	return {
		open: (c, o = {}) => dialog.open(c, o),
	};
}
