const insertionSort = async(arr) => {
    let i, j, key;
    for (i = 1; i < arr.length; i++) {
        key = arr[i].val;
        j = i - 1;

        while (j >= 0 && arr[j].val > key) {
            focusSelectionBars([arr[i], arr[j]], 'orange');
            await timeout(waitTime);
            comparisons++;

            arr[j + 1].val = arr[j].val;

            drawDoneBars(i);

            j--;
        }
        arr[j + 1].val = key;
        drawDoneBars(i);
    }
}