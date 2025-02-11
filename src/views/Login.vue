<template>
  <div style="height: 100%">
    <el-row style="height: 100%; background: #1aa094">
      <el-col :lg="16" :md="12" class="col_left">
        <h1>Vue3商城管理系统</h1>
        <span>技术支持</span>
      </el-col>
      <el-col :lg="8" :md="12" class="col_right">
        <h1>登录</h1>
        <el-form
          class="login-form"
          ref="ruleFormRefLogin"
          :model="ruleFormLogin"
          :rules="rulesLogin"
        >
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model="ruleFormLogin.username"
            >
              <template #prefix>
                <el-icon>
                  <UserFilled />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="ruleFormLogin.password">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <el-icon>
                    <Lock />
                  </el-icon>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="loginHandle" :loading="loading"
          >登录</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import { loginFn } from "@/api/login";
import { ElMessage } from "element-plus";
// import { useRouter } from 'vue-router'
// //解构useStore方法
// import { useStore } from 'vuex'
// //获取仓库实例
// const store = useStore()
// const router = useRouter()

//定义loading，初始化为false，正常单击
const loading = ref(false);

const ruleFormRefLogin = ref(null);
const ruleFormLogin = reactive({
  username: "",
  password: "",
});
const rulesLogin = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 15, message: "长度应为5到15位之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 15, message: "长度应为5到15位之间", trigger: "blur" },
  ],
};
// 登录
const loginHandle = () => {
  // 校验表单
  ruleFormRefLogin.value.validate(async (isValid) => {
    try {
      if (!isValid) {
        return;
      }
      //表单验证通过，开始调用接口，将loading状态设置为true，禁止单击
      loading.value = true;
      //调用登录api
      const res = await loginFn(ruleFormLogin);
      console.log(res);
      if (!res.data || res.data.status !== 200) {
        //登录失败提示
        return ElMessage.error(res.msg);
      }

      //登录成功提示
      ElMessage({
        message: "登录成功",
        type: "success",
      });
      //token本地存储
      window.sessionStorage.setItem("token", res.data.token);
      //调用getUserInfoFn()
      // const res2 = await getUserInfoFn()
      // console.log(res2)
      // if (!res2.data || res2.data.status !== 200) {
      //     //获取管理员信息失败
      //     return ElMessage.error('获取管理员信息失败')
      // }
      // //获取管理员信息成功,调用store.commit方法，将用户信息存储到store中
      // store.commit('setUserInfo',res2.data)
      //跳转到后台首页
      router.push("/home");
    } catch (err) {
      console.log(err);
    } finally {
      // 接口调用结束，将loading状态设置为false，恢复单击
      loading.value = false;
    }
  });
};

// //监听回车
// function onKeyUp(e) {
//   console.log(e);
//   if (e.key == "Enter") loginHandle();
// }
// onMounted(() => {
//   //添加键盘监听事件
//   document.addEventListener("keyup", onKeyUp);
// });
// onBeforeMount(() => {
//   //移除键盘监听
//   document.removeEventListener("keyup", onKeyUp);
// });
</script>

<style lang="less" scoped>
.col_left {
  color: #fff;
  display: flex;
  // 垂直居中
  align-items: center;
  //水平居中
  justify-content: center;
  //flex方向修改成垂直方向
  flex-direction: column;
}

.col_right {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .login-form {
    width: 240px;
  }
}

.el-button {
  width: 240px;
  background: #1aa094;
}
</style>
