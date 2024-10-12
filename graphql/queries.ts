import gql from 'graphql-tag';
export const DataUser = gql`
    fragment DataUser on User {
        _id
        id
        username
        telefono
        roles
        createdAt
        status
    }
`;
export const buses = gql`
    query buses($page: Int, $id: Int, $itemsPerPage: Int, $marca: String, $placa: String, $createdAt: [BusFilter_createdAt], $order: [BusFilter_order]) {
        buses(_page: $page, id: $id, itemsPerPage: $itemsPerPage, marca: $marca, placa: $placa, createdAt: $createdAt, order: $order) {
            collection {
                _id
                id
                codigo
                marca
                placa
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
export const users = gql`
    query users($page: Int, $id: Int, $itemsPerPage: Int, $fullName: String, $username: String, $createdAt: [UserFilter_createdAt], $order: [UserFilter_order]) {
        users(_page: $page, id: $id, itemsPerPage: $itemsPerPage, fullName: $fullName, username: $username, createdAt: $createdAt, order: $order) {
            collection {
                ...DataUser
                fullName
            }
            paginationInfo {
                itemsPerPage
                lastPage
                totalCount
                hasNextPage
            }
        }
    }
    ${DataUser}
`;
export const user = gql`
    query user($id: ID!) {
        user(id: $id) {
            ...DataUser
        }
    }
    ${DataUser}
`;
