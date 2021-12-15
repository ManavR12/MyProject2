//For user to use their own key so that project can work many times. User input's own key: '?registrationkey=(USER API KEY)'
let APIKey = '';


//Count for responses
let response = 0
//SuperSectors chart
const SuperSectors = {

  "00": 'Total nonfarm',
  "05": 'Total private',
  "06": 'Goods-producing',
  "07": 'Service-providing',
  "08": 'Private service-providing',
  "10": 'Mining and logging',
  "20": 'Construction',
  "30": 'Manufacturing',
  "31": 'Durable Goods',
  "32": 'Nondurable Goods',
  "40": 'Trade, transportation, and utilities',
  "41": 'Wholesale trade',
  "42": 'Retail trade',
  "43": 'Transportation and warehousing',
  "44": 'Utilities',
  "50": 'Information',
  "55": 'Financial activities',
  "60": 'Professional and business services',
  "65": 'Education and health services',
  "70": 'Leisure and hospitality',
  "80": 'Other Services',
  "90": 'Governnment',
}

let SuperSectors_Keys = Object.keys(SuperSectors)
console.log(SuperSectors_Keys)


const CHARTCOLORS = {
    orange: 'rgb(253, 154, 0)',
    red: 'rgb(255, 0, 0)',
    aqua: 'rgb(0, 255, 255)',
    green: 'rgb(0, 153, 51)',
    deeppink: 'rgb(255, 20, 147)',
    purple: 'rgb(153, 0, 204)',
    grey: 'rgb(128, 128, 128)',
    yellow: 'rgb(255, 255, 0)',
    darkorchid: 'rgb(153, 50, 204)',
    royalblue: 'rgb(65, 105, 225)',
    darkred: 'rgb(128, 0, 0)',
    forestgreen: 'rgb(34, 139, 34)',
    darkorange: 'rgb(255, 140, 0)',
    navygreen: 'rgb(51, 51, 0)',
    brown: 'rgb(102, 51, 0)',
    oceanblue: 'rgb(102, 153, 153)',
    babypink: 'rgb(255, 204, 255)',
    mediumblue: 'rgb(102, 153, 255)',
    gold: 'rgb(255, 215, 0)',
    pinkred: 'rgb(255, 0, 102)',
    blueviolet: 'rgb(138, 43, 226)',
    greenblue: 'rgb(0, 102, 102)',
    lime: 'rgb(0, 255, 0)'


};
let ChartColor_Keys = Object.keys(CHARTCOLORS)

// console.dir(CHART_COLORS);
const CHARTCOLORS_50_Percent = {
    orange: 'rgba(253, 154, 0, 0.5)',
    red: 'rgba(255, 0, 0, 0.5)',
    aqua: 'rgb(0, 255, 255, 0.5)',
    green: 'rgba(0, 153, 51, 0.5)',
    deeppink: 'rgba(255, 20, 147, 0.5)',
    purple: 'rgba(153, 0, 204, 0.5)',
    grey: 'rgba(128, 128, 128, 0.5)',
    yellow: 'rgb(255, 255, 0, 0.5)',
    darkorchid: 'rgb(153, 50, 204, 0.5)',
    royalblue: 'rgb(65, 105, 225, 0.5)',
    darkred: 'rgb(128, 0, 0, 0.5)',
    forestgreen: 'rgb(34, 139, 34, 0.5)',
    darkorange: 'rgb(255, 140, 0, 0.5)',
    navygreen: 'rgb(51, 51, 0, 0.5)',
    brown: 'rgb(102, 51, 0, 0.5)',
    oceanblue: 'rgb(102, 153, 153, 0.5)',
    babypink: 'rgb(255, 204, 255, 0.5)',
    mediumblue: 'rgb(102, 153, 255, 0.5)',
    gold: 'rgb(255, 215, 0, 0.5)',
    pinkred: 'rgb(255, 0, 102, 0.5)',
    blueviolet: 'rgb(138, 43, 226, 0.5)',
    greenblue: 'rgb(0, 102, 102, 0.5)',
    lightgreen: 'rgb(0, 255, 0, 0.5)'

};
// console.log(CHART_COLORS_50_Percent)
const data = {
  labels: [],
  datasets:[]
}
//console.dir(data);
const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        siaplay: true,
        text: 'Number of Employeess in Thousands'
      }
    }
  }
}
// console.log(config);
// console.dir(myChart);
// console.log("Ending");
function responseReceivedHandler() {
  if (this.status == 200) {
    console.log(this.response);
    let dataArray = this.response.Results.series[0].data;
    let seriesID = this.response.Results.series[0].seriesID;
    let sectorID = seriesID.substring(3,5)
    let gridline = {
      label: 'Super sector name',
      data: [],
      borderColor: CHARTCOLORS.red,//Pulling 22 colors via array
      backgroundColor: CHARTCOLORS_50_Percent.red,//Pulling 22 colors via array
      hidden: true

    };


    for (let i = dataArray.length-1; i>=0; i--) {
      gridline.data.push(dataArray[i].value)

      if(response==0){
        data.labels.push(dataArray[i].period.substring(1)+ '/'+ dataArray[i].year)
      }
    }

    gridline.label = SuperSectors[sectorID]
    gridline.borderColor = CHARTCOLORS[ChartColor_Keys[response]]
    gridline.backgroundColor = CHARTCOLORS_50_Percent[ChartColor_Keys[response]]

    data.datasets.push(gridline)
    response++

  } else{
    console.log ("error");
  }

  if (response==SuperSectors_Keys.length){
    const myChart = new Chart(
      document.getElementById('myChart'),
      config);
  }
}

for (let i=0; i<SuperSectors_Keys.length; i++) {
  let startquery = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU"
  let endquery = '00000001' + APIKey;
  let xhr = new XMLHttpRequest();

  xhr.addEventListener("load", responseReceivedHandler);
  xhr.responseType = "json";
  xhr.open("GET", startquery + SuperSectors_Keys[i] + endquery);
  xhr.send();
}
