<template>
  <div class="container my-5">
    <h1>Login</h1>
    <form @click.prevent="signIn">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="user.username"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="user.password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      const url = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(url, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token};expires=${new Date(expired)}`;
            this.$router.push('/dashboard/products');
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
