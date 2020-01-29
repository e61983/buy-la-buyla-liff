<template>
  <div>
    <loading loader="bars" :active="true" :can-cancel="false" :is-full-page="false" />
  </div>
</template>

<script>
export default {
  name: "Login",
  created() {
    console.log(this.$options.name, "created")
    if (!this.$liff.isLoggedIn()) {
      this.$liff.login();
    } else {
      this.$store.dispatch("set_is_loggedin", true);
    }
  },
  mounted(){
    console.log(this.$options.name, "mounted")
    if (this.$store.state.is_loggedin) {
      this.$router.push({ path: "/menu" });
    }else{
      this.$router.push({ path: "/" });
    }
  }

};
</script>
