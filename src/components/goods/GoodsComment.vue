<template>
    <div>
        <cmt-box :id="this.id"></cmt-box>
    </div>
</template>

<script>

    import comment from '../subcomponents/comment.vue'

    export default {
        name: "GoodsComment",
        data() {
            return {
                id: this.$route.params.id
            }
        },
        created() {
        },
        methods: {

        },
        components: {
            'cmt-box': comment
        }
    }
</script>

<style scoped>

</style>