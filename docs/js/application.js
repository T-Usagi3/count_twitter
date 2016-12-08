google.load("visualization", "1", {packages:["corechart"]});
let tweetData;
let began_at = user_details.created_at.split(/-| /)[0] - 0;
let Grailbird = {data: {}};
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

for(var i = tweet_index.length - 1; i >= 0; --i) {
  var script = document.createElement("script");
  script.src = "./" + tweet_index[i].file_name;
  document.getElementById("head").appendChild(script);
}

var show_detail = () => {
  let y = document.getElementById("input_year").value - 0 ;
  let m = document.getElementById("input_month").value - 1;
  let chart = new google.visualization.ColumnChart(document.getElementById('graph2'));
  let data = google.visualization.arrayToDataTable([
    ['日', 'ツイート数'],
    ['', 0]
  ]);
  let options = {
    title: 'ツイート数遷移(' + y + '年' + m + '月)',
    legend: 'none',
    width: "100%",
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

window.addEventListener("load", () =>{
  tweetData = new Tweet(tweet_index, Grailbird.data, user_details, 5);
});

window.addEventListener("load", () => {
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
  for(let y = 2014; y <= 2016; ++y) {
    for(let m = 0; m < 12; ++m) {
      let sum = tweetData.where(x => x.created_at >= new Date(y, m, 1) && x.created_at < new Date(y, m + 1, 1)).count();
      data.addRows([[`${y}/${m + 1}`, sum]]);
    }
  }
  chart.draw(data, options);
});

window.addEventListener("load", () => {
  zip.workerScripts = {
    deflater: ["./js/z-worker.js", "./js/deflate.js"],
    inflater: ["./js/z-worker.js", "./js/inflate.js"]
  };
  let btn1 = document.getElementById("btn1");
  let btn2 = document.getElementById("btn2");
  btn1.addEventListener("click", show_tweet_rhythm);
  btn2.addEventListener("click", show_detail);
  document.getElementById("file").addEventListener("change", (e)=>{
    zip.createReader(new zip.BlobReader(e.target.files[0]), (zipReader) => {
      zipReader.getEntries((entries) => {
        let useEntries = entries.filter(x => /^data\/js\/tweets\/.*\.js/.test(x.filename) || /^data\/js\/tweet_index.js/.test(x.filename) || /^data\/js\/user_details.js/.test(x.filename));
        Promise.all(useEntries.map(x => {
          return new Promise((resolve) => {
            x.getData(new zip.TextWriter(), (r) => {
              console.log("read " + x.filename);
              resolve();
            });
          });
        })).then(() => zipReader.close());
      });
    },(e) => console.log(e));
  });
});

