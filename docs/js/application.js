google.load("visualization", "1", {packages:["corechart"]});
let tweetData;
let color = [
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
let drawTweetRhythm = () => {
  let max = 0, max2 = 0;
  let k = document.getElementById("input_k").value - 0;
  let calendar = document.getElementById("calendar");

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

let drawMonthlyGraph = () => {
  let y = document.getElementById("input_year").value - 0 ;
  let m = document.getElementById("input_month").value - 1;
  let chart = new google.visualization.ColumnChart(document.getElementById('graph2'));
  let data = google.visualization.arrayToDataTable([
    ['日', 'ツイート数'],
    ['', 0]
  ]);
  let options = {
    title: `ツイート数遷移(${y}年${m + 1}月)`,
    legend: 'none',
    width: "95%",
    height: 300,
    vAxis:{maxValue: 50, gridlines: {count: 11}}
  };
  let date = new Date(y, m, 1);
  for(; m == date.getMonth(); date = new Date(date.valueOf() + 86400000)) {
    let sum = tweetData.where(x => x.created_at >= date && x.created_at < new Date(date.valueOf() + 86400000)).count();
    data.addRows([[("0" + date.getDate()).slice(-2), sum]]);
  }
  chart.draw(data, options);
}

let drawOverviewGraph = () => {
  let chart = new google.visualization.ColumnChart(document.getElementById('graph1'));
  let data = google.visualization.arrayToDataTable([
    ['年月', 'ツイート数'],
    ['', 0]
  ]);
  let options = {
    title: 'ツイート数遷移(月ごと)',
    legend: 'none',
    width: "100%",
    height: 300,
    vAxis:{maxValue: 1000, gridlines: {count: 11}}
  };
  let today = new Date();
  for(let y = tweetData.began_at.getFullYear(); y <= today.getFullYear(); ++y) {
    for(let m = 0; m < 12; ++m) {
      let sum = tweetData.where(x => x.created_at >= new Date(y, m, 1) && x.created_at < new Date(y, m + 1, 1)).count();
      data.addRows([[`${y}/${m + 1}`, sum]]);
    }
  }
  chart.draw(data, options);
};

window.addEventListener("load", () => {
  zip.workerScripts = {
    deflater: ["./js/z-worker.js", "./js/deflate.js"],
    inflater: ["./js/z-worker.js", "./js/inflate.js"]
  };
  let btn1 = document.getElementById("btn1");
  let btn2 = document.getElementById("btn2");
  let rawData = {};
  btn1.addEventListener("click", drawTweetRhythm);
  btn2.addEventListener("click", drawMonthlyGraph);
  document.getElementById("file").addEventListener("change", (e)=>{
    zip.createReader(new zip.BlobReader(e.target.files[0]), (zipReader) => {
      zipReader.getEntries((entries) => {
        let useEntries = entries.filter(x => /^data\/js\/tweets\/.*\.js/.test(x.filename) || /^data\/js\/tweet_index.js/.test(x.filename) || /^data\/js\/user_details.js/.test(x.filename));
        Promise.all(useEntries.map((x, i) => {
          return new Promise((resolve) => {
            x.getData(new zip.TextWriter(), (r) => {
              let index = x.filename.replace(/data\/js\/(tweets\/)?|\.js/g, "");
              rawData[index] = JSON.parse(r.replace(/^(var )?.* = /, ""));
              resolve();
            });
          });
        })).then(() => {
          tweetData = new Tweet(rawData);
          drawOverviewGraph();
          console.log(tweetData);
          zipReader.close();
        });
      });
    }, (e) => console.log(e));
  });
});

