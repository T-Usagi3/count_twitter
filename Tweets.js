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
