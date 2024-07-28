document.querySelector("#start-btn").addEventListener('click', () => {
    let input = document.querySelector("#input-bar").value;
    document.querySelector("#input-bar").value = "";

    if(input < 0) alert("Please enter a positive number.")
    for (let i = input; i >= -1; --i) {
        setTimeout(() => {
            if (i >= 0) document.querySelector("#counter").innerHTML = i;
            if (i < 0) alert("Times up!");
        }, 1000 * (input - i))
    }
})
