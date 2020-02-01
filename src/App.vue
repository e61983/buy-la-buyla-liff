<template>
  <div id="app" class="container mt-3">
    <Alert id="msg" msg="Ops~" state="alert-danger" />
    <router-view></router-view>
    <loading loader="dots" :active.sync="api_loading" :can-cancel="false" :is-full-page="false" />
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
    console.log(this.$options.name, "created");
    console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`process.env.VUE_APP_LIFF_ID: ${process.env.VUE_APP_LIFF_ID}`);
    this.init_liff();
  },
  BeforeMount() {
    console.log(this.$options.name, "BeforeMount");
  },
  beforeDestroy() {
    console.log(this.$options.name, "BeforeMount");
    this.$liff.logout();
  },
  computed: {
    api_loading() {
      return this.$store.state.is_loading;
    }
  },
  methods: {
    init_liff() {
      let vm = this;
      vm.$store.dispatch("set_is_loading", true);
      vm.$liff
        .init(
          {
            liffId: process.env.VUE_APP_LIFF_ID
          },
          () => {
            if (
              vm.$liff.isInClient() === true ||
              vm.$liff.isLoggedIn() === true
            ) {
              vm.$store.dispatch("get_liff_context");
              vm.$store.dispatch("get_user_profile");
              vm.$store.dispatch("set_is_loggedin", true);
            } else {
              console.log("login...");
              vm.$liff.login();
            }
          }
        )
        .then(() => {
          vm.$store.dispatch("get_records");
        })
        .then(() => {
          console.log("app: " + vm.$store.state.is_loggedin);
          vm.$store.dispatch("set_is_loading", false);
          if (vm.$store.state.is_loggedin) {
            vm.$router.push({ name: "Menu" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
