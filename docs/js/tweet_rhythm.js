function show_tweet_rhythm() {
  let max = 0, max2 = 0;
  let k = document.getElementById("input_k").value - 0;
  var calendar = document.getElementById("calendar");

  calendar.innerHTML = "";
  for(let h = 0; h < 24; ++h) {
    for(let m = 0; m < 60; m += 5) {
      let sum = tweetData.where(x => x.created_at.getHours() === h && x.created_at.getMinutes() >= m && x.created_at.getMinutes() < m + 5).count();
      max2 = Math.max(max2, sum);
      for(let d = 0; d < 7; ++d) {
        let sum = tweetData.where(x => x.created_at.getDay() === d && x.created_at.getHours() === h && x.created_at.getMinutes() >= m && x.created_at.getMinutes() < m + 5).count();
        max = Math.max(max, sum);
      }
    }
  }
  for(let h = 0; h < 24; ++h) {
    for(let m = 0; m < 60; m += 5) {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      td.textContent = ("0" + h).slice(-2) + ":" + ("0" + m).slice(-2) + "-" + ("0" + h).slice(-2) + ":" + ("0" + (m + 4)).slice(-2);
      tr.appendChild(td);
      for(let d = 0; d <= 7; ++d) {
        let td = document.createElement("td");
        let sum, level;
        if(d === 7) {
          sum = tweetData.where(x => x.created_at.getHours() === h && x.created_at.getMinutes() >= m && x.created_at.getMinutes() < m + 5).count();
          level = sum / (max2 * k);
        } else {
          sum = tweetData.where(x => x.created_at.getDay() === d && x.created_at.getHours() === h && x.created_at.getMinutes() >= m && x.created_at.getMinutes() < m + 5).count();
          level = sum / (max * k);
        }
        let index = Math.floor(((level >= 1) ? 0.999 : level) * 20);
        td.textContent = sum;
        td.style.backgroundColor = color[index];
        tr.appendChild(td);
      }
      calendar.appendChild(tr);
    }
  }

  let tr = document.createElement("tr");
  let td = document.createElement("td");
  td.textContent = "合計"
  tr.appendChild(td);
  for(let d = 0; d <= 7; ++d) {
    let td = document.createElement("td");
    let sum;
    if(d === 7) {
      sum = tweetData.count();
    } else {
      sum = tweetData.where(x => x.created_at.getDay() === d).count();
    }
    td.textContent = sum;
    tr.appendChild(td);
  }
  calendar.appendChild(tr);
}
