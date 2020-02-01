<template>
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <form @submit.prevent>
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">再一次確認</h5>
          </div>
          <div v-if="order_status!=='delete'" class="modal-body">
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
            <button
              v-if="order_status==='new'"
              type="button"
              @click="submit_order()"
              class="btn btn-success mx-2"
            >確認加入揪團</button>
            <button
              v-if="order_status==='modify'"
              type="button"
              @click="modify_order()"
              class="btn btn-success mx-2"
            >修改</button>
            <button
              v-if="order_status==='delete'"
              type="button"
              @click="delete_order()"
              class="btn btn-danger mx-2"
            >我不要了</button>
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
    delete_order() {
      let vm = this;
      const base_url = process.env.VUE_APP_API_SERVER_BASE;
      const url = new URL(
        String(vm.$store.state.gid) + "/order/" + String(vm.$store.state.uid),
        base_url
      ).toString();
      console.log(url);
      vm.$http
        .delete(url)
        .then(resp => {
          console.log("Result", resp);
          vm.$store.dispatch("get_records");
          $("#" + vm.id).modal("hide");
        })
        .then(() => {
          this.$store.dispatch("add_message", {
            status: "success",
            message: "已經成功取消了喔"
          });
        })
        .then(() => {
          if (vm.$store.state.liff_context !== null) {
            vm.liff_sent_message("[我不要了]");
          }
        })
        .catch(err => {
          this.$store.dispatch("add_message", {
            status: "danger",
            message: "Ops~ 好像出了點問題"
          });
          console.log(err);
        });
    }, //end of delete_order
    modify_order() {
      let vm = this;
      const base_url = process.env.VUE_APP_API_SERVER_BASE;
      const url = new URL(
        String(vm.$store.state.gid) + "/order/" + String(vm.$store.state.uid),
        base_url
      ).toString();
      console.log(url);
      vm.$http
        .delete(url)
        .then(resp => {
          console.log("Result", resp);
          vm.$store.dispatch("set_order_status", "empty");
          $("#" + vm.id).modal("hide");
        })
        .then(() => {
          const base_url = process.env.VUE_APP_API_SERVER_BASE;
          const url = new URL(
            String(vm.$store.state.gid) +
              "/order/" +
              String(vm.$store.state.uid),
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
                message: "已經成功修改囉"
              });
            })
            .then(() => {
              if (vm.$store.state.liff_context !== null) {
                let goods = "";
                let vm = this;
                vm.record.goods.forEach(value => {
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
                vm.liff_sent_message("[我要]" + goods);
              }
            })
            .catch(err => {
              this.$store.dispatch("add_message", {
                status: "danger",
                message: "Ops~ 好像出了點問題"
              });
              console.log(err);
            });
        });
    }, // end of modify_order
    submit_order() {
      let vm = this;
      const base_url = process.env.VUE_APP_API_SERVER_BASE;
      const url = new URL(
        String(vm.$store.state.gid) + "/order/" + String(vm.$store.state.uid),
        base_url
      ).toString();
      console.log(url);
      vm.$http
        .post(url, vm.record)
        .then(resp => {
          console.log("Result", resp);
          vm.$store.dispatch("get_records");
          $("#" + vm.id).modal("hide");
        })
        .then(() => {
          this.$store.dispatch("add_message", {
            status: "success",
            message: "已經成功 + 1 囉"
          });
        })
        .then(() => {
          if (vm.$store.state.liff_context !== null) {
            let goods = "";
            let vm = this;
            vm.record.goods.forEach(value => {
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
            vm.liff_sent_message("[我要]" + goods);
          }
        })
        .catch(err => {
          this.$store.dispatch("add_message", {
            status: "danger",
            message: "Ops~ 好像出了點問題"
          });
          console.log(err);
        });
    }, // end of send_order
    liff_sent_message(msg) {
      let vm = this;
      vm.$liff
        .sendMessages([
          {
            type: "text",
            text: msg
          }
        ])
        .then(() => {
          vm.$liff.closeWindow();
        })
        .catch(err => {
          console.log("error", err);
        });
    } // end of liff_sent_message
  } //end of methods
};
</script>