import { createInput } from '@formkit/vue';
import selectprimevue from './radio-primevue.vue';
import BaseProps from '../BaseProps';

const props = {
	...BaseProps,
	// value: null,
	binary: Boolean,
	readonly: {
		type: Boolean,
		default: false,
	},
	tabindex: {
		type: Number,
		default: null,
	},
	inputId: {
		type: String,
		default: null,
	},
	inputClass: {
		type: [String, Object],
		default: null,
	},
	inputStyle: {
		type: Object,
		default: null,
	},
	ariaLabelledby: {
		type: String,
		default: null,
	},
	ariaLabel: {
		type: String,
		default: null,
	},
};
const radio_primevue = createInput(selectprimevue, { props: props });
export default radio_primevue;
