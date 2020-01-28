<template>
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
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
                <div class="col">
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
          <button type="button" class="btn btn-success" @click="send_order">確認加入揪團</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "SumitCheck",
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
    send_order() {
      let vm = this;
      console.log("Send order");
      $("#" + vm.id).modal("hide");
    }
  }
};
</script>