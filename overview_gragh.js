function draw_overview_gragh() {
  var chart = new google.visualization.ColumnChart(document.getElementById('graph1'));
  var data = google.visualization.arrayToDataTable([
    ['年月', 'ツイート数'],
    ['', 0]
  ]);
  var options = {
    title: 'ツイート数遷移(月ごと)',
    legend: 'none',
    width: 1500,
    height: 750,
    vAxis:{maxValue: 1000, gridlines: {count: 11}}
  };
  for(y in result.detail){
    for(m in result.detail[y].detail){
      tweeted_at = (y - 0 + began_at) + "/" + ("0" + (m - 0 + 1)).slice(-2);
      tweets = result.detail[y].detail[m].tweets;
      data.addRows([[tweeted_at, tweets]]);
    }
  }
  chart.draw(data, options);
}

  window.addEventListener("load", draw_overview_gragh, false);
