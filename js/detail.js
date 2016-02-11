function show_detail(){
  var y = document.getElementById("input_year").value - 0 ;
  var m = document.getElementById("input_month").value - 0;
  var chart = new google.visualization.ColumnChart(document.getElementById('graph2'));
  var data = google.visualization.arrayToDataTable([
    ['日', 'ツイート数'],
    ['', 0]
  ]);
  var options = {
    title: 'ツイート数遷移(' + y + '年' + m + '月)',
    legend: 'none',
    width: 1500,
    height: 750,
    vAxis:{maxValue: 50, gridlines: {count: 11}}
  };
  result.set(y, m, 1);
  for(; result.get().getMonth() + 1 == m; result.nextDate()){
    data.addRows([[("0" + result.get().getDate()).slice(-2), result.at("date")]]);
  }
  chart.draw(data, options);
}
