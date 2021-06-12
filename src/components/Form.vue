<template>
  <Form v-slot="{ errors }" @submit="onSubmit">
    <div class="form-group mb-3">
      <label for="name" class="mb-2">Name *</label>
      <Field
        id="name"
        name="name"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['name'] }"
        placeholder="請輸入 name"
        :rules="isRequired"
        v-model="user.name"
      ></Field>
      <ErrorMessage name="name" class="invalid-feedback"></ErrorMessage>
    </div>
    <div class="form-group mb-3">
      <label for="email" class="mb-2">Email *</label>
      <Field
        id="email"
        name="email"
        type="email"
        class="form-control"
        :class="{ 'is-invalid': errors['email'] }"
        placeholder="請輸入 Email"
        :rules="isRequired"
        v-model="user.email"
      ></Field>
      <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
    </div>
    <div class="form-group mb-3">
      <label for="tel" class="mb-2">Phone *</label>
      <Field
        id="tel"
        name="tel"
        type="tel"
        class="form-control"
        :class="{ 'is-invalid': errors['tel'] }"
        placeholder="請輸入 tel"
        :rules="isPhone"
        v-model="user.tel"
      ></Field>
      <ErrorMessage name="tel" class="invalid-feedback"></ErrorMessage>
    </div>
    <div class="form-group mb-3">
      <label for="address" class="mb-2">Address *</label>
      <Field
        id="address"
        name="address"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors['address'] }"
        placeholder="請輸入 address"
        :rules="isRequired"
        v-model="user.address"
      ></Field>
      <ErrorMessage name="address" class="invalid-feedback"></ErrorMessage>
    </div>
    <div class="form-group mb-3">
      <label for="message" class="mb-2">Message</label>
      <textarea
        class="form-control"
        id="message"
        rows="3"
        v-model="message"
      ></textarea>
    </div>
    <button class="btn btn-primary" type="submit">
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
        v-if="isLoading === 'submit'"
      ></span>
      Submit
    </button>
  </Form>
</template>

<script>
import { Field, Form, ErrorMessage } from 'vee-validate';

export default {
  data() {
    return {
      user: {},
      message: '',
      isLoading: '',
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  methods: {
    isRequired(value) {
      if (value && value.trim()) {
        return true;
      }

      return 'This is required';
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    },
    onSubmit() {
      this.isLoading = 'submit';
      const url = `   ${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      this.$http
        .post(url, {
          data: {
            user: this.user,
            message: this.message,
          },
        })
        .then((res) => {
          this.isLoading = '';
          console.log(res);
          if (res.data.success) {
            this.$router.push(`/user/checkout/${res.data.orderId}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
