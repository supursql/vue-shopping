<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <div class="mui-card" v-for="(item, i) in shopcarlist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"
                       v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h3>{{ item.title }}</h3>
              <p class="total">
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner settlement">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，
              总价<span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import numbox from '../subcomponents/shopcar_numbox.vue'
  export default {
    data() {
      return {
        shopcarlist: []
      }
    },
    created() {
      this.getShopCarList();
    },
    methods: {
      getShopCarList() {

        let idArr = [];
        this.$store.state.car.forEach(item => {
          idArr.push(item.id)
        });

        if (idArr.length <= 0) return;

        this.$http.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/' + idArr.join(",")).then(result => {
          if (result.body.status === 0) {
            this.shopcarlist = result.body.message;
          }
        })
      },
      remove(id, index) {
        this.shopcarlist.splice(index, 1);
        this.$store.commit("removeFromCar", id)
      },
      selectedChanged(id, val) {
        this.$store.commit("updateGoodsSelected", {id: id, selected: val})
      }
    },
    components: {
      numbox
    }
  }
</script>

<style lang="scss" scoped>
  .shopcar-container {
    background-color: #eeeeee;
    overflow: hidden;

    .goods-list {

      .mui-card-content-inner {
        display: flex;
        align-items: center;
      }

      img {
        width: 60px;
        height: 60px;
      }

      h3 {
        font-size: 13px;
      }

      .info {

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .total {
          display: flex;
          align-items: center;

          .price {
            color: red;
            font-weight: bold;
            width: 60px;
            text-align: center;
          }

          a {
            margin-left: 11px;
          }
        }
      }
    }

    .settlement {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        .red {
          color: red;
          font-weight: bold;
        }
      }
    }
  }
</style>
