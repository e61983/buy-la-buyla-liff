<template>
  <div class="row text-center">
    <div class="col card">
      <div class="card-body">
        <div class="row">
          <!-- current record -->
          <div class="col-12" v-if="current_record !== null">
            <OrderEditor :record="current_record" />
          </div>
          <loading
            v-else
            loader="bars"
            :active.sync="is_profile_loading"
            :can-cancel="false"
            :is-full-page="false"
          />

          <!-- records -->
          <div class="col-12" v-if="records !==null">
            <div v-for="(record, index) in records" :key="index">
              <Record :record="record" />
            </div>
          </div>
          <loading
            v-else
            loader="dots"
            :active.sync="is_records_loading"
            :can-cancel="false"
            :is-full-page="false"
          />
        </div>
      </div>
      <!-- context information -->
      <div class="card-footer bg-transparent text-left">
        <font-awesome-icon
          :icon="['fab', 'line']"
          class="fab fa-line"
          :class="{ 'text-success': liff_context !== null, 'text-secondary': liff_context === null }"
          data-toggle="collapse"
          data-target="#context"
          role="button"
        />
        <div class="collapse multi-collapse" id="context">
          <div class="card card-body">
            <span>context: {{ liff_context }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderEditor from "@/components/OrderEditor.vue";
import Record from "@/components/Record.vue";
export default {
  name: "MainMenu",
  components: { OrderEditor, Record },
  props: {
    title: String
  },
  mounted() {
    let vm = this;
    vm.liff_context = vm.$liff.getContext();
    console.log("liff_context:" + vm.liff_context);
    let gid = "";
    if (process.env.NODE_ENV === "development") {
      if (gid === "") {
        gid = "test";
      }
    }
    console.log("gid:" + gid);

    const base_url = process.env.VUE_APP_API_SERVER_BASE;
    const url = base_url + "/" + gid + "/orders";
    vm.$http.get(url).then(resp => {
      vm.records = resp.data;
    });
    vm.$liff
      .getProfile()
      .then(profile => {
        vm.current_record = {
          user_profile: {
            display_name: profile.displayName,
            photo_url: profile.pictureUrl
          },
          goods: []
        };
      })
      .catch(err => {
        console.log("error", err);
      });
  },
  data() {
    return {
      is_profile_loading: false, // for test
      is_records_loading: true,
      liff_context: null,
      current_record: null,
      records: null
    };
  },
  watch: {
    current_record() {
      if (this.current_record !== null) {
        this.is_profile_loading = false;
      }
    },
    records() {
      if (this.records !== null) {
        this.is_records_loading = false;
      }
    }
  }
};
</script>

<style scoped>
.card-footer {
  border: none;
}
</style>
