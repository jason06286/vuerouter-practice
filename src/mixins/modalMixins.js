import Modal from 'bootstrap/js/dist/modal';

export default {
  methods: {
    showProductModal() {
      this.productModal.show();
    },
    hideProductModal() {
      this.productModal.hide();
    },
    showDelModal() {
      this.delModal.show();
    },
    hideDelModal() {
      this.delModal.hide();
    },
  },
  mounted() {
    this.productModal = new Modal(this.$refs.productModal);
    this.delModal = new Modal(this.$refs.delModal);
  },
};
