// components/loading/loading.ts
Component({
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    text: {
      type: String,
      value: '加载中...',
    },
  },

  methods: {
    // 阻止遮罩层下的点击事件
    preventTouch() {
      return;
    },

    // 阻止遮罩层下的滚动事件
    preventTouchMove() {
      return;
    },
  },
});