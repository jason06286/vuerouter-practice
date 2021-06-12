<template>
  <Navbar></Navbar>
  <div class="container">
    <ToastMessages></ToastMessages>
    <router-view></router-view>
  </div>
</template>

<script>
import emitter from '../methods/emitter';
import pushMessageState from '../methods/pushMessageState';
import ToastMessages from '../components/ToastMessages.vue';
import Navbar from '../components/Navbar.vue';

export default {
  components: {
    Navbar,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
      pushMessageState,
    };
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    const url = `   ${process.env.VUE_APP_API}api/user/check`;
    this.$http.defaults.headers.common.Authorization = `${token}`;
    this.$http
      .post(url)
      .then((res) => {
        console.log(res);
        if (!res.data.success) {
          this.$router.push('/login');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
