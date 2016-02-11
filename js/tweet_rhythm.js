function show_tweet_rhythm(){
  var result2 = [];
  var per_day_of_the_week = [];
  var max_of_day_of_the_week = [];
  var k = document.getElementById("input_k").value - 0;
  var calendar = document.getElementById("calendar");
  var color_graph = document.getElementById("color_graph");

  calendar.innerHTML = "";
  color_graph.innerHTML = "";
  var today = new Date();
  result.reset();
  per_day_of_the_week[7] = 0;
  max_of_day_of_the_week[7] = 0;
  for(;result.get() <= today; result.nextMinutes()) {
    var date = result.get();
    var tweeted_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2);
    var tweets = result.at("date");
    var h = result.get().getHours(), m = Math.floor(result.get().getMinutes() / result.rank), dtw = result.get().getDay();

    if(result2[h] == null){
      result2[h] = [];
    }
    if(result2[h][m] == null){
      result2[h][m] = [];
      result2[h][m][7] = 0;
    }
    if(result2[h][m][dtw] == null){
      result2[h][m][dtw] = 0;
    }
    if(per_day_of_the_week[dtw] == null){
      per_day_of_the_week[dtw] = 0;
      max_of_day_of_the_week[dtw] = 0;
    }
    var delta = result.at("minutes");
    result2[h][m][dtw] += delta;
    result2[h][m][7] += delta;
    per_day_of_the_week[dtw] += delta;
    per_day_of_the_week[7] += delta;

    if(max_of_day_of_the_week[dtw] < result2[h][m][dtw]){
      max_of_day_of_the_week[dtw] = result2[h][m][dtw];
    }
    if(max_of_day_of_the_week[7] < result2[h][m][7]){
      max_of_day_of_the_week[7] = result2[h][m][7];
    }
  }
  console.log(result2);
  console.log(max_of_day_of_the_week);
  for(var h = 0; h < 24; ++h){
    for(var m = 0; m < 12; ++m){
      var tr = document.createElement("tr"), tr2 = document.createElement("tr");
      var td, td2;
      td = document.createElement("td");
      td.textContent = ("0" + h).slice(-2) + ":" + ("0" + 5 * m).slice(-2) + "-" + ("0" + h).slice(-2) + ":" + ("0" + (5 * (m + 1) - 1)).slice(-2);
      tr.appendChild(td);
      if(m == 0){
        td2 = document.createElement("td");
        td2.rowSpan = "12";
        td2.style.backgroundColor = "#FFC";
        td2.textContent = h;
        tr2.appendChild(td2);
      }
      var total = 0;
      for(var dtw = 0; dtw <= 7; ++dtw){
        td = document.createElement("td");
        td2 = document.createElement("td");
        if(result2[h] == null || result2[h][m] == null || result2[h][m][dtw] == null){
          td.textContent = 0;
        } else {
          td.textContent = result2[h][m][dtw];
          tmp = (result2[h][m][dtw] / max_of_day_of_the_week[dtw] / k);
          tmp = (tmp > 1)? 1 : tmp;
          p = Math.floor(tmp * 20) - 1;
          td2.style.backgroundColor = color[p];
        }
        tr.appendChild(td);
        tr2.appendChild(td2);
      }

      calendar.appendChild(tr);
      color_graph.appendChild(tr2);
    }
  }
  tr = document.createElement("tr");
  td = document.createElement("td");
  td.textContent = "合計値";
  tr.appendChild(td);
  for(var dtw = 0; dtw < 7; ++dtw){
    td = document.createElement("td");
    td.textContent = per_day_of_the_week[dtw];
    tr.appendChild(td);
  }
  calendar.appendChild(tr);
}
