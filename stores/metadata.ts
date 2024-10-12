import { useQuery } from '@vue/apollo-composable';
import { defineStore } from 'pinia';
import gql from 'graphql-tag';

interface State {
    status: [];
}

export const useMetadataStore = defineStore('Metadata', {
    state: (): State => ({
        status: []
    }),
    actions: {
        ini(className: string) {
            return useQuery(
                gql`
                    query getMetadataResource($className: String) {
                        columnsMetadataResource(className: $className) {
                            columns
                        }
                    }
                `,
                { status: true, className: className }
            );
        }
    }
});
