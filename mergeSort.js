function merge(arr1, arr2){
    let sorted = []
    let i = 0
    let j = 0
    while(i < arr1.length && j < arr2.length){
        if(arr1[i] < arr2[j]){
            sorted.push(arr1[i])
            i++
        }else{
            sorted.push(arr2[j])
            j++
        }
    }
    for(; i < arr1.length; i++){
        sorted.push(arr1[i])
    }
    for(; j< arr2.length; j++){
        sorted.push(arr2[j])
    }
    return sorted
}
function mergeSort(array){
    if(array.length > 1){
        let mid = parseInt(array.length / 2)
        let leftPart = mergeSort(array.slice(0, mid))
        let rightPart = mergeSort(array.slice(mid, array.length))
        let merged = merge(leftPart, rightPart)
        return merged
    }else{
        return array
    }
}

function removeDuplicates(array){
    return array.filter((num, index)=> array.indexOf(num) === index)
}

function RDMergeSort(array){
    let sort = mergeSort(array)
    return removeDuplicates(sort)
}

export { RDMergeSort }

