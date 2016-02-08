var result = {tweets: 0, detail: []};
var Grailbird = function (type, date, data) {
  Grailbird.data = Grailbird.data || {};
  Grailbird.data[type+'_'+date] = data;
};
Grailbird.data = Grailbird.data || {};

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
      tmp = tweets[j].created_at.split(" ");
      jst_date = new Date(tmp[0].replace(/-/g, "/") + " " + tmp[1] + " +0000");
      year = jst_date.getFullYear();
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
