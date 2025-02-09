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
import { ref, reactive } from "vue";
const ruleFormRefLogin = ref(null);
const ruleFormLogin = reactive({
  username: "",
  password: "",
});
const rulesLogin = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 6, max: 15, message: "长度应为6到15位之间", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 15, message: "长度应为6到15位之间", trigger: "blur" },
  ],
};
const loginHandle = () => {
  ruleFormRefLogin.value.validate((isValid) => {
    if (!isValid) {
      return;
    }
    // ...下一步
  });
};
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
