import gql from "graphql-tag";

export const userList = gql`
  query userList($page: Int, $itemsPerPage: Int) {
    users(_page: $page, itemsPerPage: $itemsPerPage) {
      collection {
        id
        idNumber
        username
        nombre
        apellido
        telefono
        roles
        createdAt
      }
      paginationInfo {
        itemsPerPage
        lastPage
        totalCount
      }
    }
  }
`;
