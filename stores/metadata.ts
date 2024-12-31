import { defineStore } from 'pinia';
import { Api, parseGraphQl } from '@api-platform/api-doc-parser';

interface State {
    api: {} | boolean;
}

export const useMetadataStore = defineStore('Metadata', {
    persist: true,
    state: (): State => ({
        api: false
    }),
    actions: {
        setApiMetadata() {
            // log(this.api.User);
            // this.api = { p: 9 };
            log(this.api);
            if (!this.api) {
                this.api = {};
                parseGraphQl('http://localhost/graphql').then(({ api }: any) => {
                    api.resources.forEach((element, i) => {
                        if (i > 7) return;
                        try {
                            this.api[element.name] = useCloned(element).cloned.value;
                        } catch (error) {}
                    });

                    log(this.api);
                });
            }
        }
    }
});
