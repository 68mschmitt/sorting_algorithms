const bubbleSort = async (arr) => {
    for(let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            focusSelectionBars([arr[i], arr[j]], 'orange');
            await timeout(0);
            focusSelectionBars([arr[i], arr[j]], 'red');
            comparisons++;
            if (arr[i].val < arr[j].val) {
                const tmp = arr[i].val;
                arr[i].val = arr[j].val;
                arr[j].val = tmp
            }
            reDrawBars(arr[i], arr[j]);
            drawDoneBars(i);
        }
    }
    return arr;
}