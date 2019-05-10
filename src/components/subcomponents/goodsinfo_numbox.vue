
<template>
    <div class="input-number">
        <div class="button-reduce">
            <button id="button-re" @click="handleDown" :disabled="currentValue <= min" >-</button>
        </div>
        <div class="input-num">
            <input type="text" :value="currentValue" @change="handleChange" @keyup.up='handleUp' @keyup.down='handleDown'>
        </div>
        <div class="button-add">
            <button id="button-ad" @click="handleUp" :disabled="currentValue >= max">+</button>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                currentValue: this.value
            }
        },
        props:{
            max: {type: Number, default: Infinity},
            min: {type: Number, default: 1},
            value: {type: Number, default: 1},
            step: {type: Number, default:1},
        },
        methods:{
            handleDown(){
                if(this.currentValue <= this.min) return;
                this.currentValue -= this.step;
            },
            handleUp(){
                if(this.currentValue >= this.max) return;
                this.currentValue += this.step;
            },
            handleChange(){
                let val = event.target.value.trim();
                let max = this.max;
                let min = this.min;
                if(this.isValueNumber(val)){
                    val = Number(val);
                    this.currentValue = val;
                    if(val > max){
                        this.currentValue = max;
                    } else if(val < min){
                        this.currentValue = min;
                    }
                } else {
                    event.target.value = this.currentValue;
                }
            },
            updateValue(val){
                if(val > this.max) val = this.max;
                if(val < this.min) val = this.min;
                this.currentValue = val;
            },
            isValueNumber(value){
                return (/(^-?[0-9]+\.{1}\d+$) | (^-?[1-9][0-9]*$) | (^-?0{1}$)/).test(value + '');
            }
        },
        mounted(){
            this.updateValue(this.value);
        },
        watch:{
            currentValue(val){
                this.$emit('input', val);
                this.$emit('on-change', val);
            },
            value(val){
                this.updateValue(val);
            }
        }
    }
</script>
<style scoped lang="scss">
    .input-number {

        margin-left: 20px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 38%;
        height: 40px;

        input{
            height: 33px;
            margin: 0;
        }
    }

</style>