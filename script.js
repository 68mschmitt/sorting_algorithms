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
let waitTime = 1000;
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
    waitTime /= array.length;
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

function focusBars(array) {
    for (let i = 0; i < array.length; i++) {
        let targetBar = document.querySelector('#ind' + array[i].ind);
        targetBar.style.background = 'orange';
    }
    setComparisons();
}

function swapBars(array) {
    for (let i = 0; i < array.length; i++) {
        let targetBar = document.querySelector('#ind' + array[i].ind);
        targetBar.style.background = 'green';
        targetBar.style.height = array[i].val + 'px';
    }
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
            await mergeSort(array);
            break;
        default:
            console.log('Another sorting algorithm');
    }
    document.getElementById('randomSample').disabled = false;
    document.getElementById('sortingAlgorithmsDropDown').disabled = false;
}

const mergeSort = async (array) => {
    if (array.length < 2) {
        return array;
    }
    let mid = array.length >> 1;
    let left = await mergeSort(array.slice(0, mid));
    let right = await mergeSort(array.slice(mid, array.length));
    await timeout(waitTime);
    let result = await mergeTwoArrays(left, right);
    await timeout(waitTime);
    swapBars(result);
    return result;
}
function mergeTwoArrays(left, right) {
    focusBars([...left, ...right]);
    let array = [];
    let i = 0, j = 0, k = left[0].ind;
    while (i < left.length && j < right.length) {
        if (left[i].val < right[j].val) {
            array.push({ val: left[i].val, ind: k});
            i++;
        } else {
            array.push({ val: right[j].val, ind: k})
            j++;
        }
        k++;
        comparisons++;
    }

    while (i < left.length) {
        array.push({ val: left[i].val, ind: k});
        i++;
        k++;
    }
    while (j < right.length) {
        array.push({ val: right[j].val, ind: k});
        j++;
        k++;
    }
    return array;
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
