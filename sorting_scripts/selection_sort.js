const selectionSort = async (arr) => {
    size = arr.length;
    for (let i = 0; i < size; i++) {
        let min_i = i;
        for (let j = i + 1; j < size; j++) {
            focusSelectionBars([arr[j], arr[min_i]], 'orange');
            await timeout(0);
            focusSelectionBars([arr[j], arr[min_i]], 'red');
            if (arr[j].val < arr[min_i].val) min_i = j;
            comparisons++;
        }
        if (min_i !== i) {
            const tmp = arr[i].val;
            arr[i].val = arr[min_i].val;
            arr[min_i].val = tmp;
        }
        reDrawBars(arr[i], arr[min_i]);
        drawDoneBars(i);
    }
    return arr;
}

function focusSelectionBars(array, color) {
    for (let i = 0; i < array.length; i++) {
        let targetBar = document.querySelector('#ind' + array[i].ind);
        targetBar.style.background = color;
    }
    setComparisons();
}

function reDrawBars(doneBar, swappedBar) {
    let targetDoneBar = document.querySelector('#ind' + doneBar.ind);
    targetDoneBar.style.height = doneBar.val + 'px';

    let targetSwappedBar = document.querySelector('#ind' + swappedBar.ind);
    targetSwappedBar.style.height = swappedBar.val + 'px';
}

function drawDoneBars(currentIndex) {
    for (let i = 0; i <= currentIndex; i++) {
        let bar = document.querySelector('#ind' + array[i].ind);
        bar.style.background = 'white';
    }
}