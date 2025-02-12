<template>
  <div>
    {{ data.num.toFixed(0) }}
  </div>
</template>
<script setup>
import { reactive, watch } from "vue";
import gsap from "gsap";
// 定义初始数据
const data = reactive({
  num: 0,
});
// 接收父组件数据
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
});
// 定义方法使用gsap实现数据滚动效果
function AnimateFn() {
  gsap.to(data, {
    duration: 0.5, // 0.5秒之后将初始数据动画替换成父组件数据
    num: props.value,
  });
}

AnimateFn();
// 父组件数据发生变化时，则重新调用方法
watch(
  () => props.value,
  () => AnimateFn()
);
</script>
