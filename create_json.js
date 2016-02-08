var result = {tweets: 0, detail: []};
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
window.addEventListener("load", init, false);

function init(){
  for(var i = tweet_index.length - 1; i >= 0; --i) {
    tweets = Grailbird.data[tweet_index[i].var_name];
    for(var j = 0; j < tweets.length; ++j){
      jst_date = new Date(tweets[j].created_at.replace(/-/g, "/") + " +0000");
      year = jst_date.getFullYear() - began_at;
      month = jst_date.getMonth();
      day = jst_date.getDate() - 1;
      day_of_the_week = jst_date.getDay();
      hour = jst_date.getHours();
      minute = Math.floor(jst_date.getMinutes() / 5);

      if(result.detail[year] == null) {
        result.detail[year] = {tweets: 0, detail: []};
      }
      if(result.detail[year].detail[month] == null) {
        result.detail[year].detail[month] = {tweets: 0, detail: [], detail2: []};
      }
      if(result.detail[year].detail[month].detail[day] == null) {
        result.detail[year].detail[month].detail[day] = {day_of_the_week: day_of_the_week, tweets: 0, detail: []};
      }
      if(result.detail[year].detail[month].detail2[day_of_the_week] == null) {
        result.detail[year].detail[month].detail2[day_of_the_week] = {tweets: 0, detail: []};
      }
      if(result.detail[year].detail[month].detail[day].detail[hour] == null) {
        result.detail[year].detail[month].detail[day].detail[hour] = {tweets: 0, detail: []};
      }
      if(result.detail[year].detail[month].detail2[day_of_the_week].detail[hour] == null) {
        result.detail[year].detail[month].detail2[day_of_the_week].detail[hour] = {tweets: 0, detail: []};
      }
      if(result.detail[year].detail[month].detail[day].detail[hour].detail[minute] == null) {
        result.detail[year].detail[month].detail[day].detail[hour].detail[minute] = {tweets: 0};
      }
      if(result.detail[year].detail[month].detail2[day_of_the_week].detail[hour].detail[minute] == null) {
        result.detail[year].detail[month].detail2[day_of_the_week].detail[hour].detail[minute] = {tweets: 0};
      }
      ++result.tweets;
      ++result.detail[year].tweets;
      ++result.detail[year].detail[month].tweets;
      ++result.detail[year].detail[month].detail[day].tweets;
      ++result.detail[year].detail[month].detail2[day_of_the_week].tweets;
      ++result.detail[year].detail[month].detail[day].detail[hour].tweets;
      ++result.detail[year].detail[month].detail2[day_of_the_week].detail[hour].tweets;
      ++result.detail[year].detail[month].detail[day].detail[hour].detail[minute].tweets;
      ++result.detail[year].detail[month].detail2[day_of_the_week].detail[hour].detail[minute].tweets;
    }
  }
  console.log(result);
}
