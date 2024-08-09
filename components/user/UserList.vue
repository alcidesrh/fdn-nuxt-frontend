<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { Pencil, Delete } from '@icon-park/vue-next';

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
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  representative: { value: null, matchMode: FilterMatchMode.IN },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
  verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});
</script>
<template>
  <div>
    <Button label="Submit" />

    <Card v-if="!loading && collection.items">
      <template #content>
        <DataTable filterDisplay="row" :globalFilterFields="['username', 'nombre', 'apellido', 'telefono', 'createdAt']"
          :rows="collection.itemsPerPage" :totalRecords="collection.totalCount" size="small" stateStorage="local"
          stateKey="dt-state-demo-session" v-model:selection="selectedProducts" :value="collection.items" dataKey="id"
          :filters="filters">
          <template #empty> No customers found. </template>
          <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
          <Column v-for="c, i in getColummns(Object.keys(collection.items[0]))" :key="i" :field="c"
            :header="columnsAlias(c)" sortable class="capitalize" :class="{ 'w-3rem!': c == 'idNumber' }"
            pt:datatable.column.title.font.weight>
            <template #body="{ data }">
              <div class="normal-case">
                <span v-if="['createdAt'].includes(c)">
                  {{ $dateFormat(data.createdAt) }}
                </span>
                <div class="flex justify-around gap-1" v-else-if="c == 'roles'">
                  <Chip v-for="r, i in data[c]" :key="i" :label="r"
                    pt:root:class="bg-slate-200 u-mr-3xs u--text-1 u-p-3xs u-px-xs lowercase" />
                </div>
                <span v-else>
                  {{ data[c] }}
                </span>
              </div>
            </template>
            <template #filter="{ filterModel }">
              <InputText v-model="filterModel.value" type="text" placeholder="Search by name" />
            </template>
          </Column>
          <Column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
              <Button text rounded class="mr-2" @click="editProduct(slotProps.data)">
                <pencil theme="outline" size="20" fill="#333" :strokeWidth="2" />
              </Button>
              <Button text rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)">
                <delete theme="outline" size="20" fill="#333" :strokeWidth="2" />
              </Button>
            </template>
          </Column>
        </DataTable>
        <Paginator class="u-mt-m" :first="collection.offset" :rows="collection.itemsPerPage"
          :totalRecords="collection.totalCount" :rowsPerPageOptions="[10, 20, 30, 50, 100]" @page="onChangePage"
          :template="{
            '640px': 'PrevPageLink CurrentPageReport NextPageLink',
            '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
            '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
            default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown '
          }">
        </Paginator>
      </template>
    </Card>
    <skeleton-list v-else :columns="7" />

  </div>
</template>
