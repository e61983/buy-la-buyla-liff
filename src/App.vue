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
  data() {
    return {
      initialized: false
    };
  },
  created: function() {
    console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`process.env.VUE_APP_LIFF_ID: ${process.env.VUE_APP_LIFF_ID}`);
  },
  mounted: function() {
    this.init_liff();
  },
  computed: {
    api_loading() {
      return this.$store.state.is_loading;
    }
  },
  methods: {
    init_liff() {
      let vm = this;
      vm.$liff.init(
        {
          liffId: process.env.VUE_APP_LIFF_ID
        },
        () => {
          vm.initialized = true;
        },
        err => {
          console.log("LIFF initialization failed", err);
        }
      );
    }
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
