function fetchData(){
    return new Promise((resolve, reject) => {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then(response => {
            if(response.ok){
                response.json()
                .then(data =>{
                    resolve(data);}
                )
                .catch(error => {
                     reject("Parsing failed " + error);
                })
            }
            else{
                reject("Network response was not ok.");
            }
        })

        .catch(error => {
            reject("Fetching Failed " + error)})
    })
}

fetchData().then(data => console.log(data))
.catch(error => {console.log(error)})
