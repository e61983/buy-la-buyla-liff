<template>
  <div id="app" class="container mt-3">
    <Alert id="msg" msg="Ops~" state="alert-danger" />
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
import Alert from "@/components/Alert.vue";
export default {
  name: "app",
  components: { Alert },
  data() {
    return {
      initialized: false
    };
  },
  created() {
    console.log(this.$options.name, "created")
    console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`process.env.VUE_APP_LIFF_ID: ${process.env.VUE_APP_LIFF_ID}`);
    this.init_liff();
  },
  BeforeMount() {
    console.log(this.$options.name, "BeforeMount")
  },
  beforeDestroy(){
    console.log(this.$options.name, "BeforeMount")
    this.$liff.logout()
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
          vm.$store.dispatch('get_liff_context')
          vm.$store.dispatch('set_is_loading',false)
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
