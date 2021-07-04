import * as Vue from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";

const RunLogin = {
  data() {
    return {
      baseURL: "https://vue3-course-api.hexschool.io",
      userInfo: { username: "", password: "" },
    };
  },
  methods: {
    login() {
      const loginUrl = `${this.baseURL}/admin/signin`;
      axios
        .post(loginUrl, this.userInfo)
        .then((response) => {
          if (response.data.success) {
            console.log(response);
            
            // cookie
            const { expired, token } = response.data;
            document.cookie = `hexToken = ${token};expires = ${expired}`; //<-- 助教回覆: 寫在一起, safari就能搞定!! https://hackmd.io/@hexschool/B14FofZOu
            // document.cookie = `hexToken = ${token}`;
            // document.cookie = `expires = ${expired}`;

            checkLoginStatus(token);
            redirectPage("items.html");
          } else {
            alert("Failed to login:", response.data.message);
          }
        })
        .catch((reject) => {
          alert("Server Error:", reject);
          console.log("Server Error:", reject);
        });
    },
  },
};

// === Check Cookie has token and expires
function checkLoginStatus(url) {
  axios.post(url).then((res) => {
    console.log("確認使用者是否登入:", res);
    if (res.data.success) render();
  });
}

// === redirect page to items ===
function redirectPage(pageName) {
  window.location = pageName;
}

Vue.createApp(RunLogin).mount("#app");
