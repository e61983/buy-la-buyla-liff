<template>
  <div>
    <loading loader="bars" :active="true" :can-cancel="false" :is-full-page="false" />
  </div>
</template>

<script>
export default {
  name: "Login",
  created() {
    if (!this.$liff.isLoggedIn()) {
      this.$liff.login();
    } else {
      this.$store.dispatch("set_is_loggedin", true);
    }
  },
  mounted(){
    if (this.$store.state.is_loggedin) {
      this.$store.dispatch("set_is_loading", true);
      this.$store.dispatch("get_liff_context");
      this.$store.dispatch("get_user_profile");
      this.$store.dispatch("set_is_loading", false);
      this.$router.push({ path: "/menu" });
    }else{
      this.$router.push({ path: "/" });
    }
  }

};
</script>
