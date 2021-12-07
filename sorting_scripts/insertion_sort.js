const insertionSort = async (arr) => {
    console.log(arr);
    let i, j, key;
    for (i = 1; i < arr.length; i++) {
        key = arr[i].val;
        j = i - 1;

        while (j >= 0 && arr[j].val > key) {
            focusSelectionBars([arr[i], arr[j]], 'orange');
            await timeout(waitTime);
            focusSelectionBars([arr[i], arr[j]], 'red');
            comparisons++;

            arr[j + 1].val = arr[j].val;

            reDrawBars(arr[i], arr[j]);
            drawDoneBars(i);

            j = j - 1;
        }
        arr[j + 1].val = key;
    }
}