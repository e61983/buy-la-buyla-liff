<template>
  <div class="my-1">
    <div v-if="is_editor" class="form-row border text-left" style="border-radius: 5px;">
      <!-- editor -->
      <div class="col-12">
        <div class="form-group">
          <label :for="'item_name'+index">*品項</label>
          <ValidationProvider :name="'品名'+(index+1)" rules="required" v-slot="{ errors }">
            <input
              class="form-control"
              type="text"
              :id="'item_name'+good.id"
              :placeholder="'請輸入品名'+(index+1)"
              v-model="good.item_name"
            />
            <span class="text-danger">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </div>
      <div class="col-6 col-md-3">
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
      <div class="col-6 col-md-3">
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
      <div class="col-6 col-md-3">
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
      <div class="col-6 col-md-3">
        <div class="form-group">
          <label :for="'number'+index">數量</label>
          <input class="form-control" type="number" :id="'number'+index" v-model="good.number" />
        </div>
      </div>
      <div class="col-12">
        <div class="form-group mb-0">
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
      <div class="col-md m-2 text-center">
        <button
          type="button"
          class="btn btn-sm btn-outline-success btn-block"
          @click="triggor_editor()"
        >確認</button>
        <button
          type="button"
          class="btn btn-sm btn-outline-danger btn-block"
          @click="destory_good(good)"
        >移除</button>
      </div>
    </div>
    <div v-else class="row align-items-center flex-column">
      <div class="col-12 text-left">
        <div>
          {{good.item_name}} {{good.sweetness_level}} {{good.amount_of_ice}} {{good.size}} *
          {{good.number}}
          <a
            href="#"
            class="badge badge-success mr-0"
            @click="triggor_editor()"
          >修改</a>
          <a href="#" class="badge badge-danger mr-0" @click="destory_good(good)">移除</a>
        </div>
      </div>
    </div>
    <!-- viewer -->
  </div>
</template>

<script>
export default {
  name: "OrderItem",
  props: ["good", "index"],
  data() {
    return {
      is_editor: true
    };
  },
  created() {
    if (this.good.item_name === "") {
      this.is_editor = true;
    } else {
      this.is_editor = false;
    }
  },
  methods: {
    triggor_editor() {
      this.is_editor = !this.is_editor;
    },
    destory_good(good) {
      this.$store.dispatch("remove_good", good.id);
    }
  }
};
</script>