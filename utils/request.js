const commoneUrl = "https://mini-mars.codeispoetry.tech/api"; //第一步设置域名
//get 请求

function getRequest(url, data) {
  var promise = new Promise((resolve, reject) => {
    var getData = data;

    uni.request({
      url: commoneUrl + url,
      data: getData, //传的参数
      method: "GET", //请求方式
      dataType: "json", //请求类型是   json  固定的
      header: {
        "content-type": "application/json",
        Authorization: uni.getStorageSync("token"),
      },
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res.data);
          if (res.data.code == 200) {
          } else {
            uni.showToast({
              title: res.data.message,
              duration: 2000,
              icon: "none",
            });
          }
        } else {
          uni.showToast({
            title: res.data.message,
            duration: 2000,
            icon: "none",
          });
          reject("网络出错");
        }
      },
      error: function (e) {
        uni.showToast({
          title: "网络出错",
          duration: 2000,
          icon: "none",
        });
        reject("网络出错");
      },
    });
  });
  return promise;
}
//post请求
function postRequest(url, data) {
  var promise = new Promise((resolve, reject) => {
    var postData = data;
    uni.request({
      url: commoneUrl + url,
      data: postData,
      method: "POST",
      header: {
        "content-type": "application/json",
        Authorization: uni.getStorageSync("token"),
      },
      success: function (res) {
        resolve(res.data);
        if (res.statusCode === 200) {
          if (res.data.code == 200) {
          } else if (res.data.code == 402) {
          } else if (res.data.code == 501 || res.data.code == 502) {
            uni.showToast({
              title: res.data.message,
              duration: 2000,
              icon: "none",
            });
            uni.navigateTo({
              url: "/pages/index/index",
            });
          } else {
            uni.showToast({
              title: res.data.message,
              duration: 2000,
              icon: "none",
            });
          }
        } else {
          uni.showToast({
            title: res.data.message,
            duration: 2000,
            icon: "none",
          });
          reject("网络出错");
        }
      },
      error: function (e) {
        uni.showToast({
          title: "网络出错",
          duration: 2000,
          icon: "none",
        });
        reject("网络出错");
      },
    });
  });
  return promise;
}
//put请求
function putRequest(url, data) {
  var promise = new Promise((resolve, reject) => {
    var postData = data;
    uni.request({
      url: commoneUrl + url,
      data: postData,
      method: "PUT",
      header: {
        "content-type": "application/json",
        Authorization: uni.getStorageSync("token"),
      },
      success: function (res) {
        resolve(res.data);
        if (res.statusCode === 200) {
          if (res.data.code == 200) {
          } else if (res.data.code == 402) {
          } else if (res.data.code == 501 || res.data.code == 502) {
            uni.showToast({
              title: res.data.msg,
              duration: 2000,
              icon: "none",
            });
            uni.navigateTo({
              url: "/pages/index/index",
            });
          } else {
            uni.showToast({
              title: res.data.message,
              duration: 2000,
              icon: "none",
            });
          }
        } else {
          uni.showToast({
            title: res.data.message,
            duration: 2000,
            icon: "none",
          });
          reject("网络出错");
        }
      },
      error: function (e) {
        uni.showToast({
          title: "网络出错",
          duration: 2000,
          icon: "none",
        });
        reject("网络出错");
      },
    });
  });
  return promise;
}
//上传图片
function uploadPhoto(url, data) {
  var uploadData = data;
  var promise = new Promise((resolve, reject) => {
    uni.uploadFile({
      url: commoneUrl + url,
      filePath: uploadData,
      name: "img",

      success: function (uploadFileRes) {
        uploadFileRes.data = JSON.parse(uploadFileRes.data);

        if (uploadFileRes.statusCode == 200) {
          resolve(uploadFileRes.data);
        } else {
          uni.showToast({
            title: "网络出错",
            duration: 2000,
            icon: "none",
          });
          reject("网络出错");
        }
      },
      error: function (err) {
        uni.showToast({
          title: "网络出错",
          duration: 2000,
          icon: "none",
        });
        reject("网络出错");
      },
    });
  });
  return promise;
}

module.exports = {
  postRequest,
  getRequest,
  uploadPhoto,
  putRequest,
};
