var result;
var began_at = user_details.created_at.split(/-| /)[0] - 0;
var Grailbird = {data: {}};
var color = [
  "#FFF",
  "#B4F8FF",
  "#4BEEFF",
  "#00E6FF",
  "#00FFEF",
  "#00FFD1",
  "#00FFA6",
  "#00FF73",
  "#00FF4D",
  "#49FF00",
  "#A6FF00",
  "#DAFF00",
  "#FCFF00",
  "#FFE200",
  "#FFC900",
  "#FFB300",
  "#FFA600",
  "#FF9500",
  "#FF6F00",
  "#FF0000",
];

google.load("visualization", "1", {packages:["corechart"]});
for(var i = tweet_index.length - 1; i >= 0; --i) {
  var script = document.createElement("script");
  script.src = "./" + tweet_index[i].file_name;
  document.getElementById("head").appendChild(script);
}
window.addEventListener("load", set_json, false);

function set_json(){
  result = new Tweet(tweet_index, Grailbird.data, user_details, 5);
}
