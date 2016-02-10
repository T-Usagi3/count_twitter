function get_tweets(data, date, start_year, mode, rank) {
  var tmp = data;
  var stack = ["year", "month", ["date", "date-hours", "date-minutes"], ["day", "day-hours", "day-minutes"]]

  if(mode == "all_data") {
    return tmp.tweets;
  }

  tmp = tmp.detail[date.getFullYear() - start_year];
  if(tmp == null) {
    return 0;
  } else if(mode == "year") {
    return tmp.tweets;
  }

  tmp = tmp.detail[date.getMonth()];
  if(tmp == null) {
    return 0;
  } else if(mode == "month") {
    return tmp.tweets;
  }

  mode = mode.split("-");
  if(mode[0] == "date") {
    tmp = tmp.detail[date.getDate() - 1];
  } else if(mode[0] == "day") {
    tmp = tmp.detail2[date.getDay()];
  } else {
    return 0;
  }
  mode = mode[1];
  if(mode == null) {
    return tmp.tweets;
  }

  tmp = tmp.detail[date.getHours()];
  if(tmp == null) {
    return 0;
  } else if(mode == "hours") {
    return tmp.tweets;
  }

  tmp = tmp.detail[date.getMinutes()];
  if(tmp == null) {
    return 0;
  } else if(mode == "minutes") {
    return tmp.tweets;
  }

  return 0;
}
