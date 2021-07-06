
// === Eric補充說明 ===
//注意第20及29行， 
// :class代表class的內容會依照component內的參數，動態的決定是否加入，等號右邊放的是{}，不加會造成問題，要注意！！
//
export default {
  data() {
    return {};
  },
  props: {
    pages: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {},
  template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class= "{'disabled': pages.current_page===1}">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li v-for="(pageId, idx) in pages.total_pages"
			    :key = "index"
					class="page-item" 
          :class="{'active':pageId===pages.current_page}"><a class="page-link" href="#">1</a>
			</li>
      <li class="page-item" :class= "{'disabled': pages.current_page===pages.total_pages}">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>
  </nav>`,
};
