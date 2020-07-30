function init() {
  let x = new xhr();
  x.progressQuery({
    method: "GET",
    url: "./tempInc/data/",
    success: function(re) {
      // console.log(re);
    },
    progress: function(data) {
      console.log(data.total);
    }
  });
}

window.addEventListener("load", init, false);