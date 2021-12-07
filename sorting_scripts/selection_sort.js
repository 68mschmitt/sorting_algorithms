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