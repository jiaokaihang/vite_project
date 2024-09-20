// 封装一个时间函数，用来判断早上|中午|晚上
export const getTime = () => {
  let message = "";

  let hours = new Date().getHours();
  if (hours <= 9) {
    message = "早上";
  } else if (hours <= 12) {
    message = "上午";
  } else if (hours <= 14) {
    message = "中午";
  } else if (hours <= 18) {
    message = "下午";
  } else {
    message = "晚上";
  }
  return message;
};
