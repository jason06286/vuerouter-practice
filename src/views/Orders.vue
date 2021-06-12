<template>
  <Loading :active="isLoading"></Loading>
  <div class="my-5">
    <h2>訂單列表</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">訂單時間</th>
          <th scope="col">訂單編號</th>
          <th scope="col">訂單內容</th>
          <th scope="col">是否付款</th>
          <th scope="col">是否刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>{{ item.id }}</td>
          <td>
            <p v-for="product in item.products" :key="product.id">
              {{ product.product.title }}*{{ product.qty }}
            </p>
          </td>
          <td>
            <div class="form-check form-switch" v-if="item.is_paid">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                checked
              />已付款
            </div>
            <div class="form-check form-switch" v-else>
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
              />未付款
            </div>
          </td>
          <td>
            <button
              class="btn btn-danger"
              type="button"
              @click="delOrder(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <pagination :pagination="pagination" @now-page="getOrders"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from '../components/Pagination.vue';

export default {
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    pagination,
  },
  methods: {
    getOrders(page = 1) {
      const url = `   ${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${page}`;
      this.isLoading = true;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          console.log('getOrders :>> ', res);
          if (res.data.success) {
            this.orders = res.data.orders;
            this.pagination = res.data.pagination;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delOrder(item) {
      const url = `   ${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`;
      this.isLoading = true;
      this.$http
        .delete(url)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.getOrders(this.pagination.current_page);
          }
          console.log('res :>> ', res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
