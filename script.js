arr = [65,87,67,70,56];

let ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['A[0]', 'A[1]', 'A[2]', 'A[3]', 'A[4]'],
        datasets: [{
            label: '',
            data: arr,
            backgroundColor: ['blue','blue','blue','blue','blue'],
            borderColor: 'black', 
            hoverBackgroundColor: 'black',
            barThickness: 2
        }]
    },
    options: {
        animation: {
            duration: 100
        }, 
        scales: {
            xAxes: [{
                gridLines: {
                    drawBorder: false,
                    display:false
                },
                ticks: {
                    display: false,
                    min: 0
                }
            }],
            yAxes: [{
                gridLines: {
                    drawBorder: false,
                    display:false
                }, 
                ticks: {
                    display: false,
                    min: 0
                } 
            }]
        },
        options: {
            //label: false,
            responsive: true,
            responsiveAnimationDuration: 10,
            backgroundColor: 'blue',
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
        }
    }
});
//document.getElementById('c').width = 200;

let n = 5, speed = 5;
let dataset = chart.data.datasets[0];
// let slider = document.getElementById('speed');
// slider.oninput = function() {
//     speed = this.value;
// }

function updateChartColor(color, index, delay) {
    setTimeout(function() {
        dataset.backgroundColor[index] = color;
        chart.update();
    }, delay);
}

function compare(i, j) {
    setTimeout(function() {
        if(dataset.data[j] > dataset.data[j+1]) {
            let temp = dataset.data[j];
            dataset.data[j] = dataset.data[j+1];
            dataset.data[j+1] = temp;
            updateChartColor('red', j, 0);
            updateChartColor('red', j+1, 0);
        }
        else {
            updateChartColor('green', j, 0);
            updateChartColor('green', j+1, 0);
        }
        chart.update();
        // console output for testing
        //console.log('In Compare Function');
    }, 1000 / speed);
}

function toloop(i, j) {
    setTimeout(function () {
        updateChartColor('black', j, 0);
        updateChartColor('black', j+1, 0);
        compare(i, j);
        updateChartColor('blue', j, 2000 / speed);    
        updateChartColor('blue', j+1, 2000 / speed)
        // console output for testing
        //console.log("In Inside Loop" + j);
        if(++j < n-i-1)
            toloop(i, j);
    }, 3000 / speed);
}

function loop(i) {
    setTimeout(function () {
        // console output for testing 
        //console.log("In Outside Loop: " + i);
        toloop(i, 0);
        // update the color of already sorted bar
        updateChartColor('purple', n-i-1, (3000 * (n - i)) / speed);
        if(i == n-2)
            updateChartColor('purple', 0, (3000 * (n - i)) / speed);
        if(++i < n-1)
            loop(i)
    }, (i == 0)? 0: (3000 * (n - i)) / speed);
}

function generateRandom() {
    for (let i = 0; i < 50; i++) {
        dataset.backgroundColor.push('blue');
        chart.data.labels.push('A[0]');
        dataset.data.push(Math.floor(Math.random() * 150));
    }
    chart.update();
    n = dataset.data.length;
}

function BubbleSort() {
    loop(0);
}

function MergeSort() {
    mergeSort(0, dataset.data.length - 1);
}
