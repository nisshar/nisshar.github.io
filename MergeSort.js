function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function assign(a, b, res) {
    dataset.data[a] = res[b];
    chart.update();
    await sleep(100);
}

async function merge(low, mid, high) {
    result = [];
    i = low, j = mid + 1;
    while (i <= mid && j <= high) {
        if (dataset.data[i] <= dataset.data[j])
            result.push(dataset.data[i++]);
        else 
            result.push(dataset.data[j++]);
    }
    while (i <= mid) {
        result.push(dataset.data[i++]);
    }
    while (j <= high) {
        result.push(dataset.data[j++]);
    }
    for (i = low; i <= high; i++) {
        await assign(i, i - low, result);
    }
}

async function mergeSort(low, high) {
    if (low < high) {  
        const mid = Math.floor((low + high) / 2);
        await mergeSort(low, mid);
        await mergeSort(mid + 1, high);
        await merge(low, mid, high);
    }
}