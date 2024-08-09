const colors = ['red', 'green', 'blue'];

// Destructuring the array into variables
const [ , secondColor, thirdColor] = colors;


console.log(secondColor); // Output: 'green'
console.log(thirdColor); // Output: 'blue'

[firstColor, , thirdColor]=colors
console.log(firstColor); // Output: 'red'
console.log(thirdColor); // Output: 'blue'

//Destructuring Objects

const person={
  name: 'Alice',
  age: 30,
  job: 'Engineer'
}
const {name,age,job}=person;

console.log(name); // Output: 'Alice'
console.log(age);  // Output: 30
console.log(job);  // Output: 'Engineer'

//Renaming Variables:
let {name:personName,age:personAge,job:personJob}=person;

console.log(personName); // Output: 'Alice'
console.log(personAge);  // Output: 30
console.log(personJob);  // Output: 'Engineer'

person = {
  name: 'Alice',
  job: 'Engineer'
};

// Assign a default value for age
{ name, age = 25, job } = person;

console.log(name); // Output: 'Alice'
console.log(age);  // Output: 25
console.log(job);  // Output: 'Engineer'

//Function Parameters Destructuring
person={
  name: 'Alice',
  age: 30,
  job: 'Engineer'
}

function printPerson({name, age, job}){
  console.log(`Name:${name},Age:${age},job:${job};`)
}

printPerson(person);
// Output: 'Name: Alice, Age: 30, Job: Engineer'