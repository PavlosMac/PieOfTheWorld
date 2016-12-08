var PieChart = function(params) {
  var container = document.getElementById('pie-chart');

  var chart = new Highcharts.Chart({
    chart: {
      type: "pie",
      renderTo: params.container
    },
    title: {
      text: params.title
    },
    series: [{name: params.seriesName, data: params.data}]
  });
  console.log(chart);
};
