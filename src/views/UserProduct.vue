<template>
  <Loading :active="isLoading"></Loading>
  <div>單一產品</div>
  {{ product }}
</template>

<script>
export default {
  data() {
    return {
      product: [],
      isLoading: false,
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;
      this.isLoading = true;
      const url = `   ${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.isLoading = false;
          console.log(res);
          if (res.data.success) {
            this.product = res.data.product;
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
