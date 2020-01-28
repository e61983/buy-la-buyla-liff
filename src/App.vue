<template>
  <div id="app" class="container mt-3">
    <router-view v-if="initialized"></router-view>
    <loading
      v-else
      loader="dots"
      :active.sync="api_loading"
      :can-cancel="false"
      :is-full-page="false"
    />
  </div>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    api_loading: false,
    initialized: false
  }),
  created: function() {
    console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`process.env.VUE_APP_LIFF_ID: ${process.env.VUE_APP_LIFF_ID}`);
  },
  mounted: function() {
    this.init_liff();
  },
  methods: {
    init_liff() {
      this.api_loading = true;
      this.$liff.init(
        {
          liffId: process.env.VUE_APP_LIFF_ID
        },
        data => {
          this.initialized = true;
          this.api_loading = false;
        },
        err => {
          console.log("LIFF initialization failed", err);
          this.api_loading = false;
        }
      );
    }
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
