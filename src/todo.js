class Todo {
    constructor({
        id = Date.now().toString(),
        title,
        description = '',
        dueDate = null,
        priority = 'low', // low, medium, high
        notes = '',
        checklist = [], // Array of objects : [{ text: 'item', completed: false }]
        completed = false,
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}