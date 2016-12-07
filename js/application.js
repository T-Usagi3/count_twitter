window.addEventListener("load", init, false);
function init(){
  var btn1 = document.getElementById("btn1");
  var btn2 = document.getElementById("btn2");
  btn1.addEventListener("click", show_tweet_rhythm, false);
  btn2.addEventListener("click", show_detail, false);
}
