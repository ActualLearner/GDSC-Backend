const employeesFile = 'employeesList';
let employeesList = JSON.parse(localStorage.getItem(employeesFile)) || [];


//This function searches for an employee's ID and returns the index of the employee in the employeesList array
//If the employee is not found, the function returns undefined
function findEmployee(id) {

    for (let i = 0; i < employeesList.length; i++) {

        if (Number(employeesList[i].id) == Number(id)) {
            return i;
        }

    }
    return null;
}

//Function lists all employees.
function listEmployees() {
    const tBody = document.getElementById("table-body");
    tBody.innerHTML = "";

    for (let i = 0; i < employeesList.length; i++) {
        let row = document.createElement("tr");
        row.innerHTML = `
                <td>${employeesList[i].id}</td>
                <td>${employeesList[i].name}</td>
                <td>${employeesList[i].position}</td>
                <td>${employeesList[i].department}</td>
        `
        tBody.appendChild(row);
    }
}

//Function for adding employees.
function addEmployee(id, name, position, department) {
    if (findEmployee(id)) { alert("Employee already exists. "); }
    else {
        const newEmployee = {
            "id": id,
            "name": name,
            "position": position,
            "department": department
        }

        employeesList.push(newEmployee);
        save();
    }
    listEmployees();
}

//Function for updating an employees information based on the employees id.
//Employee id cannot be updated.
function updateEmployee(id, newName, newPosition, newDepartment) {
    const i = findEmployee(id);

    if (i) {
        const newEmployee = {
            "id": id,
            "name": newName,
            "position": newPosition,
            "department": newDepartment
        }

        employeesList[i] = newEmployee;
    }
    else {
        alert("Employee does not exist.")
    }
    save();
    listEmployees();
}

//Function for deleting an employee.
function deleteEmployee(id) {

    if (findEmployee(id) != null) {
        employeesList = employeesList.filter((element) => { return element.id != id });
        save();
    }
    else {
        alert("Employee does not exist. ")
    }
    listEmployees();
}

//Function thar saves the employees list to localStorage, while removing duplicate objects.
function save() {
    const uniqueEmployees = [...new Set(employeesList.map(employee => JSON.stringify(employee)))].map(employee => JSON.parse(employee));
    employeesList = uniqueEmployees;
    localStorage.setItem(employeesFile, JSON.stringify(employeesList));
}


function main() {

    //Event listener for search button
    document.getElementById("search-bar-btn").addEventListener('click', () => {

        const input = document.getElementById("search-bar").value;
        const x = findEmployee(input);
        console.log(employeesList[x]);

        const tBody = document.getElementById("table-body");
        tBody.innerHTML = "";
        let row = document.createElement("tr");

        row.innerHTML = `
                <td>${employeesList[x].id}</td>
                <td>${employeesList[x].name}</td>
                <td>${employeesList[x].position}</td>
                <td>${employeesList[x].department}</td>
        `
        tBody.appendChild(row);
    })


    //Event listener for list all employees button
    document.getElementById("list-btn").addEventListener('click', () => {
        listEmployees();
    })

    //Event listener for add employee form submission
    document.getElementById("add-employee-form").addEventListener('submit', (e) => {
        e.preventDefault();

        let id = document.getElementById("add-id").value;
        let name = document.getElementById("add-name").value;
        let position = document.getElementById("add-position").value;
        let department = document.getElementById("add-department").value;

        addEmployee(id, name, position, department);
        listEmployees();
    })

    //Event listener for update employee form submission
    document.getElementById("update-employee-form").addEventListener('submit', (e) => {
        e.preventDefault();
        let id = document.getElementById("update-id").value;
        let newName = document.getElementById("update-name").value;
        let newPosition = document.getElementById("update-position").value;
        let newDepartment = document.getElementById("update-department").value;

        updateEmployee(id, newName, newPosition, newDepartment);

    })


    //Event listener for Delete 
    document.getElementById("delete-btn").addEventListener('click', () => {

        let id = document.getElementById("delete-id").value;
        deleteEmployee(id);
    })

}

main();