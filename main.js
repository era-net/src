function init() {
  let x = new xhr();
  x.getJson("GET", "./tempInc/data/", re => {
    console.log(re);
  });
}

window.addEventListener("load", init, false);