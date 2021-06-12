<template>
  <Loading :active="isLoading"></Loading>
  <div class="my-5">
    <h2>產品列表</h2>
    <div class="text-end">
      <button
        class="btn btn-primary"
        type="button"
        @click="openProductModal({}, true)"
      >
        新增商品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-end">{{ $filters.currency(item.origin_price) }}</td>
          <td class="text-end">{{ $filters.currency(item.price) }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openProductModal(item, false)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <pagination :pagination="pagination" @now-page="getProducts"></pagination>
    </div>
    <productModal
      ref="productModal"
      :product="tempProduct"
      :newProduct="newProduct"
      @product-status="productStatus"
    ></productModal>
    <delModal
      ref="delModal"
      :product="tempProduct"
      @product-del="productDel"
    ></delModal>
  </div>
</template>

<script>
import productModal from '../components/ProductModal.vue';
import delModal from '../components/DelModal.vue';
import pagination from '../components/Pagination.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imagesUrl: [],
      },
      newProduct: false,
      isLoading: false,
    };
  },
  inject: ['pushMessageState'],
  components: {
    productModal,
    delModal,
    pagination,
  },
  methods: {
    getProducts(page = 1) {
      console.log('page :>> ', page);
      const url = `   ${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          console.log(res);
          if (res.data.success) {
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openProductModal(item, newProduct) {
      this.tempProduct = JSON.parse(JSON.stringify(item));
      this.newProduct = newProduct;
      this.$refs.productModal.showProductModal();
    },
    productStatus(item) {
      this.tempProduct = item;
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let method = 'post';
      if (!this.newProduct) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        method = 'put';
      }
      this.$http[method](url, { data: this.tempProduct })
        .then((res) => {
          if (res.data.success) {
            this.getProducts();
          }
          this.pushMessageState(res, this.newProduct ? '新增' : '更新');
          this.$refs.productModal.hideProductModal();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openDelModal(item) {
      this.tempProduct = JSON.parse(JSON.stringify(item));
      this.$refs.delModal.showDelModal();
    },
    productDel(id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          if (res.data.success) {
            this.getProducts();
          }
          this.pushMessageState(res, '刪除');
          this.$refs.delModal.hideDelModal();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
