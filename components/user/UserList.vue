<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
// import { Pencil, Delete } from '@icon-park/vue-next';

import { useQuery } from '@vue/apollo-composable'
import { Maybe, User, UserPaginationInfo } from '~/graphql/graphql';

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { useFetchList } from "~~/composables/api";
import { FragmentType, gql, useFragment } from '~/graphql'
import { userList } from '~~/graphql/queries'
import { ApolloError } from '@apollo/client/errors';
const bus = useEventBus('msg')
const { getColummns, columnsAlias, rowPerPage } = useTable()

type UserCollection = UserPaginationInfo & { page: number, items?: Maybe<Array<Maybe<User>>>, offset: number }

const collection: UserCollection = reactive({
  page: 1,
  itemsPerPage: rowPerPage,
  lastPage: 0,
  totalCount: 0,
  items: [],
  offset: computed(() => (collection.page - 1) * collection.itemsPerPage)
});
const { y } = useWindowScroll()

const { onResult, loading, onError, fetchMore } = useQuery(
  userList,
  { page: collection.page, itemsPerPage: collection.itemsPerPage },
)

onResult(
  (result: {
    data: {
      users: {
        collection: Maybe<Array<Maybe<User>>>;
        paginationInfo: UserPaginationInfo;
      }

    }
  }) => {
    collection.items = result.data?.users?.collection
    collection.itemsPerPage = result.data?.users?.paginationInfo.itemsPerPage
    collection.lastPage = result.data?.users?.paginationInfo.lastPage
    collection.totalCount = result.data?.users?.paginationInfo.totalCount
    y.value = 0
  }
);
onError(
  (error: ApolloError) => {
    bus.emit({ detail: error.message })
  }
);


function onChangePage(e) {
  if (collection.itemsPerPage != e.rows) {
    collection.page = 1
    collection.itemsPerPage = e.rows
  }
  else {
    collection.page = e.page + 1;
  }
  fetchMore({
    variables: {
      page: collection.page, itemsPerPage: collection.itemsPerPage
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult
      return {
        ...previousResult,
        ...fetchMoreResult
      }
    },
  })
}
const show = () => {
  bus.emit({ severity: 'warn', detail: 'msg' })
}
onMounted(() => { });

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();

const submitted = ref(false);
const statuses = ref([
  { label: 'INSTOCK', value: 'instock' },
  { label: 'LOWSTOCK', value: 'lowstock' },
  { label: 'OUTOFSTOCK', value: 'outofstock' }
]);

const formatCurrency = (value) => {
  if (value)
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return;
};
const openNew = () => {
  product.value = {};
  submitted.value = false;
  productDialog.value = true;
};
const hideDialog = () => {
  productDialog.value = false;
  submitted.value = false;
};
const saveProduct = () => {
  submitted.value = true;

  if (product?.value.name?.trim()) {
    if (product.value.id) {
      product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
      products.value[findIndexById(product.value.id)] = product.value;
      toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    }
    else {
      product.value.id = createId();
      product.value.code = createId();
      product.value.image = 'product-placeholder.svg';
      product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
      products.value.push(product.value);
      toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    }

    productDialog.value = false;
    product.value = {};
  }
};
const editProduct = (prod) => {
  product.value = { ...prod };
  productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
  product.value = prod;
  deleteProductDialog.value = true;
};
const deleteProduct = () => {
  products.value = products.value.filter(val => val.id !== product.value.id);
  deleteProductDialog.value = false;
  product.value = {};
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};
const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i].id === id) {
      index = i;
      break;
    }
  }

  return index;
};
const createId = () => {
  let id = '';
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}
const exportCSV = () => {
  dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
  products.value = products.value.filter(val => !selectedProducts.value.includes(val));
  deleteProductsDialog.value = false;
  selectedProducts.value = null;
  toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'INSTOCK':
      return 'success';

    case 'LOWSTOCK':
      return 'warn';

    case 'OUTOFSTOCK':
      return 'danger';

    default:
      return null;
  }
};
function onCellEditComplete(data) {
  console.log(data)
}
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  nombre: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});
</script>
<template>
  <div>

    <Card v-if="!loading && collection.items">
      <template #content>



        <DataTable v-model:filters="filters" :value="collection.items" paginator :rows="10" dataKey="id"
          filterDisplay="row" :loading="loading"
          :globalFilterFields="['nombre', 'country.name', 'representative.name', 'status']">
          <template #header>
            <div class="flex justify-end">
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
              </IconField>
            </div>
          </template>
          <template #empty> No customers found. </template>
          <template #loading> Loading customers data. Please wait. </template>
          <Column field="nombre" header="Nombre" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.nombre }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()"
                placeholder="Search by name" />
            </template>
          </Column>

        </DataTable>

      </template>
    </Card>
    <skeleton-list v-else :columns="7" />

  </div>
</template>
