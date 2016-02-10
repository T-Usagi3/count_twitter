function show_tweet_rhythm(){
  var result2 = [];
  var per_day_of_the_week = [];
  var max_of_day_of_the_week = [];
  var k = document.getElementById("input_k").value - 0;
  var calendar = document.getElementById("calendar");
  var color_graph = document.getElementById("color_graph");

  calendar.innerHTML = "";
  color_graph.innerHTML = "";
  for(var y in result.detail){
    for(var month in result.detail[y].detail){
      for(var dtw in result.detail[y].detail[month].detail2){
        for(var h in result.detail[y].detail[month].detail2[dtw].detail){
          for(var minute in result.detail[y].detail[month].detail2[dtw].detail[h].detail){
            if(result2[h] == null){
              result2[h] = [];
            }
            if(result2[h][minute] == null){
              result2[h][minute] = [];
            }
            if(result2[h][minute][dtw] == null){
              result2[h][minute][dtw] = 0;
            }
            if(per_day_of_the_week[dtw] == null){
              per_day_of_the_week[dtw] = 0;
              max_of_day_of_the_week[dtw] = 0;
            }
            var delta = result.detail[y].detail[month].detail2[dtw].detail[h].detail[minute].tweets;
            result2[h][minute][dtw] += delta;
            per_day_of_the_week[dtw] += delta;
            if(max_of_day_of_the_week[dtw] < result2[h][minute][dtw]){
              max_of_day_of_the_week[dtw] = result2[h][minute][dtw];
            }
          }
        }
      }
    }
  }
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

      for(var dtw = 0; dtw < 7; ++dtw){
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
