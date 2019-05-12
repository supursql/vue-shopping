<template>
    <div class="goodsinfo-container">

        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="this.ballFlag" ref="ball"></div>
        </transition>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="this.lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">{{ info.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ info.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ info.sell_price }}</span>
                    </p>
                    <p class="buy">
                        购买数量: <numbox @input="getSelectedCount" :max="info.stock_quantity"></numbox>
                    </p>
                    <div>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品编号：{{ info.goods_no }}</p>
                    <p>库存情况：{{ info.stock_quantity }}件</p>
                    <p>上架时间：{{ info.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" plain size="large" @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" plain size="large" @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>

    import swiper from '../subcomponents/swiper.vue'
    import numbox from '../subcomponents/goodsinfo_numbox.vue'

    export default {
        name: "GoodsInfo",
        data() {
            return {
                id: this.$route.params.id,
                lunbotu: [],
                info: [],
                ballFlag: false,
                selectedCount: 1
            }
        },
        created() {
            this.getLunbotu();
            this.getinfo();
        },
        methods: {
            getLunbotu() {
                this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        result.body.message.forEach(item => {
                            item.img = item.src;
                        });
                        this.lunbotu = result.body.message;
                    } else {

                    }
                })
            },
            getinfo() {
                this.$http.get('http://www.liulongbin.top:3005/api/goods/getinfo/' + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.info = result.body.message[0];
                    } else {

                    }
                })
            },
            goDesc(id) {
                this.$router.push('/home/goodsdesc/' + id)
            },
            goComment(id) {
                this.$router.push('/home/goodscomment/' + id)
            },
            addToShopCar() {
                this.ballFlag = !this.ballFlag;
                let goodsinfo = {
                    id: this.id,
                    count: this.selectedCount,
                    price: this.info.sell_price,
                    selected: true
                };

                this.$store.commit('addToCar', goodsinfo);
            },
            beforeEnter(el) {
                el.style.transform = "translate(0, 0)";
            },
            enter(el, done) {
                el.offsetWidth;

                const ballPosition = this.$refs.ball.getBoundingClientRect();
                const badgePosition = document.getElementById('badge').getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.style.transform = `translate(${xDist}px, ${yDist}px)`;
                el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag;
            },
            getSelectedCount(count) {
                this.selectedCount = count;
            }

        },
        components: {
            'swiper': swiper,
            'numbox': numbox
        }
    }
</script>

<style scoped lang="scss">
    .goodsinfo-container {
        background-color: #eeeeee;
        overflow: hidden;

        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }

        .buy {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        
        .mui-card-footer {
            display: block;

            button {
                margin: 10px;
            }
        }

        .ball {
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            z-index: 99;
            top: 352px;
            left: 150px;
        }
    }
</style>