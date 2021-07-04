import * as Vue from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";

const itemApp = {
  data() {
    return {
      baseURL: "https://vue3-course-api.hexschool.io",
      apiPath: "hello-eric",
      title: "商品清單",
      itemList: [],
    };
  },
  methods: {
    addNewItem() {
      console.log("add new item!");
    },
    editItem() {
      console.log("edit item!");
    },
    delItem(delId) {
      console.log("delete item!", delId);
      this.itemList = this.itemList.filter(({ id }) => id !== delId);

      
      axios
        .delete(
					// /api/:api_path/admin/product/:product_id
          `${this.baseURL}/api/${this.apiPath}/admin/product/${delId}`
        )
        .then((res) => {
          if (res.data.success) alert(`successful delete item: ${delId}`);
          else alert(`failed to delete item: ${delId}`);
        })
        .catch((rej) => {
          alert(`Error:${rej}`);
        });
    },
  },
  created() {
    // set token for axios
    const token = document.cookie.split(";")[0].split("=")[1];
    axios.defaults.headers.common["Authorization"] = token;

    // get all items
    axios
      .get(`${this.baseURL}/api/${this.apiPath}/admin/products?page=1`)
      .then((res) => {
        if (res.data.success) {
          console.log("all items:", res);
          this.itemList = [...res.data.products];

          // console.log("===>itemList:", this);
        } else {
          alert("Failed to get item list");
        }
      });
  },
};

Vue.createApp(itemApp).mount("#item-app");
