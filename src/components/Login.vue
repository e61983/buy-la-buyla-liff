<template>
  <div>
    <loading loader="bars" :active="true" :can-cancel="false" :is-full-page="false" />
  </div>
</template>

<script>
export default {
  name: "Login",
  watch: {},
  mounted() {
    if (!this.$liff.isLoggedIn()) {
      this.$liff.login();
    } else {
      this.$router.push("/menu");
    }
  }
};
</script>
