const quickSort = async (arr, start, end) => {
    if (start < end) {
        let pi = await partition(arr, start, end);
        await quickSort(arr, start, pi - 1);
        await quickSort(arr, pi + 1, end);
    }
}

const partition = async (arr, start, end) => {
    let pivot_index = start;
    let pivot = arr[pivot_index].val;

    while (start < end) {
        while (start < arr.length && arr[start].val <= pivot) {
            const chg = [arr[start], arr[pivot_index]];
            focusSelectionBars(chg, 'orange');
            await timeout(waitTime);
            focusSelectionBars(chg, 'white');
            reDrawBars(chg[0], chg[1]);
            comparisons++;
            start++;
        }
        while (arr[end].val > pivot) { 
            const chg = [arr[end], arr[pivot_index]];
            focusSelectionBars(chg, 'orange');
            await timeout(waitTime);
            focusSelectionBars(chg, 'white');
            reDrawBars(chg[0], chg[1]);
            comparisons++;
            end--;
        }

        if (start < end) {
            const chg = [arr[start], arr[end]];
            focusSelectionBars(chg, 'orange');
            await timeout(waitTime);
            focusSelectionBars(chg, 'white');
            comparisons++;
            const tmp = arr[start].val;
            arr[start].val = arr[end].val;
            arr[end].val = tmp;
            reDrawBars(chg[0], chg[1]);
        }
    }

    const chg = [arr[pivot_index], arr[end]];
    focusSelectionBars(chg, 'orange');
    await timeout(waitTime);
    const tmp = arr[pivot_index].val;
    arr[pivot_index].val = arr[end].val;
    arr[end].val = tmp;
    focusSelectionBars(chg, 'white');
    reDrawBars(chg[0], chg[1]);

    return end;
}