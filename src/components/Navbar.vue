<template>
  <Loading :active="isLoading"></Loading>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle
        navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link
            class="nav-link"
            :class="{ active: $route.fullPath === '/dashboard/products' }"
            aria-current="page"
            to="/dashboard/products"
            >產品</router-link
          >
          <router-link
            class="nav-link"
            :class="{ active: $route.fullPath === '/dashboard/orders' }"
            to="/dashboard/orders"
            >訂單</router-link
          >
          <router-link
            class="nav-link"
            :class="{ active: $route.fullPath === '/dashboard/coupon' }"
            to="/dashboard/coupon"
            >優惠券</router-link
          >
          <a class="nav-link" href="#" @click.prevent="signOut">登出</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    signOut() {
      const url = `${process.env.VUE_APP_API}logout`;
      this.isLoading = true;
      this.$http
        .post(url)
        .then((res) => {
          this.isLoading = false;
          if (res.data.success) {
            this.$router.push('/login');
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    console.log(this.$route);
  },
};
</script>
