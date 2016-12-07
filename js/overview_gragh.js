function draw_overview_gragh() {
  let chart = new google.visualization.ColumnChart(document.getElementById('graph1'));
  let data = google.visualization.arrayToDataTable([
    ['年月', 'ツイート数'],
    ['', 0]
  ]);
  let options = {
    title: 'ツイート数遷移(月ごと)',
    legend: 'none',
    width: 1500,
    height: 750,
    vAxis:{maxValue: 1000, gridlines: {count: 11}}
  };
  let today = new Date();
  for(let y = 2014; y <= 2016; ++y) {
    for(let m = 0; m < 12; ++m) {
      let start = new Date(y, m, 1);
      let end = new Date(y, m, 1);
      for(; m == end.getMonth(); end = new Date(end.valueOf() + 86400000)) {
      }
      let sum = result.where(x => new Date(x.created_at) >= start && new Date(x.created_at) < end).length
      data.addRows([[`${y}/${m + 1}`, sum]]);
    }
  }
  chart.draw(data, options);
}
window.addEventListener("load", draw_overview_gragh, false);
