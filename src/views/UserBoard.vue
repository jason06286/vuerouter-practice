<template>
  <Loading :active="isLoading"></Loading>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link class="nav-item" to="/user/cart">
            <a class="nav-link" href="#">產品列表</a>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <ToastMessages></ToastMessages>
    <router-view></router-view>
  </div>
</template>

<script>
import emitter from '../methods/emitter';
import pushMessageState from '../methods/pushMessageState';
import ToastMessages from '../components/ToastMessages.vue';

export default {
  provide() {
    return {
      emitter,
      pushMessageState,
    };
  },
  components: {
    ToastMessages,
  },
};
</script>
