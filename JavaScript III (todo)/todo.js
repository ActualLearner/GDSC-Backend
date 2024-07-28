// Constructor function for TodoItem
function todoItem(description) {
    this.description = description;
    this.completed = false;
}

// Prototype method to toggle the completion status of a todo item
todoItem.prototype.toggleCompletion = function() {
    this.completed = !this.completed;
};

// Constructor function for TodoList
function todoList() {
    this.items = [];
}

// Prototype method to add a new item to the todo list
todoList.prototype.addItem = function(description) {
    var newItem = new todoItem(description);
    this.items.push(newItem);
};

// Prototype method to remove an item from the todo list
todoList.prototype.removeItem = function(index) {
    if (index >= 0 && index < this.items.length) {
        this.items.splice(index, 1);
    }
};

// Prototype method to render the todo list
todoList.prototype.renderAll = function() {
    console.log("Todo List:");
    this.items.forEach(function(item, index) {
        console.log((index+1) + ": " + item.description + (item.completed ? " (Completed)" : ""));
    });
};

// usage
var myTodoList = new todoList();
myTodoList.addItem('Learn JavaScript');
myTodoList.addItem('Build a Todo App');
myTodoList.renderAll();

console.log("Toggling completion of first item...");
myTodoList.items[0].toggleCompletion();
myTodoList.renderAll();

console.log("Removing the second item...");
myTodoList.removeItem(1);
myTodoList.renderAll();
