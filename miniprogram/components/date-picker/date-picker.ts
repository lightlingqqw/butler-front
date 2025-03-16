// components/date-picker/date-picker.ts
Component({
  properties: {
    initialDate: {
      type: String,
      value: new Date().toISOString().split('T')[0], // 默认当前日期
      observer: 'updateDates',
    },
  },

  data: {
    dates: [], // 存储周一到周日的日期信息
    selectedDate:new Date().toISOString().split('T')[0]
  },

  methods: {

    getWeekRange(dateString) {
      const date = new Date(dateString);
      const dayOfWeek = date.getDay(); // 获取当前日期是星期几（0-6，0是星期日）
      
      // 计算星期一的日期
      const monday = new Date(date);
      monday.setDate(date.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
      
      // 计算星期日的日期
      const sunday = new Date(date);
      sunday.setDate(date.getDate() + (dayOfWeek === 0 ? 0 : 7 - dayOfWeek));
      
      return {
        monday: monday.toISOString().split('T')[0], // 返回星期一的日期（格式：YYYY-MM-DD）
        sunday: sunday.toISOString().split('T')[0]  // 返回星期日的日期（格式：YYYY-MM-DD）
      };
    },
    


    // 根据初始日期更新日期列表
    updateDates() {

      const {monday,sunday} = this.getWeekRange(this.properties.initialDate);

      const initialDate = new Date(monday);
      const dates = [];

      // 计算周一到周日的日期
      for (let i = 0; i < 7; i++) {
        const date = new Date(initialDate);
        date.setDate(initialDate.getDate() - initialDate.getDay() + 1 + i); // 从周一开始
        dates.push({
          date: date.toISOString().split('T')[0], // 日期（YYYY-MM-DD）
          weekday: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'][i], // 星期几
          day: date.getDate(), // 日期号
        });
      }

      this.setData({ dates });
    },

    // 点击日期格子时触发
    onDateClick(event) {
      const date = event.currentTarget.dataset.date;
      this.setData({selectedDate:date});
      this.triggerEvent('dateChange', { date }); // 触发自定义事件
    },
  },

  // 组件初始化时更新日期列表
  attached() {
    this.updateDates();
  },
});