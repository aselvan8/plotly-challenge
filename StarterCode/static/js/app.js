// Function for initial data rendering
function init() {
    var dropdown = d3.select('#selDataset');

    // Use d3.json() to fetch data from JSON file
    d3.json("samples.json").then((data) => {
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).node().value;
        });
        // call initial data
        getplot(data.name[0]);
        getinfo(data.names[0]);
    });
};

init();

// function to get demographic info
function getinfo(id) {

    d3.json('samples.json').then((data) => {
        var metadata = data.metadata;

        var filteredinfo = metadata.filter(d => d.id == id)[0];

        // select demographic panel to put data
        var info = d3.select("#sample-metadata");

        // empty the info panel each time before getting new id info
        info.html("");

        // grab data for the id and append the info to the panel
        Object.entries(filteredinfo).forEach(([key, value]) => {
                info.append("h4").text(`${key}: ${value}\n`);
        });
    });
};

function getplot(id) {

    d3.json("samples.json").then((data) => {
        console.log(data);

        // filter sample value by id
        var samples = data.samples.filter(d => d.id == id)[0];

        // get top 10 sample values
        var samplevalues = samples.sample_values.slice(0, 10).reverse();

        // get top 10 otu_ids
        var ids = samples.otu_ids.slice(0, 10).reverse();
        var otuids = ids.map(d => "OTU " + d);

        var otulables = samples.otu_labels.slice(0, 10);

        // trace for the bar chart
        var trace = {
            x: samplevalues,
            y: otuids,
            text: otulables,
            type: "bar",
            orientation: "h"
        };

        var data = [trace];

        // layout to set plots layout
        var layout = {
            title: "Top 10 OTU",
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };

        // present the bar plot
        Plotly.newPlot("bar", data, layout)


        // trace for the bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels

        };

        // layout for the bubble plot
        var layout1 = {
            xaxis:{title: "OTU"},
            height: 700,
            width: 1000
        };

        var data1 = [trace1];

        // present the bar plot
        Plotly.newPlot("bubble", data1, layout1)

    });
};

// function for event change
function optionChanged(id) {
    getplot(id);
    getinfo(id);
};