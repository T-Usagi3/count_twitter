function Tweets(index_json, detail_json, user_data, minutes_rank) {
  this.data = {tweets: 0, detail: []};
  this.rank = minutes_rank;
  this.began_at = new Date(user_data.created_at.replace(/-/g, "/"));

  for(var i = index_json.length - 1; i >= 0; --i) {
    var tweets = detail_json[index_json[i].var_name];
    for(var j = 0; j < tweets.length; ++j){
      var jst_date = new Date(tweets[j].created_at.replace(/-/g, "/"));
      var year = jst_date.getFullYear() - began_at;
      var month = jst_date.getMonth();
      var day = jst_date.getDate() - 1;
      var day_of_the_week = jst_date.getDay();
      var hour = jst_date.getHours();
      var minute = Math.floor(jst_date.getMinutes() / this.rank);

      if(this.data.detail[year] == null) {
        this.data.detail[year] = {tweets: 0, detail: []};
      }
      if(this.data.detail[year].detail[month] == null) {
        this.data.detail[year].detail[month] = {tweets: 0, detail: [], detail2: []};
      }
      if(this.data.detail[year].detail[month].detail[day] == null) {
        this.data.detail[year].detail[month].detail[day] = {day_of_the_week: day_of_the_week, tweets: 0, detail: []};
      }
      if(this.data.detail[year].detail[month].detail2[day_of_the_week] == null) {
        this.data.detail[year].detail[month].detail2[day_of_the_week] = {tweets: 0, detail: []};
      }
      if(this.data.detail[year].detail[month].detail[day].detail[hour] == null) {
        this.data.detail[year].detail[month].detail[day].detail[hour] = {tweets: 0, detail: []};
      }
      if(this.data.detail[year].detail[month].detail2[day_of_the_week].detail[hour] == null) {
        this.data.detail[year].detail[month].detail2[day_of_the_week].detail[hour] = {tweets: 0, detail: []};
      }
      if(this.data.detail[year].detail[month].detail[day].detail[hour].detail[minute] == null) {
        this.data.detail[year].detail[month].detail[day].detail[hour].detail[minute] = {tweets: 0};
      }
      if(this.data.detail[year].detail[month].detail2[day_of_the_week].detail[hour].detail[minute] == null) {
        this.data.detail[year].detail[month].detail2[day_of_the_week].detail[hour].detail[minute] = {tweets: 0};
      }
      ++this.data.tweets;
      ++this.data.detail[year].tweets;
      ++this.data.detail[year].detail[month].tweets;
      ++this.data.detail[year].detail[month].detail[day].tweets;
      ++this.data.detail[year].detail[month].detail2[day_of_the_week].tweets;
      ++this.data.detail[year].detail[month].detail[day].detail[hour].tweets;
      ++this.data.detail[year].detail[month].detail2[day_of_the_week].detail[hour].tweets;
      ++this.data.detail[year].detail[month].detail[day].detail[hour].detail[minute].tweets;
      ++this.data.detail[year].detail[month].detail2[day_of_the_week].detail[hour].detail[minute].tweets;
    }
  }
}

Tweets.prototype.allTweets = function() {
  return this.data.tweets;
}

Tweets.prototype.at = function() {
  var tmp = this.data;
  var y, month, d, dtw, h, m;
  var mode;

  if(arguments[0].constructor.toString().split(/ |\(\)/)[1] == "Date"){
    var date = arguments[0];
    y = date.getFullYear() - this.began_at.getFullYear();
    month = date.getMonth();
    d = date.getDate() - 1;
    dtw = date.getDay();
    h = date.getHours();
    m = date.getMinutes();
    mode = arguments[1];
  } else if(arguments[0].constructor.toString().split(/ |\(\)/)[1] == "Number") {
    var x = arguments.length;
    var stack = ["year", "month", "date", "date-hours", "date-minutes", "day", "day-hours", "day-minutes"];
    y = arguments[0] - this.began_at.getFullYear();
    month = arguments[1] - 1;
    d = arguments[2] - 1;
    dtw = arguments[2];
    h = arguments[3];
    minutes = arguments[4];

    if(arguments[x - 1].constructor.toString().split(/ |\(\)/)[1] == "String" && x >= 4 && arguments[x - 1] == "day") {
      mode = stack[x + 2];
    } else {
      mode = stack[x - 1];
    }
  } else {
    return 0;
  }

  tmp = tmp.detail[y];
  if(tmp == null) {
    return 0;
  } else if(mode == "year") {
    return tmp.tweets;
  }

  tmp = tmp.detail[month];
  if(tmp == null) {
    return 0;
  } else if(mode == "month") {
    return tmp.tweets;
  }

  mode = mode.split("-");
  if(mode[0] == "date") {
    tmp = tmp.detail[d];
  } else if(mode[0] == "day") {
    tmp = tmp.detail2[dtw];
  } else {
    return 0;
  }
  mode = mode[1];
  if(mode == null) {
    return tmp.tweets;
  }

  tmp = tmp.detail[h];
  if(tmp == null) {
    return 0;
  } else if(mode == "hours") {
    return tmp.tweets;
  }

  tmp = tmp.detail[minutes];
  if(tmp == null) {
    return 0;
  } else if(mode == "minutes") {
    return tmp.tweets;
  }

  return 0;
}
