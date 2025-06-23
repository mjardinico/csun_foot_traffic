// Creating the map of center of the desired location
var map = L.map('map',{
    center: [34.239544, -118.529338],
    zoom: 21
});

// Add the tile layer street view (OpenStreetMap) only use this without the ESRI tile layer
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// Updated version of OpenSteetMap tile layer view
var streetLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
streetLayer.addTo(map);   

// Add the ESRI tile layer satellite view
var esriLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{x}/{y}', {
    attribution: 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics',
    maxZoom: 17
});

// Create base map option
var baseMaps = {
    "Street View": streetLayer,
    "Satellite View (Esri)": esriLayer
};

// Add layer control to map
L.control.layers(baseMaps).addTo(map);

// Use the red pin marker from CDN
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  shadowSize: [41, 41]
});

// Add markers
L.marker([34.240119, -118.529356], { icon: redIcon })
  .addTo(map)
  .bindPopup(`   
    <img src="images/csun_library.jpg" width="250;" />
    <hr>
    <div style="text-align: center;">
        <strong>CSUN Library</strong>
    </div>
`);

L.marker([34.239951,-118.524936], { icon: redIcon })
  .addTo(map)
  .bindPopup(`
    <img src="images/csun_src.jpg" width="250" />
    <hr>
    <div style="text-align: center;">
      <strong>CSUN Student Recreation Center</strong>
    </div>
`);

L.marker([34.240092,-118.527047], { icon: redIcon })
  .addTo(map)
  // .bindPopup('<img src="images/usu_sol_bldg.jpg" width="250" />');
  .bindPopup(`
    <img src="images/usu_sol_bldg.jpg" width="250" />
    <hr>
    <div style="text-align: center;">
      <strong>USU SOL Building</strong>
    </div>
`);

L.marker([34.239917,-118.527784], { icon: redIcon })
  .addTo(map)
  // .bindPopup('<img src="images/matador_statue.jpg" width="250" />');
  .bindPopup(`
    <img src="images/matador_statue.jpg" width="250" />
    <hr>
    <div style="text-align: center;">
      <strong>CSUN Matador Statue</strong>
    </div>
`);

// Add hardcoded heatmap data
// const heat = L.heatLayer([
//     [34.240386,-118.530914, 0.6],
//     [34.239975,-118.532206, 0.8], 
//     [34.239602,-118.531316, 0.7], 
//     [34.239593,-118.531402, 0.5],
//     [34.240533,-118.531289, 0.4],
//     [34.240436,-118.532029, 0.5],
//     [34.240010,-118.532994, 0.7],
//     [34.239742,-118.525013, 0.6], 
//     [34.239901,-118.524831, 0.8], 
//     [34.240087,-118.525034, 0.7]

// ], { radius: 20 }).addTo(map);

// Read the CSV data using D3 library
// d3.csv("data/footTrafficDatarev1.csv").then(data => {
//   const heatData = data.map(d => [
//     parseFloat(d.latitude),
//     parseFloat(d.longitude),
//     parseFloat(d.intensity)
//   ]).filter(row => row.every(val => !isNaN(val)));

//   L.heatLayer(heatData, { radius: 20 }).addTo(map);
// });

// Revise the reading of CSV in the above section
let currentHeatLayer = null;

function updateHeatmap(day) {
  const fileMap = {
    "Monday": "data/footTrafficDatarev1.csv",
    "Tuesday": "data/footTrafficDatarev2.csv"
    // "Wednesday": "data/footTrafficDatarev3.csv",
    // "Thursday": "data/footTrafficDatarev4.csv",
    // "Friday": "data/footTrafficDatarev5.csv",
    // "Saturday": "data/footTrafficDatarev6.csv",
    // "Sunday": "data/footTrafficDatarev7.csv"
  };

  const csvFile = fileMap[day];

  if (!csvFile) {
    console.error("Invalid day selected.");
    return;
  }

  // Remove previous heat layer if it exists
  if (currentHeatLayer) {
    map.removeLayer(currentHeatLayer);
  }

  // Load new data
  d3.csv(csvFile).then(data => {
    const heatData = data.map(d => [
      parseFloat(d.latitude),
      parseFloat(d.longitude),
      parseFloat(d.intensity)
    ]).filter(row => row.every(val => !isNaN(val)));

    currentHeatLayer = L.heatLayer(heatData, { radius: 20 }).addTo(map);
  }).catch(err => {
    console.error("Error loading CSV file:", err);
  });
}

// Load the CSV file according to their day assignment
updateHeatmap("Monday");
updateHeatmap("Tuesday");