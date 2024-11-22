<template>
  <div class="container">
    <header class="header clearfix">
      <nav>
        <ul class="nav nav-pills pull-right">
          <li class="nav-item" role="presentation">
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link" v-if="!isLoggedIn" id="gnbLogin" :href="loginUrl" @click.prevent="login">
              Login
            </a>
            <a class="nav-link" v-else href="#" id="gnbLogin" @click.prevent="logout">
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>

    <div class="jumbotron text-center">
      <div id="naverIdLogin">
        <div v-if="!isLoggedIn">
          <a id="naverIdLogin_loginButton" href="#">
            <img src="./NaverLoginSDK Test with BootStrap_files/big_g.PNG" height="60" />
          </a>
        </div>
        <div v-else>
          <img :src="profileImage" alt="Profile" height="50" />
          <p>{{ nickName }}님 반갑습니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      isLoggedIn: false,
      profileImage: "",
      nickName: "",
      loginUrl: "",
    });

    const initializeNaverLogin = () => {
      var naverLogin = new naver.LoginWithNaverId(
        {
          clientId: "0RpB1f__E1LBL1seZVYQ",
          callbackUrl: "https://" + window.location.hostname + ((location.port == "" || location.port == undefined) ? "" : ":" + location.port) + "/Api/Member/Oauth20",
          isPopup: false,
          loginButton: { color: "green", type: 3, height: 60 }
        }
      );
      naverLogin.init();
      state.loginUrl = naverLogin.generateAuthorizeUrl();

    };

    const login = () => {
      window.location.href = state.loginUrl;
    };

    const logout = () => {
      const naverLogin = new naver.LoginWithNaverId({
        clientId: "jyvqXeaVOVmV",
      });
      naverLogin.logout();
      state.isLoggedIn = false;
      state.profileImage = "";
      state.nickName = "";
    };

    onMounted(() => {
      initializeNaverLogin();
    });

    return {
      ...state,
      login,
      logout,
    };
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css");

.container {
  max-width: 730px;
  padding: 20px 15px;
}

.jumbotron {
  text-align: center;
}
</style>
