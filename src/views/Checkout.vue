<template>
  <Loading :active="isLoading"></Loading>
  <div><h2>訂單</h2></div>
  <div>
    {{ order }}
  </div>
  <button type="button" class="btn btn-danger" @click="pay">付款</button>
</template>

<script>
export default {
  data() {
    return {
      order: [],
      isLoading: false,
    };
  },
  methods: {
    getOrder() {
      const { id } = this.$route.params;
      this.isLoading = true;
      const url = `   ${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          console.log(res);
          if (res.data.success) {
            this.order = res.data.order;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    pay() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.order.id}`;
      this.$http
        .post(url)
        .then((res) => {
          this.isLoading = false;
          console.log(res);
          if (res.data.success) {
            console.log('付款成功');
            this.$router.push('/user/paysuccess');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>
