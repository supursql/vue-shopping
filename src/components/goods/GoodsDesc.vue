<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>

        <hr>

        <p class="content" v-html="info.content"></p>
    </div>
</template>

<script>
    export default {
        name: "GoodsDesc",
        data() {
            return {
                id: this.$route.params.id,
                info: []
            }
        },
        created() {
            this.getGoodsDesc();
        },
        methods: {
            getGoodsDesc() {
                this.$http.get('http://www.liulongbin.top:3005/api/goods/getdesc/' + this.id).then(result => {

                    if (result.body.status === 0) {
                        this.info = result.body.message[0]
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
.goodsdesc-container {
    h3 {
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }

    img {
        width: 100%;
    }
}
</style>