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
              <OrderItem
                :good="good"
                v-for="(good,index) in record.goods"
                :key="good.id"
                :index="index"
              />
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
                <button
                  type="reset"
                  class="btn btn-outline-secondary mx-2"
                  @click="reset_goods()"
                >重置</button>
                <button v-if="order_status==='new'" type="submit" class="btn btn-success mx-2">送出</button>
                <button v-if="order_status==='modify'" type="submit" class="btn btn-success mx-2">修改</button>
                <button
                  v-if="order_status==='delete'"
                  type="submit"
                  class="btn btn-danger mx-2"
                >我不要了</button>
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
  computed: {
    order_status() {
      let status = this.$store.state.order_status;
      let goods_number = this.record.goods.length;
      if (status === "exist") {
        if (goods_number > 0) {
          return "modify";
        } else {
          return "delete";
        }
      } else {
        return "new";
      }
    }
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
    reset_goods() {
      this.$store.dispatch("get_records");
    },
    submit() {
      let vm = this;
      let status = vm.$store.state.order_status;
      if (status === "new") {
        if (vm.record.goods.length <= 0) {
          vm.animated = true;
          setTimeout(function() {
            vm.animated = false;
          }, 1000);
        }
      } else {
        console.log("show check madol");
        $("#comfirmModal").modal("show");
      }
    }
  }
};
</script>

<style scoped>
</style>