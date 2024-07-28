
// Answer for question 1 and 3 

async function fetchData() {
   return response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
}

fetchData().then(response => {
    if (response.ok) return response.json();
    else {throw new Error("Network response was not ok.")};
})

.then(data => {
    console.log(data);
})

.catch(error => {
    console.log(error);
})
