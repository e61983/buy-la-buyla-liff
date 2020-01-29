<template>
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <form @submit.prevent="submit()">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">再一次確認</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            要加入揪團了嗎? 還有沒有想點還沒點到的呢~?
            <div class="card">
              <div class="card-body">
                <div class="row align-items-center flex-column">
                  <div class="col text-left">
                    <ul class="mb-0" v-for="(good, sub_index) in record.goods" :key="sub_index">
                      <li>
                        {{good.item_name}} {{good.sweetness_level}} {{good.amount_of_ice}} {{good.size}} *
                        {{good.number}}
                        ({{good.comment}})
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger" data-dismiss="modal">再想一下</button>
            <button type="submit" class="btn btn-success">確認加入揪團</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "OrderComfirm",
  props: {
    id: {
      required: true,
      type: String
    },
    record: {
      required: true,
      type: Object
    }
  },
  methods: {
    submit() {
      let vm = this;
      const base_url = process.env.VUE_APP_API_SERVER_BASE;
      const url = new URL(
        String(vm.$store.state.gid) + "/order/" + String(vm.$store.state.uid),
        base_url
      ).toString();
      vm.$http
        .post(url, vm.record)
        .then(resp => {
          console.log("Result", resp);
          $("#" + vm.id).modal("hide");
        })
        .then(() => {
          vm.$store.dispatch("get_records");
          this.$store.dispatch("add_message", {
            status: "success",
            message: "已經成功 + 1 囉"
          });
        })
        .catch(() => {
          this.$store.dispatch("add_message", {
            status: "danger",
            message: "Ops~ 好像出了點問題"
          });
        });
      if (vm.$store.state.liff_context !== null) {
        this.liff_sent_message();
      }
    },
    liff_sent_message() {
      let goods = "";
      let vm = this;
      vm.record.goods.forEach(function(value) {
        goods +=
          "\n •" +
          value.item_name +
          " " +
          value.sweetness_level +
          " " +
          value.amount_of_ice +
          " " +
          value.size +
          "*" +
          value.number +
          "(" +
          value.comment +
          ")";
      });
      vm.$liff
        .sendMessages([
          {
            type: "text",
            text: "[我要]" + goods
          }
        ])
        .then(() => {
          vm.$liff.closeWindow();
        })
        .catch(err => {
          console.log("error", err);
        });
    }
  }
};
</script>