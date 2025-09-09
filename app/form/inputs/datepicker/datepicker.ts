import { createInput } from '@formkit/vue';
import c from './datepicker-primevue.vue';
const props = {
    selectionMode: {
        type: String,
        default: 'single'
    },

    showOtherMonths: {
        type: Boolean,
        default: true
    },
    selectOtherMonths: {
        type: Boolean,
        default: false
    },

    numberOfMonths: {
        type: Number,
        default: 1
    },

    minDate: {
        type: Date,
        value: null
    },
    maxDate: {
        type: Date,
        value: null
    },
    disabledDates: {
        type: Array,
        value: null
    },
    disabledDays: {
        type: Array,
        value: null
    },

    showOnFocus: {
        type: Boolean,
        default: true
    },
    showTime: {
        type: Boolean,
        default: false
    },
    timeOnly: {
        type: Boolean,
        default: false
    },
    hourFormat: {
        type: String,
        default: '24'
    },
    stepHour: {
        type: Number,
        default: 1
    },
    stepMinute: {
        type: Number,
        default: 1
    },
    stepSecond: {
        type: Number,
        default: 1
    },
    showSeconds: {
        type: Boolean,
        default: false
    },
    hideOnDateTimeSelect: {
        type: Boolean,
        default: false
    },
    hideOnRangeSelection: {
        type: Boolean,
        default: false
    },
    timeSeparator: {
        type: String,
        default: ':'
    },
    showWeek: {
        type: Boolean,
        default: false
    },
    manualInput: {
        type: Boolean,
        default: true
    },
    appendTo: {
        type: [String, Object],
        default: 'body'
    },

    invalid: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    placeholder: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    id: {
        type: String,
        default: null
    },
    inputId: {
        type: String,
        default: null
    },
    inputClass: {
        type: [String, Object],
        default: null
    },
    inputStyle: {
        type: Object,
        default: null
    },
    panelClass: {
        type: [String, Object],
        default: null
    },
    panelStyle: {
        type: Object,
        default: null
    },
    todayButtonProps: {
        type: Object,
        default() {
            return { severity: 'secondary', text: true, size: 'small' };
        }
    },
    clearButtonProps: {
        type: Object,
        default() {
            return { severity: 'secondary', text: true, size: 'small' };
        }
    },
    navigatorButtonProps: {
        type: Object,
        default() {
            return { severity: 'secondary', text: true, rounded: true };
        }
    },
    timepickerButtonProps: {
        type: Object,
        default() {
            return { severity: 'secondary', text: true, rounded: true };
        }
    }
};
const datepicker_primevue = createInput(c);
if (!datepicker_primevue.props) {
    datepicker_primevue.props = [];
}
datepicker_primevue.props = [...datepicker_primevue.props, ...Object.keys(props)];
export default datepicker_primevue;
