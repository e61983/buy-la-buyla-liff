<template>
  <div class="container">
    <div class="row mb-2 align-items-center">
      <div class="col-md-3 col-12 text-center">
        <img
          :src="record.user_profile.photo_url"
          width="128px"
          height="128px"
          class="mx-1"
          style="border-radius:100%"
        />
        <div class="h5">{{record.user_profile.display_name}}</div>
      </div>
      <div class="col-md-9 col-12">
        <div class="border" style="border-radius: 5px;">
          <ValidationObserver v-slot="{ handleSubmit, reset  }">
            <form @submit.prevent="handleSubmit(submit)" @reset.prevent="reset">
              <OrderItem :good="good" v-for="(good,index) in record.goods" :key="good.id" :index=index />
              <div class="row">
                <div class="col text-center m-3">
                  <button
                    type="button"
                    class="btn btn-outline-success btn-block"
                    :class="{'bounce animated': animated}"
                    @click="create_new_good()"
                  >新增一個新的品項</button>
                </div>
              </div>
              <div class="d-flex justify-content-center my-2">
                <button type="reset" class="btn btn-outline-danger mx-2" @click="clean_goods()">清除</button>
                <button type="submit" class="btn btn-success mx-2">送出</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
    <OrderComfirm id="comfirmModal" :record="record" />
  </div>
</template>

<script>
import OrderItem from "@/components/OrderItem.vue";
import OrderComfirm from "@/components/OrderComfirm.vue";

import $ from "jquery";

export default {
  name: "OrderEditor",
  components: { OrderItem, OrderComfirm },
  props: ["record"],
  data() {
    return {
      animated: false
    };
  },
  methods: {
    create_new_good() {
      this.$store.dispatch("add_good", {
        item_name: "",
        sweetness_level: "正常",
        amount_of_ice: "正常",
        size: "L",
        number: "1",
        comment: ""
      });
    },
    clean_goods() {
      this.$store.dispatch("remove_all_goods");
    },
    submit() {
      let vm = this;
      if (vm.record.goods.length > 0) {
        console.log("show check madol");
        $("#comfirmModal").modal("show");
      } else {
        vm.animated = true;
        setTimeout(function() {
          vm.animated = false;
        }, 1000);
      }
    }
  }
};
</script>

<style scoped>
</style>