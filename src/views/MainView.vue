<template>
  <div class="h-full">
    <div class="lettalk pa-10">
      <router-link :to="{ name: 'recorder' }" class="font-weight-light text-color4">
        당신의<br> <b class="text-color3">트</b>립 <b class="text-color3">매</b>니저와 <br> 대화해보세요.</router-link>
    </div>
    <div class="text-center  mt-10 pa-10">
      <div id="naverIdLogin">
        <div v-if="!isLoggedIn">
          <a id="naverIdLogin_loginButton" href="#">
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
          loginButton: { color: "white", type: 3, height: 52 }
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
.lettalk {
  font-size: 3rem;
}
</style>
