var slider = document.getElementById("randomSample");
var output = document.getElementById("sampleSizeDisplay");
output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = slider.value;
    document.getElementById('sortButton').disabled = false;
    shuffle();
}

function dropDownChange() {
    document.getElementById('sortButton').disabled = false;
    shuffle();
}

array = [];
let waitTime = 10;
let comparisons = 0;
shuffle();

function shuffle() {
    comparisons = 0;
    setComparisons();
    array = get_random_array(slider.value);
    initializeBars();
}

function setComparisons() {
    document.getElementById('comparisonsDisplay').innerHTML = comparisons;
}

function initializeBars() {
    const maxWidth = document.getElementsByTagName('div')[0].offsetWidth - 50;
    document.getElementById('bars').innerHTML = '';
    let bars = [];
    let container = document.getElementById('bars');
    for (let i = 0; i < array.length; i++) {
        bars[i] = '<div id="ind' + array[i].ind + '" style="display: inline-block; width: ' + (maxWidth / array.length) + 'px; height: ' + (array[i].val) + 'px; background-color: red;"></div>';
    }
    container.innerHTML = bars.join('');
}

function get_random_array(size) {
    let arr = [];
    for (var i = 0; i < size; i++) {
        const val = { val: Math.round(Math.random() * 250), ind: i};
        if (!(val in arr)) arr.push(val);
    }
    return arr;
}

function disableControls() {
    document.getElementById('sortButton').disabled = true;
    document.getElementById('randomSample').disabled = true;
    document.getElementById('sortingAlgorithmsDropDown').disabled = true;
}

function chooseSort() {
    const dropDown = document.getElementById('sortingAlgorithmsDropDown');
    sort(dropDown.value);
}

const sort = async (option) => {
    disableControls();
    switch (option) {
        case 'mergeSort':
            waitTime = 50;
            await mergeSort(array);
            break;
        case 'selectionSort':
            waitTime = 0;
            await selectionSort(array);
            break;
        default:
            console.log('Another sorting algorithm');
    }
    document.getElementById('randomSample').disabled = false;
    document.getElementById('sortingAlgorithmsDropDown').disabled = false;
    await showGreenProgression();
}

const showGreenProgression = async () => {
    for (let i = 0; i < array.length; i++) {
        let bar = document.querySelector('#ind' + array[i].ind);
        bar.style.background = 'red';
        await timeout(10);
        bar.style.background = 'green';
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}