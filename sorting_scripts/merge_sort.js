const mergeSort = async(array) => {
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
    let i = 0,
        j = 0,
        k = left[0].ind;
    while (i < left.length && j < right.length) {
        if (left[i].val < right[j].val) {
            array.push({ val: left[i].val, ind: k });
            i++;
        } else {
            array.push({ val: right[j].val, ind: k })
            j++;
        }
        k++;
        comparisons++;
    }

    while (i < left.length) {
        array.push({ val: left[i].val, ind: k });
        i++;
        k++;
    }
    while (j < right.length) {
        array.push({ val: right[j].val, ind: k });
        j++;
        k++;
    }
    return array;
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
        targetBar.style.background = 'white';
        targetBar.style.height = array[i].val + 'px';
    }
}