<template>
  <div class="row d-flex flex-row text-center border mt-2" style="border-radius:5%">
    <div class="col-md-3 col-12 d-flex flex-row align-items-center">
      <img
        :src="record.user_profile.photo_url"
        width="48px"
        height="48px"
        class="mr-3"
        style="border-radius:100%"
      />
      <div class="h5 mt-2">{{record.user_profile.display_name}}</div>
    </div>
    <div class="col-md-9 col-12">
      <div class="row align-items-center flex-column">
        <div class="col text-left">
          <ul class="mb-0" v-for="(good, sub_index) in record.goods" :key="sub_index">
            <li>
              <div>
                {{good.item_name}} {{good.sweetness_level}} {{good.amount_of_ice}} {{good.size}} *
                {{good.number}}
              </div>
              <div
                class="border px-2"
                style="border-radius:5%"
                v-if="good.comment !==''"
              >{{good.comment}}</div>
            </li>
          </ul>
        </div>
        <div class="col my-2 text-center">
          <button
            type="button"
            class="btn btn-outline-primary btn-sm-block"
            @click="same_as(record.goods)"
          >跟{{record.user_profile.display_name}}一樣</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Record",
  props: ["record"],
  computed: {
    show_records() {
      return this.record;
    }
  },
  methods: {
    same_as(goods) {
      this.$store.dispatch("goods_same_as", goods);
    }
  }
};
</script>