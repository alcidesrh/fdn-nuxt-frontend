import { FetchItemData } from '~~/types/api';
import { defineStore } from 'pinia';
import { User } from '~/graphql/graphql';

const { collection, columns, filter } = useCollection();
const bus = useEventBus('msg');

interface State {
    total: number;
}

export const useUserMetadataStore = defineStore('userMetadata', {
    state: (): State => ({
        total: 0
    }),
    actions: {
        setData({ retrieved, isLoading, error, hubUrl }: FetchItemData<User>) {
            this.setRetrieved(retrieved.value);
            this.setLoading(isLoading.value);
            this.setHubUrl(hubUrl.value);

            if (error.value instanceof Error) {
                this.setError(error.value?.message);
            }
        },
        setTotal(total: number) {
            this.total = total;
        },
        async ini() {
            await $fetch('/api/metadata/user', {
                ...API_DEFAULT_OPTIONS,
                method: 'GET'
            })
                .then((resp: any) => {
                    collection.pagination.totalCount = resp.total;
                    columns.value = resp.collection as any;
                    columns.value
                        .filter((i) => i.search)
                        .forEach((i: any) => {
                            filter.value.loading[i.field] = ref(false);
                        });
                })
                .catch(({ response: { _data } }) => {
                    const error = _data.error || _data.detail || 'No se pudo iniciar la sesión';
                    bus.emit({ msg: error, type: 'error' });
                });
        }
    }
});
