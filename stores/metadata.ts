import { useQuery, useLazyQuery } from '@vue/apollo-composable';
import { defineStore } from 'pinia';
import gql from 'graphql-tag';
import { ApolloError } from '@apollo/client/errors';
import { Maybe, MetadataResource } from '~/graphql/graphql';

const { collection, columns, filter } = useCollection();

interface State {
    status: [];
}

export const useMetadataStore = defineStore('Metadata', {
    state: (): State => ({
        status: []
    }),
    actions: {
        async ini(className: string) {
            const { onResult, loading, onError } = useQuery(
                gql`
                    query getMetadataResource($status: Boolean, $className: String) {
                        getMetadataResource(status: $status) {
                            status
                        }
                        columnsMetadataResource(className: $className) {
                            columns
                        }
                    }
                `,
                { status: true, className: className }
            );
            // load();
            onResult(
                (result: {
                    networkStatus: Number;
                    data: {
                        getMetadataResource: Maybe<MetadataResource>;
                        columnsMetadataResource: Maybe<MetadataResource>;
                    };
                }) => {
                    if (result.networkStatus != 7) {
                        return;
                    }
                    collection.pagination.totalCount = result.data.columnsMetadataResource?.columns.total;
                    columns.value = result.data.columnsMetadataResource?.columns.collection;
                    // columns.value
                    //     .filter((i) => i.search)
                    //     .forEach((i: any) => {
                    //         filter.value.loading[i.field] = ref(false);
                    //     });

                    // console.log(columns.value);
                }
            );
            onError((error: ApolloError) => {
                alert(4);
                // bus.emit({ msg: error.message, type: 'error' });
            });
        }
    }
});
