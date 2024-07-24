<template>
  <div>
    <!-- <Card> -->

    <!-- <template #content> -->
    <Toolbar class="mb-6">
      <template #start>
        <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
        <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
          :disabled="!selectedProducts || !selectedProducts.length" />

        <nuxt-link :to="{ name: 'taxons-create' }"
          class="px-6 py-2 bg-green-600 text-white text-xs rounded shadow-md hover:bg-green-700">
          Create
        </nuxt-link>
      </template>

      <template #end>
        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import"
          class="mr-2" auto />
        <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
      </template>
    </Toolbar>
    <!-- </template>
  </Card> -->
    <Card>
      <template #content>
        <DataTable ref="dt" v-model:selection="selectedProducts" :value="products" dataKey="id" :paginator="true"
          :rows="10" :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[5, 10, 25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">
          <template #header>
            <div class="flex flex-wrap gap-2 items-center justify-between">
              <h4 class="m-0">Manage Products</h4>
              <IconField>
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Search..." />
              </IconField>
            </div>
          </template>

          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column field="code" header="Code" sortable style="min-width: 12rem"></Column>
          <Column field="name" header="Name" sortable style="min-width: 16rem"></Column>
          <Column header="Image">
            <template #body="slotProps">
              <img :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                :alt="slotProps.data.image" class="rounded" style="width: 64px" />
            </template>
          </Column>
          <Column field="price" header="Price" sortable style="min-width: 8rem">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column field="category" header="Category" sortable style="min-width: 10rem"></Column>
          <Column field="rating" header="Reviews" sortable style="min-width: 12rem">
            <template #body="slotProps">
              <Rating :modelValue="slotProps.data.rating" :readonly="true" />
            </template>
          </Column>
          <Column field="inventoryStatus" header="Status" sortable style="min-width: 12rem">
            <template #body="slotProps">
              <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
            </template>
          </Column>
          <Column :exportable="false" style="min-width: 12rem">
            <template #body="slotProps">
              <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
              <Button icon="pi pi-trash" outlined rounded severity="danger"
                @click="confirmDeleteProduct(slotProps.data)" />
            </template>
          </Column>
        </DataTable>

        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Product Details" :modal="true">
          <div class="flex flex-col gap-6">
            <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
              :alt="product.image" class="block m-auto pb-4" />
            <div>
              <label for="name" class="block font-bold mb-3">Name</label>
              <InputText id="name" v-model.trim="product.name" required="true" autofocus
                :invalid="submitted && !product.name" fluid />
              <small v-if="submitted && !product.name" class="text-red-500">Name is required.</small>
            </div>
            <div>
              <label for="description" class="block font-bold mb-3">Description</label>
              <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" fluid />
            </div>
            <div>
              <label for="inventoryStatus" class="block font-bold mb-3">Inventory Status</label>
              <Select id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label"
                placeholder="Select a Status" fluid></Select>
            </div>

            <div>
              <span class="block font-bold mb-4">Category</span>
              <div class="grid grid-cols-12 gap-4">
                <div class="flex items-center gap-2 col-span-6">
                  <RadioButton id="category1" v-model="product.category" name="category" value="Accessories" />
                  <label for="category1">Accessories</label>
                </div>
                <div class="flex items-center gap-2 col-span-6">
                  <RadioButton id="category2" v-model="product.category" name="category" value="Clothing" />
                  <label for="category2">Clothing</label>
                </div>
                <div class="flex items-center gap-2 col-span-6">
                  <RadioButton id="category3" v-model="product.category" name="category" value="Electronics" />
                  <label for="category3">Electronics</label>
                </div>
                <div class="flex items-center gap-2 col-span-6">
                  <RadioButton id="category4" v-model="product.category" name="category" value="Fitness" />
                  <label for="category4">Fitness</label>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-6">
                <label for="price" class="block font-bold mb-3">Price</label>
                <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" fluid />
              </div>
              <div class="col-span-6">
                <label for="quantity" class="block font-bold mb-3">Quantity</label>
                <InputNumber id="quantity" v-model="product.quantity" integeronly fluid />
              </div>
            </div>
          </div>

          <template #footer>
            <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
            <Button label="Save" icon="pi pi-check" @click="saveProduct" />
          </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
          <div class="flex items-center gap-4">
            <i class="pi pi-exclamation-triangle !text-3xl" />
            <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
            <Button label="Yes" icon="pi pi-check" @click="deleteProduct" />
          </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
          <div class="flex items-center gap-4">
            <i class="pi pi-exclamation-triangle !text-3xl" />
            <span v-if="product">Are you sure you want to delete the selected products?</span>
          </div>
          <template #footer>
            <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
            <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedProducts" />
          </template>
        </Dialog>
      </template>


    </Card>
  </div>
</template>
<script>
function getProductsData() {
  const data = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1001',
      code: 'nvklal433',
      name: 'Black Watch',
      description: 'Product Description',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      quantity: 61,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'Blue Band',
      description: 'Product Description',
      image: 'blue-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: '1003',
      code: '244wgerg2',
      name: 'Blue T-Shirt',
      description: 'Product Description',
      image: 'blue-t-shirt.jpg',
      price: 29,
      category: 'Clothing',
      quantity: 25,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1004',
      code: 'h456wer53',
      name: 'Bracelet',
      description: 'Product Description',
      image: 'bracelet.jpg',
      price: 15,
      category: 'Accessories',
      quantity: 73,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1005',
      code: 'av2231fwg',
      name: 'Brown Purse',
      description: 'Product Description',
      image: 'brown-purse.jpg',
      price: 120,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: '1006',
      code: 'bib36pfvm',
      name: 'Chakra Bracelet',
      description: 'Product Description',
      image: 'chakra-bracelet.jpg',
      price: 32,
      category: 'Accessories',
      quantity: 5,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: '1007',
      code: 'mbvjkgip5',
      name: 'Galaxy Earrings',
      description: 'Product Description',
      image: 'galaxy-earrings.jpg',
      price: 34,
      category: 'Accessories',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1008',
      code: 'vbb124btr',
      name: 'Game Controller',
      description: 'Product Description',
      image: 'game-controller.jpg',
      price: 99,
      category: 'Electronics',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 4
    },
    {
      id: '1009',
      code: 'cm230f032',
      name: 'Gaming Set',
      description: 'Product Description',
      image: 'gaming-set.jpg',
      price: 299,
      category: 'Electronics',
      quantity: 63,
      inventoryStatus: 'INSTOCK',
      rating: 3
    },
    {
      id: '1010',
      code: 'plb34234v',
      name: 'Gold Phone Case',
      description: 'Product Description',
      image: 'gold-phone-case.jpg',
      price: 24,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: '1011',
      code: '4920nnc2d',
      name: 'Green Earbuds',
      description: 'Product Description',
      image: 'green-earbuds.jpg',
      price: 89,
      category: 'Electronics',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1012',
      code: '250vm23cc',
      name: 'Green T-Shirt',
      description: 'Product Description',
      image: 'green-t-shirt.jpg',
      price: 49,
      category: 'Clothing',
      quantity: 74,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1013',
      code: 'fldsmn31b',
      name: 'Grey T-Shirt',
      description: 'Product Description',
      image: 'grey-t-shirt.jpg',
      price: 48,
      category: 'Clothing',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 3
    },
    {
      id: '1014',
      code: 'waas1x2as',
      name: 'Headphones',
      description: 'Product Description',
      image: 'headphones.jpg',
      price: 175,
      category: 'Electronics',
      quantity: 8,
      inventoryStatus: 'LOWSTOCK',
      rating: 5
    },
    {
      id: '1015',
      code: 'vb34btbg5',
      name: 'Light Green T-Shirt',
      description: 'Product Description',
      image: 'light-green-t-shirt.jpg',
      price: 49,
      category: 'Clothing',
      quantity: 34,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1016',
      code: 'k8l6j58jl',
      name: 'Lime Band',
      description: 'Product Description',
      image: 'lime-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 12,
      inventoryStatus: 'INSTOCK',
      rating: 3
    },
    {
      id: '1017',
      code: 'v435nn85n',
      name: 'Mini Speakers',
      description: 'Product Description',
      image: 'mini-speakers.jpg',
      price: 85,
      category: 'Clothing',
      quantity: 42,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1018',
      code: '09zx9c0zc',
      name: 'Painted Phone Case',
      description: 'Product Description',
      image: 'painted-phone-case.jpg',
      price: 56,
      category: 'Accessories',
      quantity: 41,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1019',
      code: 'mnb5mb2m5',
      name: 'Pink Band',
      description: 'Product Description',
      image: 'pink-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 63,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1020',
      code: 'r23fwf2w3',
      name: 'Pink Purse',
      description: 'Product Description',
      image: 'pink-purse.jpg',
      price: 110,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: '1021',
      code: 'pxpzczo23',
      name: 'Purple Band',
      description: 'Product Description',
      image: 'purple-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 6,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: '1022',
      code: '2c42cb5cb',
      name: 'Purple Gemstone Necklace',
      description: 'Product Description',
      image: 'purple-gemstone-necklace.jpg',
      price: 45,
      category: 'Accessories',
      quantity: 62,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1023',
      code: '5k43kkk23',
      name: 'Purple T-Shirt',
      description: 'Product Description',
      image: 'purple-t-shirt.jpg',
      price: 49,
      category: 'Clothing',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 5
    },
    {
      id: '1024',
      code: 'lm2tny2k4',
      name: 'Shoes',
      description: 'Product Description',
      image: 'shoes.jpg',
      price: 64,
      category: 'Clothing',
      quantity: 0,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1025',
      code: 'nbm5mv45n',
      name: 'Sneakers',
      description: 'Product Description',
      image: 'sneakers.jpg',
      price: 78,
      category: 'Clothing',
      quantity: 52,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1026',
      code: 'zx23zc42c',
      name: 'Teal T-Shirt',
      description: 'Product Description',
      image: 'teal-t-shirt.jpg',
      price: 49,
      category: 'Clothing',
      quantity: 3,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: '1027',
      code: 'acvx872gc',
      name: 'Yellow Earbuds',
      description: 'Product Description',
      image: 'yellow-earbuds.jpg',
      price: 89,
      category: 'Electronics',
      quantity: 35,
      inventoryStatus: 'INSTOCK',
      rating: 3
    },
    {
      id: '1028',
      code: 'tx125ck42',
      name: 'Yoga Mat',
      description: 'Product Description',
      image: 'yoga-mat.jpg',
      price: 20,
      category: 'Fitness',
      quantity: 15,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1029',
      code: 'gwuby345v',
      name: 'Yoga Set',
      description: 'Product Description',
      image: 'yoga-set.jpg',
      price: 20,
      category: 'Fitness',
      quantity: 25,
      inventoryStatus: 'INSTOCK',
      rating: 8
    }
  ];

  return Promise.resolve(data);
}
</script>
<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';

onMounted(() => {
  getProductsData().then((data) => (products.value = data));
});

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
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

</script>
