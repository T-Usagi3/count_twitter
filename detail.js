function show_detail(){
  var y = document.getElementById("input_year").value;
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
  for(var d = 0; d < 31; ++d){
    tweets = result.data.detail[y - began_at].detail[m - 1].detail[d];
    data.addRows([[("0" + (d + 1)).slice(-2), (tweets == null)? 0 : tweets.tweets]]);
  }
  chart.draw(data, options);
}
