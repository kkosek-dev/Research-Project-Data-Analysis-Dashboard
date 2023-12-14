// Define url var
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Initialize Bar Chart
// Call D3 to read in JSON object from url & create a function to utilize the data
d3.json(url).then(function(data) {

  // Define our starter chart code
  // We use the ".slice" function to get the top 10 results
  // We also use the ".sort" function to assemble data in descending order
  // We also use ".map" function to relabel our top 10 OTU IDs
  let top10vals = data.samples[0].sample_values.slice(0,10).sort((a,b) => a-b);
  let top10otu_ids = data.samples[0].otu_ids.slice(0,10).map((i) => `OTU ${i}`);
  let top10otu_labels = data.samples[0].otu_labels.slice(0,10);

  // Assemble the Starter chart code into "trace1"
  let trace1 = {
    x: top10vals,
    y: top10otu_ids,
    type: "bar",
    // "orientation" keyword creates a horizontal bar chart
    orientation: `h`,
    hovertemplate: 
      `OTU Label<br>
      <b>${top10otu_labels}</b>`
  };

  // Convert that trace into an Array for Plotly called "dataset"
  dataset = [trace1];

  // Structure our Plotly chart with "layout"
  layout = { height: 600, width: 400 };

  // Visualize the data with Plotly on the "bar" HTML div
  Plotly.newPlot("bar", dataset);
});

// Initialize Bubble Chart
// Call D3 to read in JSON object from url & create a function to utilize the data
d3.json(url).then(function(data) {

  // Define our starter chart code
  let vals = data.samples[0].sample_values;
  let ids = data.samples[0].otu_ids;
  let labels = data.samples[0].otu_labels;

  // Assemble the Starter chart code into "trace1"
  let trace1 = {
    x: ids,
    y: vals,
    mode: "markers",
    // Using the marker keyword, we can specify our markers size & color based on vals
    marker: {
      color: ids,
      size: vals
    }, 
    hovertemplate: 
      `OTU Label<br>
      <b>${labels}</b>`
  };

  // Convert that trace into an Array for Plotly called "dataset"
  dataset = [trace1];

  // Structure our Plotly chart with "layout"
  layout = { height: 600, width: 1300,
    // We can add an axis title here
    xaxis: { title: "OTU IDs" } };

  // Visualize the data with Plotly on the "bubble" HTML div
  Plotly.newPlot("bubble", dataset,layout);
});

// Initialize Gauge Chart
// Call D3 to read in JSON object from url & create a function to utilize the data
d3.json(url).then(function(data) {

  // Define the start washing frequency
  let washFreq = data.metadata[0].wfreq;

  // Assemble the Starter chart code into "trace1"
  trace1 = {
    domain: { x: [0,1], y: [0,1] },
    value: washFreq,
    title: `<b>Belly Button Washing Frequency</b><br>Scrubs per week`,
    type: "indicator",
    mode: "gauge+number",
    delta: {reference: 400},
    gauge: { axis: {range: [null, 9]}}
  };

  // Convert that trace into an Array for Plotly called "dataset"
  let dataset = [trace1];

  // Structure our Plotly chart with "layout"
  let layout = { width:600, height:400 };

  // Visualize the data with Plotly on the "gauge" HTML div
  Plotly.newPlot("gauge", dataset, layout);
});

// Initialize Demographics
// Call D3 to read in JSON object from url & create a function to utilize the data
d3.json(url).then(function(data){

  // Define our starter table code
  let dataEntry = data.metadata[0];

  // Define where the table data will go
  let table = d3.select("#sample-metadata")

  // Insert an HTML block into the table container selection
  table.html(
    `id: ${dataEntry.id}<br>
    ethnicity: ${dataEntry.ethnicity}<br>
    gender: ${dataEntry.gender}<br>
    age: ${dataEntry.age}<br>
    location: ${dataEntry.location}<br>
   bbtype: ${dataEntry.bbtype}<br>
    wfreq: ${dataEntry.wfreq}<br>`
  );
});

// Starter Populate Dropdown Menu
// Call D3 to read in JSON object from url & create a function to utilize the data
d3.json(url).then(function(data){

  // Define our starter menu code
  let nameArray = data.names;

  // We create a function to load all the values into our dropdown element
  // This will create an interactive menu element on the front end
  function populateDropdown() {

    // First we define the location of the dropdown
    let dropdown = document.getElementById('selDataset');

    // We initiatize the dropdown as accepting HTML
    dropdown.innerHTML = '';

    // Then we define a for loop of length nameArray to collect all elements of nameArray
    // and append them all to the dropdown
    for (let i = 0; i < nameArray.length; i++) {
      let option = document.createElement('option');
      option.value = nameArray[i];
      option.text = nameArray[i];
      dropdown.appendChild(option);
    }
  }
  // Run the function to populate the menu from the start
  populateDropdown();
});

// Update function
// Here we are going to define a function to be called whenever the value of the dropdown menu changes
function optionChanged(selectedOption) {

  // Call D3 to read in JSON object from url & create a function to utilize the data
  d3.json(url).then(function(data) {
    
    // We define the selection of data by matching the selectedOption to the .id value of the JSON object
    let newData = data.samples.find(sample => sample.id === selectedOption);
    let newMetadata = data.metadata.find(x => x.id === parseInt(selectedOption));

    // We further refine our new data to fit the parameters of the charts we already initialized
    let barValues = newData.sample_values.slice(0,10).sort((a,b) => a-b);
    let barOTUids = newData.otu_ids.slice(0,10).map((i) => `OTU ${i}`);
    let bubValues = newData.sample_values;
    let bubOTUids = newData.otu_ids;
    let upWashFreq = newMetadata.wfreq;

    // We call the Plotly.update() function to add our updated data to the chart
    Plotly.update("bar", {
      x: [barValues],
      y: [barOTUids]
    });

    // We call the Plotly.update() function to add our updated data to the chart, again
    Plotly.update("bubble", {
      x: [bubOTUids],
      y: [bubValues]
    });

    // We call the Plotly.update() function to add our updated data to the chart, once more
    Plotly.update("gauge", {
      value: upWashFreq,
    });

    // We once again define the location of the demographics table
    let table = d3.select("#sample-metadata")
    
    // Then we insert an HTML block over the last block with the updated demographics data
    table.html(
      `id: ${newMetadata.id}<br>
      ethnicity: ${newMetadata.ethnicity}<br>
      gender: ${newMetadata.gender}<br>
      age: ${newMetadata.age}<br>
      location: ${newMetadata.location}<br>
      bbtype: ${newMetadata.bbtype}<br>
      wfreq: ${newMetadata.wfreq}<br>`
      )
  })
};