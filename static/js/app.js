// JS Comment

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
const dataPromise = d3.json(url);
/*
d3.json(url).then(function(data) {
  for (let i=0; i<data.samples.length; i++) {
    console.log(data.samples[i].sample_values);
  }});
*/
d3.json(url).then(function(data) {
  let top10vals = data.samples[0].sample_values.slice(0,10).sort((a,b) => a-b);
  let top10otu_ids = data.samples[0].otu_ids.slice(0,10).map((i) => `OTU ${i}`);
  let top10otu_labels = data.samples[0].otu_labels.slice(0,10);

  let trace1 = {
    x: top10vals,
    y: top10otu_ids,
    type: "bar",
    orientation: `h`,

    // Figure out tool tip
    hovertemplate: 
    `OTU Label<br>
      <b>${top10otu_labels}</b>`
  };
    // -----

  dataset = [trace1];

  Plotly.newPlot("plot", dataset);

});

/*


function init() {
  data = [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16] }];

  Plotly.newPlot("plot", data);
}
*/
d3.json(url).then(function(data) {
  let top10otu_labels = data.samples[0];
  console.log(top10otu_labels)
});