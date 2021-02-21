const ctx = document.querySelector('.js-chart').getContext('2d');
const GLOBAL_MEAN_TEMPERATURE = 14;

fetchData()
.then(parseData)
.then(mappedData)
.then(drawChart)

function fetchData () {
    return fetch('./ZonAnn.Ts+dSST.csv')
    .then(response => response.text())
}
function parseData (data) {
    return Papa.parse(data, {header: true}).data;
}
function mappedData (data) {
    return data.reduce((acc, entry) => {
            acc.years.push(entry.Year);
            acc.temps.push(Number(entry.Glob) + GLOBAL_MEAN_TEMPERATURE);
            acc.nHem.push(Number(entry.NHem) + GLOBAL_MEAN_TEMPERATURE);
            acc.sHem.push(Number(entry.SHem) + GLOBAL_MEAN_TEMPERATURE);
            return acc;
        }, {years:[], temps: [], nHem: [], sHem:[]})
}

function drawChart (data) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.years,
                datasets: [{
                    label: 'Средняя глобальная температура',
                    data: data.temps,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Средняя температура северного полушария',
                    data: data.nHem,
                    backgroundColor: 'rgba(155, 106, 86, 0.2)',
                    borderColor: 'rgb(0, 0, 250)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Средняя температура южного полушария',
                    data: data.sHem,
                    backgroundColor: 'rgba(155, 106, 86, 0.2)',
                    borderColor: 'rgb(250, 0, 0)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            callback: function(value, index, values) {
                                return value + '°';
                            }
                        }
                    }]
                }
            }
        });
    }


