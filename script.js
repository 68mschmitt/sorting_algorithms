var slider = document.getElementById("randomSample");
var output = document.getElementById("sampleSizeDisplay");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
  shuffle();
}

outerArray = [];
let waitTime = 1000;
shuffle();
function shuffle() {
    outerArray = get_random_array(slider.value);
    drawBars();
}

function drawBars() {
    const maxWidth = document.getElementsByTagName('div')[0].offsetWidth - 50;
    waitTime /= outerArray.length;
    order_bars(outerArray, 'red', (maxWidth / outerArray.length));
}

function get_random_array(size) {
    let arr = [];
    for (var i = 0; i < size; i++) {
        const val = { val: Math.round(Math.random() * 250), ind: i};
        if (!(val in arr)) arr.push(val);
    }
    return arr;
}

function addElements(sampleSize) {
    let arr = outerArray;
    if (sampleSize <= outerArray.length) {
        shuffle(sampleSize);
    } else {
        for (var i = outerArray.length; i < sampleSize; i++) {
            const val = { val: Math.round(Math.random() * 250), ind: i};
            if (!(val in arr)) arr.push(val);
        }
    }
}

function order_bars(array, color, barWidth) {
    document.getElementById('bars').innerHTML = '';
    let bars = [];
    let container = document.getElementById('bars');
    for (let i = 0; i < array.length; i++) {
        bars[i] = '<div id="ind' + array[i].ind + '" style="display: inline-block; width: ' + barWidth + 'px; height: ' + (array[i].val) + 'px; background-color: ' + color + ';"></div>';
    }
    container.innerHTML = bars.join('');
}

function focus_bars(array) {
    for (let i = 0; i < array.length; i++) {
        let targetBar = document.querySelector('#ind' + array[i].ind);
        targetBar.style.background = 'orange';
    }
}

function reset_grid() {
    document.querySelector('#bars').innerHTML = '';
}

function start_sort() {
    sort_array();
}

function sort_array() {
    merge_sort(outerArray);
}

function update_display(value) {
    document.getElementById('mergeArray').innerText = value;
}

function insert_bars(array) {
    for (let i = 0; i < array.length; i++) {
        let targetBar = document.querySelector('#ind' + array[i].ind);
        targetBar.style.background = 'green';
        targetBar.style.height = array[i].val + 'px';
    }
}

const merge_sort = async (array) => {
    if (array.length < 2) {
        return array;
    }
    let mid = array.length >> 1;
    let left = await merge_sort(array.slice(0, mid));
    let right = await merge_sort(array.slice(mid, array.length));
    await timeout(waitTime);
    let result = await merge(left, right);
    await timeout(waitTime);
    insert_bars(result);
    return result;
}
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function merge(left, right) {
    focus_bars([...left, ...right]);
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