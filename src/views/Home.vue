<template>
  <div class="container m-5">
    <h2>主頁</h2>
    <router-link to="/user/cart" class="btn btn-success mx-3"
      >前台介面</router-link
    >
    <router-link to="/login" class="btn btn-danger">後台介面</router-link>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  components: {},
  created() {
    console.log(process.env.VUE_APP_API);
    console.log(process.env.VUE_APP_PATH);
  },
};
</script>
