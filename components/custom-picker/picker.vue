<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: horiz0n_Z
 * @Date: 2021-05-13 21:22:40
 * @LastEditors: horiz0n_Z
 * @LastEditTime: 2021-07-11 13:10:55
-->
<template>
  <picker-view class="picker" indicator-class="picker__item--select" mask-class="picker__mask" @change="onChange">
    <picker-view-column v-for="(option,optionIndex) in options" :key="optionIndex">
      <view class="picker__item" v-for="(item,index) in option" :key="index">
        {{item[labelKey]}}
      </view>
    </picker-view-column>
  </picker-view>
</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
        default: [
          [{
            id: 1,
            val: "选项"
          }]
        ]
      }, // 选项

      valueKey: { // 选中文本的索引
        type: String,
        default: "id"
      }, // 显示文本的索引
      labelKey: {
        type: String,
        default: "val"
      },
    },
    methods:{
      onChange(e){
        let value=[];
        e.detail.value.forEach((item,index)=>{
          value.push(this.options[index][item])
        })
        this.$emit("onchange",{value})
      },

      select(e){
        console.log(e)
      }
    }
  }
</script>

<style scoped>
  .picker {
    height: 465rpx;
  }

  /deep/ .picker__item--select {
    height: 100rpx;
  }

  /deep/ .picker__item--select::before,
  /deep/ .picker__item--select::after {
    display: none;
  }

  .picker__item {
    margin: 0 70rpx;
    text-align: center;
    line-height: 100rpx;
    font-size: var(--theme--font-size-m);
    border-bottom: 2rpx #d9dcdd solid;
    box-sizing: border-box;
  }
</style>
