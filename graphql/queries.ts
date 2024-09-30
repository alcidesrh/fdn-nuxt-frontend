import gql from 'graphql-tag';

export const users = gql`
    query users($page: Int, $id: Int, $itemsPerPage: Int, $nombre: String, $username: String, $createdAt: [UserFilter_createdAt]) {
        users(_page: $page, id: $id, itemsPerPage: $itemsPerPage, nombre: $nombre, username: $username, createdAt: $createdAt) {
            collection {
                _id
                id
                username
                fullName
                apellido
                telefono
                roles
                createdAt
                status
            }
            paginationInfo {
                itemsPerPage
                lastPage
                totalCount
                hasNextPage
            }
        }
    }
`;
