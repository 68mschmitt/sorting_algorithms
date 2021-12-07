const recursiveInsertionSort = async (arr, n) => {
    if (n <= 1) return;

    await recursiveInsertionSort(arr, n - 1);

    let prev = arr[n - 1].val;
    let j = n - 2;

    while (j >= 0 && arr[j].val > prev) {
        focusSelectionBars([arr[j], arr[n - 1]], 'orange');
        await timeout(waitTime);
        focusSelectionBars([arr[j], arr[n - 1]], 'red');
        comparisons++;

        arr[j + 1].val = arr[j].val;

        reDrawBars(arr[j], arr[n - 1]);
        drawDoneBars(n - 1);

        j--;
    }
    arr[j + 1].val = prev;
}