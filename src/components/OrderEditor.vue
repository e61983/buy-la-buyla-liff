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
          <form action>
            <div
              class="form-row mx-sm-2 mx-1 mt-2"
              v-for="(good,index) in record.goods"
              :key="index"
            >
              <div class="col-md-12">
                <div class="form-group">
                  <label :for="'item_name'+index">品項</label>
                  <input
                    class="form-control"
                    type="text"
                    :id="'item_name'+index"
                    placeholder="請輸入品名"
                    v-model="good.item_name"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label :for="'sweeting_level'+index">甜度</label>
                  <select
                    class="form-control"
                    type="text"
                    :id="'sweeting_level'+index"
                    v-model="good.sweetness_level"
                  >
                    <option value="正常" selected>正常</option>
                    <option value="少糖">少糖</option>
                    <option value="半糖">半糖</option>
                    <option value="微糖">微糖</option>
                    <option value="無糖">無糖</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label :for="'amount_of_icd'+index">冰量</label>
                  <select
                    class="form-control"
                    type="text"
                    :id="'amount_of_icd'+index"
                    v-model="good.amount_of_ice"
                  >
                    <option value="正常" selected>正常</option>
                    <option value="少冰">少冰</option>
                    <option value="去冰">去冰</option>
                    <option value="微冰">微冰</option>
                    <option value="去冰">去冰</option>
                    <option value="完全去冰">完全去冰</option>
                    <option value="熱的">熱的</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label :for="'size'+index">大小</label>
                  <select class="form-control" type="text" :id="'size'+index" v-model="good.size">
                    <option value="L" selected>L</option>
                    <option value="M">M</option>
                    <option value="S">S</option>
                    <option value="XL">XL</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label :for="'number'+index">數量</label>
                  <select
                    class="form-control"
                    type="number"
                    :id="'number'+index"
                    v-model="good.number"
                  >
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label :for="'comment'+index">備註</label>
                  <input
                    class="form-control"
                    type="text"
                    :id="'comment'+index"
                    placeholder="(Optional) 想附註的事"
                    v-model="good.comment"
                  />
                </div>
              </div>
              <div class="col-md text-center">
                <button
                  type="button"
                  class="btn-sm btn-outline-danger btn-block"
                  @click="destory_good(good)"
                >移除</button>
              </div>
            </div>

            <!--end goods-->

            <div class="row">
              <div class="col text-center m-3">
                <button
                  type="button"
                  class="btn btn-outline-success btn-block"
                  @click="create_new_good"
                >新增一個新的品項</button>
              </div>
            </div>
            <div class="d-flex justify-content-center my-2">
              <button type="reset" class="btn btn-outline-danger mx-2" @click="clean_goods">清除</button>
              <button
                type="button"
                class="btn btn-success mx-2"
                data-toggle="modal"
                data-target="#sumitModal"
              >送出</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <SumitCheck id="sumitModal" :record="record" />
  </div>
</template>

<script>
import SumitCheck from "@/components/SumitCheck.vue";
export default {
  name: "OrderEditor",
  components: { SumitCheck },
  props: ["record"],
  methods: {
    create_new_good() {
      var new_id = Math.floor(Date.now());
      this.record.goods.push({
        id: new_id,
        item_name: "",
        sweetness_level: "正常",
        amount_of_ice: "正常",
        size: "L",
        number: "1",
        comment: ""
      });
    },
    destory_good: function(good) {
      var index = this.record.goods.findIndex(function(_good) {
        return good.id == _good.id;
      });
      this.record.goods.splice(index, 1);
    },

    clean_goods() {
      let goods = this.record.goods;
      goods.splice(0, goods.length);
    }
  }
};
</script>