
const numbers = [];

// generate array elements
for (let i = 1; i <= 100; i++) {
    if (i === 59) {
        numbers.push('');
    } else {
        numbers.push(i);
    }


}
console.log(numbers);


// found missing number 
// const numbers = [...hereIsImagineArray]
for (let i = 1; i <= 100; i++) {
    const findItem = numbers.find((innerItem, index) => innerItem === i)
    if (!findItem) {
        console.log('Missing Number is', i);
    }

}