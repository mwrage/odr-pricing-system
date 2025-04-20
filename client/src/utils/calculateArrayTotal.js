export function calculateArrayTotal (array) {
    let temp = 0;
        for (let i = 0; i < array.length; i++) {
            temp += array[i];
        }
    return temp
}