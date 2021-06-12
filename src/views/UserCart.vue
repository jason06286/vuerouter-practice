<template>
  <section class="m-5">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-12 mb-3"
          v-for="item in products"
          :key="item.id"
        >
          <div class="card" style="width: 18rem">
            <img
              :src="item.imageUrl"
              class="card-img-top"
              alt="..."
              style="object-fit: contain"
              v-if="item.imageUrl"
            />
            <img :src="item.imagesUrl[0]" class="card-img-top" alt="" v-else />
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <small class="mb-2"
                ><del>原價{{ item.origin_price }}</del></small
              >
              <p class="mb-2">現在只要{{ item.price }}</p>
              <div class="d-flex justify-content-between">
                <button
                  class="btn btn-secondary"
                  type="button"
                  @click.prevent="getProduct(item.id)"
                >
                  查看更多
                </button>
                <button
                  class="btn btn-primary"
                  type="button"
                  :disabled="item.id === status.loadingItem"
                  @click.prevent="addCart(item.id)"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                    v-if="item.id === status.loadingItem"
                  ></span>
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="d-flex justify-content-center">
    <pagination :pagination="pagination" @now-page="getProducts"></pagination>
  </div>
  <section class="mb-5">
    <div class="container">
      <div class="d-flex justify-content-end">
        <button
          class="btn btn-danger"
          type="button"
          @click.prevent="allDelCart"
        >
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
            v-if="status.loadingItem === '123'"
          ></span>
          清空購物車
        </button>
      </div>
      <table class="table table-dark table-striped table-hover mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>產品名稱</th>
            <th width="100">圖片</th>
            <th width="120">數量/單位</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartData.carts" :key="item.id">
            <td class="align-items-center">
              <button
                class="btn btn-danger"
                type="button"
                @click.prevent="delCart(item.id)"
              >
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                  v-if="status.loadingItem === item.id"
                ></span>
                刪除
              </button>
            </td>
            <td>{{ item.product.title }}</td>
            <td>
              <img
                :src="item.product.imageUrl"
                alt=""
                style="width: 100px; height: 100px"
                v-if="item.product.imageUrl"
              />
              <img
                :src="item.product.imagesUrl[0]"
                alt=""
                style="width: 100px; height: 100px"
                v-else
              />
            </td>
            <td>
              <div class="d-flex">
                <input
                  type="number"
                  min="1"
                  @change="editCart(item)"
                  v-model.number="item.qty"
                  :disabled="item.product.title === status.loadingItem"
                />
                <button
                  type="button"
                  class="btn btn-outline-secondary btn-sm text-white disabled"
                >
                  {{ item.product.unit }}
                </button>
              </div>
            </td>
            <td class="text-end">
              {{ $filters.currency(item.final_total) }}元
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="table-danger">
            <td colspan="4" class="text-end">總計</td>
            <td>{{ $filters.currency(cartData.final_total) }}元</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </section>
  <FormValidate v-if="cartData.final_total != 0"></FormValidate>
</template>

<script>
import pagination from '../components/Pagination.vue';
import FormValidate from '../components/Form.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      cartData: [],
      isLoading: false,
      status: {
        loadingItem: '',
      },
    };
  },
  inject: ['pushMessageState'],
  components: {
    pagination,
    FormValidate,
  },
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `   ${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}`;
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
    getProduct(id) {
      this.$router.push(`/user/product/${id}`);
    },
    getCartData() {
      this.isLoading = true;
      const url = `   ${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          console.log(res);
          if (res.data.success) {
            this.cartData = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addCart(id) {
      this.status.loadingItem = id;
      const item = {
        product_id: id,
        qty: 1,
      };
      const url = `   ${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .post(url, { data: item })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.getCartData();
            this.status.loadingItem = '';
          }
          this.pushMessageState(res, '購物車新增');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    allDelCart() {
      this.status.loadingItem = '123';
      const url = `   ${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`;
      this.$http
        .delete(url)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.status.loadingItem = '';
            this.getCartData();
          }
          this.pushMessageState(res, '購物車全部刪除');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delCart(id) {
      this.status.loadingItem = id;
      const url = `   ${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http
        .delete(url)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.getCartData();
            this.status.loadingItem = '';
          }
          this.pushMessageState(res, '購物車刪除');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editCart(item) {
      this.status.loadingItem = item.product.title;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`;
      this.$http
        .put(url, { data: cart })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            this.status.loadingItem = '';
            this.getCartData();
          }
          this.pushMessageState(res, '購物車更新');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProducts();
    this.getCartData();
  },
};
</script>
