import config from "./config";
const baseUrl = config.apiBaseUrl;

function onSuccess(res, resolve, reject) {
  if (res.statusCode === 200) {
    resolve(res.data);
  } else {
    uni.showToast({
      title: res.data.message,
      duration: 2000,
      icon: "none",
    });
    reject(res.data.message);
    if (res.statusCode === 401) {
      console.log("Remove token, user from storage.");
      uni.removeStorageSync("token");
      uni.removeStorageSync("user");
    }
  }
}

function onError(err, reject) {
  uni.showToast({
    title: "网络出错",
    duration: 2000,
    icon: "none",
  });
  reject(err);
}

//get 请求
function getRequest(url, data) {
  return new Promise((resolve, reject) => {
    const getData = data;

    uni.request({
      url: baseUrl + url,
      data: getData, //传的参数
      method: "GET", //请求方式
      dataType: "json", //请求类型是   json  固定的
      header: {
        "content-type": "application/json",
        Authorization: uni.getStorageSync("token"),
      },
      success: function (res) {
        onSuccess(res, resolve, reject);
      },
      error: function (e) {
        onError(e, reject);
      },
    });
  });
}
//post请求
function postRequest(url, data) {
  return new Promise((resolve, reject) => {
    const postData = data;
    uni.request({
      url: baseUrl + url,
      data: postData,
      method: "POST",
      header: {
        "content-type": "application/json",
        Authorization: uni.getStorageSync("token"),
      },
      success: function (res) {
        onSuccess(res, resolve, reject);
      },
      error: function (e) {
        onError(e, reject);
      },
    });
  });
}
//put请求
function putRequest(url, data) {
  return new Promise((resolve, reject) => {
    const postData = data;
    uni.request({
      url: baseUrl + url,
      data: postData,
      method: "PUT",
      header: {
        "content-type": "application/json",
        Authorization: uni.getStorageSync("token"),
      },
      success: function (res) {
        onSuccess(res, resolve, reject);
      },
      error: function (e) {
        onError(err, reject);
      },
    });
  });
}
//上传图片
function uploadPhoto(url, data) {
  const uploadData = data;
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: baseUrl + url,
      filePath: uploadData,
      name: "img",
      success: function (res) {
        onSuccess(res, resolve, reject);
      },
      error: function (e) {
        onError(e, reject);
      },
    });
  });
}

module.exports = {
  postRequest,
  getRequest,
  putRequest,
  uploadPhoto,
};
