<template>
  <div class="container">
    <div class="row d-flex flex-row align-items-center">
      <div class="col-md-3 col-12">
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
        <div class style="border-radius: 5px;">
          <div class="card">
            <div class="card-body">
              <div class="row align-items-center flex-column">
                <div class="col">
                  <ul class="mb-0" v-for="(good, sub_index) in record.goods" :key="sub_index">
                    <li>
                      {{good.item_name}} {{good.sweetness_level}} {{good.amount_of_ice}} {{good.size}} *
                      {{good.number}} ({{good.comment}})
                    </li>
                  </ul>
                </div>
                <div class="col mt-2 text-center">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm-block"
                    @click="same_as(record.goods)"
                  >跟{{record.user_profile.display_name}}一樣</button>
                </div>
              </div>
            </div>
          </div>
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
  }
};
</script>