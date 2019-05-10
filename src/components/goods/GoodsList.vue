<template>
    <div class="goods-list">

        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">

            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        name: "GoodsList",
        data() {
           return {
               pageIndex: 1,
               goodslist: []
           }
        },
        created() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                this.$http.get('http://www.liulongbin.top:3005/api/getgoods?pageindex=' + this.pageIndex).then(result => {
                    if (result.body.status === 0) {
                        this.goodslist = this.goodslist.concat(result.body.message);
                    }
                })
            },
            getMore() {
                this.pageIndex ++;
                this.getGoodsList();
            },
            goDetail(id) {
                this.$router.push('/home/goodsinfo/' + id)
            }
        }
    }
</script>

<style scoped lang="scss">
.goods-list {
    display: flex;
    flex-wrap: wrap;

    padding: 9px;
    justify-content: space-between;

    .goods-item {
        width: 49%;

        margin-bottom: 4px;
        margin-top: 4px;
        border: 1px solid #cccccc;
        box-shadow: 0 0 8px #cccccc;
        padding: 2px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        min-height: 293px;

        img {
            width: 100%;
        }

        .title {
            font-size: 14px;
        }

        .info {

            background-color: #eeeeee;
            p {
                margin: 0;
                padding: 5px;
            }

            .price {
                .now {
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }

                .old {
                    text-decoration: line-through;
                    font-size: 10px;
                    margin-left: 10px;
                }
            }

            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
</style>