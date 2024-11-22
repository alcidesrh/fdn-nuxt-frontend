import { defineStore } from 'pinia';
import { buses, columnsCollection } from '~~/graphql/queries';

export const useBusCollectionStore = defineStore('busCollection', () => {
    const { collection, sort, highlighted } = collectionStore();

    const resource = 'bus';

    watch(
        () => collection.value.items,
        () => {
            nextTick(() => highlighted());
        }
    );

    function ini() {
        getCollection(buses, collection);

        gqlQueryColumns(columnsCollection, collection);
    }

    msg(`filterinput_${resource}`).on((v: any) => {
        collection.value.loading = v;
    });
    return { collection, sort, ini };
});
