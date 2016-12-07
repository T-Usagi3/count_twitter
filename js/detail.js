function show_detail(){
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
    width: 1500,
    height: 750,
    vAxis:{maxValue: 50, gridlines: {count: 11}}
  };
  let date = new Date(y, m, 1);
  for(; m == date.getMonth(); date = new Date(date.valueOf() + 86400000)) {
    let sum = result.where(x => new Date(x.created_at) >= date && new Date(x.created_at) < new Date(date.valueOf() + 86400000)).count();
    data.addRows([[("0" + date.getDate()).slice(-2), sum]]);
  }
  chart.draw(data, options);
}
