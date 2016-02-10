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
  var today = new Date();
  result.set(new Date(result.began_at.toString()));
  for(;result.get() <= today; result.nextMonth()) {
    var date = result.get();
    var tweeted_at = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2);
    var tweets = result.at("month");
    data.addRows([[tweeted_at, tweets]]);
  }
  chart.draw(data, options);
}
window.addEventListener("load", draw_overview_gragh, false);
