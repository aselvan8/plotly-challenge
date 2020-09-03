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



    });
};

// function for event change
function optionChanged(id) {
    getplot(id);
    getinfo(id);
};

init();