const recursiveBubbleSort = async (arr, n) => {
    if (n === 1) return;

    for (let i = 0; i < n - 1; i++) {
        focusSelectionBars([arr[i], arr[i + 1]], 'orange');
        await timeout(0);
        focusSelectionBars([arr[i], arr[i + 1]], 'red');
        comparisons++;
        if (arr[i].val > arr[i + 1].val) {
            const tmp = arr[i].val;
            arr[i].val = arr[i + 1].val;
            arr[i + 1].val = tmp;
        }
        reDrawBars(arr[i], arr[i + 1]);
        drawDoneBars(n - 1);
    }

    await recursiveBubbleSort(arr, n - 1);
}