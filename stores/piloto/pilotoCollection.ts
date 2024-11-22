import { defineStore } from 'pinia';
import { pilotos, columnsCollection } from '~~/graphql/queries';

export const usePilotoCollectionStore = defineStore('pilotoCollection', () => {
    const { collection, sort, highlighted } = collectionStore();

    const resource = 'piloto';

    watch(
        () => collection.value.items,
        () => {
            nextTick(() => highlighted());
        }
    );

    function ini() {
        getCollection(pilotos, collection);

        gqlQueryColumns(columnsCollection, collection);
    }

    msg(`filterinput_${resource}`).on((v: any) => {
        collection.value.loading = v;
    });
    return { collection, sort, ini };
});
