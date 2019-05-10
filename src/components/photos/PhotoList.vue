<template>
    <div class="page-navbar">
        <!-- navbar -->
        <mt-navbar id="mt-navbar" class="page-part" v-model="selected">
            <mt-tab-item :id="item.id" v-for="item in cates" :key="item.id" class="singnl">
                {{ item.title }}
            </mt-tab-item>

        </mt-navbar>

        <!-- tabcontainer -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item :id="item.id" v-for="item in cates" :key="item.id">
<!--                {{ item.id }}-->
                <ul class="photo-list">
                    <router-link v-for="item1 in list" :key="item1.id" :to="'/home/photoinfo/' + item1.id" tag="li">
                        <img v-lazy="item1.img_url">
                        <div class="info">
                            <h1 class="info-title">{{ item1.title }}</h1>
                            <div class="info-body">{{ item1.zhaiyao }}</div>
                        </div>
                    </router-link>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>

<script>

    export default {
        name: "PhotoList",
        data() {
            return {
                active: 'tab-container1',
                cates: [],
                list: [],
                selected: '1',
                oldX: 0,
                oldY: 0
            }
        },
        created() {
            this.getAllCategory();
            this.getPhotoListByCateId(0);
        },
        mounted() {
            var navbarEle = document.querySelector('#mt-navbar');
            let lastPos = 0;
            var lastPosStr;

            navbarEle.addEventListener('touchstart', function(e) {

                var lastPosStr = navbarEle.style.left;
                if(lastPosStr){
                    lastPos = parseInt(lastPosStr.slice(0,lastPosStr.indexOf('p')));
                }
                this.oldX = e.touches[0].clientX;
                this.oldY = e.touches[0].clientY;

            });

            navbarEle.addEventListener('touchmove', function (e) {
                var x = e.touches[0].clientX-this.oldX;
                // var y = e.touches[0].clientY-this.oldY;
                let curPos = (x + lastPos);
                let rightLimit = - navbarEle.offsetWidth + document.body.clientWidth;
                if(curPos < rightLimit){
                    curPos = rightLimit;
                }
                else if(curPos > 0){
                    curPos = 0;
                }
                navbarEle.style.left = `${curPos}px`;

            });
        },
        methods: {
            getAllCategory() {
                this.$http.get('http://www.liulongbin.top:3005/api/getimgcategory').then(result => {
                    if (result.body.status === 0) {
                        result.body.message.unshift({title: "全部", id: 0});
                        this.cates = result.body.message;
                    } else {

                    }
                })
            },
            getPhotoListByCateId(cateId) {
                this.$http.get('http://www.liulongbin.top:3005/api/getimages/' + cateId).then(result => {

                    if (result.body.status === 0) {
                        this.list = result.body.message;
                    } else {

                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .item {
        display: inline-block;
    }

    .nav {
        padding: 10px;
    }

    .link {
        color: inherit;
        padding: 20px;
        display: block;
    }

    .mint-navbar .mint-tab-item.is-selected {
        font-weight: bold;
        margin-bottom: -3px;
        border-radius: 15px;
        border: #007aff 1px;
        color: midnightblue;
        font-style: italic;
    }
    .page-navbar{
        position: relative;
    }
    #mt-navbar{
        position: relative;
    }
    .page-part {
        width: 700px;
    }

    .photo-list {
        list-style: none;
        margin: 0;
        padding: 10px;
        padding-bottom: 0;
        li {
            position: relative;
            margin-bottom: 10px;
            background-color: #999999;
            text-align: center;
            box-shadow: 0 0 9px #cccccc;
            img {
                width: 100%;
                vertical-align: middle;
            }
            img[lazy=loading] {
                width: 40px;
                height: 300px;
                margin: auto;
            }

            .info {

                position: absolute;
                bottom: 0;
                color: white;
                text-align: left;

                background-color: rgba(0, 0, 0, 0.4);
                max-height: 84px;

                .info-title {
                    font-size: 14px;
                }

                .info-body {
                    font-size: 13px;
                }
            }
        }
    }
</style>