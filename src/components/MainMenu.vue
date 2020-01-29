<template>
  <div class="row text-center">
    <div class="col card">
      <div class="card-body p-0">
        <div class="row">
          <!-- current record -->
          <div class="col-12" v-if="current_record !== null">
            <OrderEditor :record="current_record" />
          </div>

          <!-- records -->
          <div class="col-12" v-if="records !==null">
            <div v-for="(record, index) in records" :key="index">
              <Record :record="record" />
            </div>
          </div>
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
            <span>liff context: {{ liff_context }}</span>
            <span>order group: {{ order_group }}</span>
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
  data() {
    return {
      is_open_editor: false
    };
  },
  created() {
    console.log(this.$options.name, "created");
  },
  beforeMount() {
    console.log(this.$options.name, "beforeMount");
  },
  mounted() {
    console.log(this.$options.name, "mounted");
    this.$store.dispatch("set_is_loading", true);
    this.$store.dispatch("get_user_profile");
    this.$store.dispatch("get_records");
    this.$store.dispatch("set_is_loading", false);
  },
  computed: {
    records() {
      let vm = this;
      let rs = vm.$store.state.records;
      if (rs === null) return null;
      let list = [];
      Object.keys(rs).forEach(uid => {
        if (uid !== vm.$store.state.uid) {
          list.push(rs[uid]);
        }
      });
      return list;
    },
    liff_context() {
      return this.$store.state.liff_context;
    },
    order_group() {
      return this.$store.state.gid;
    },
    current_record() {
      let vm = this;
      return {
        user_profile: vm.$store.state.user_profile,
        goods: vm.$store.state.current_goods
      };
    }
  }
};
</script>

<style scoped>
.card-footer {
  border: none;
}
</style>
