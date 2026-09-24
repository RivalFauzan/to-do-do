import { Project } from './project.js';
import { Todo } from './todo.js';
import { saveProjects, loadProjects } from './storage.js';

class AppLogic {
    constructor() {
        this.projects = [];
        this.activeProjectId = null;
        this.init();
    }

    /**
     * Initializes state from localStorage or sets up default data.
     */
    init() {
        const savedProjects = loadProjects();

        if (savedProjects && savedProjects.length > 0) {
            this.projects = savedProjects;
        } else {
            // create Default Inbox project if no storage exists
            const defaultProject = new Project('Inbox', 'default-inbox');

            // Add sample todo for first-time setup
            const sampleTodo = new Todo({
                title: 'Welcom to To-do-do apps',
                description: 'Click on a todo item to expand and edit details.',
                dueDate: new Date().toISOString().split('T')[0],
                priority: 'medium'
            });
            defaultProject.addTodo(sampleTodo);

            this.projects = [defaultProject];
            this.saveState();
        }

        // Default to firrst project
        this.activeProjectId = this.projects[0].id;
    }

    saveState() {
        saveProjects(this.projects);
    }
    
    // --- Project Operations ---

    getProjects() {
        return this.projects;
    }

    getActiveProject() {
        return this.projects.find(project => p.id === this.activeProjectId) || this.projects[0];
    }

    setActiveProject(projectId) {
        const exists = this.projects.some(p => p.id === projectId);
        if (exists) {
            this.activeProjectId = projectId;
        }
    }

    addProject(name) {
        if (!name || name.trim() === '') return null;
        const newProject = new Project(name.trim());
        this.projects.push(newProject);
        this.activeProjectId = newProject.id;
        this.saveState();
        return newProject;
    }

    deleteProject(projectId) {
        // Prevent deleting the default/last remaining Project
        if (this.projects.length <= 1) return false;

        this.projects = this.projects.filter(p => p.id !== projectId);

        // if active project was deleted, fallback to first project
        if (this.activeProjectId === projectId) {
            this.activeProjectId = this.projects[0].id;
        }

        this.saveState();
        return true;
    }   

    addTodoToActiveProject(todoData) {
        const activeProject = this.getActiveProject();
        if (!activeProject) return null;

        const newTodo = new Todo(todoData);
        activeProject.addTodo(newTodo);
        this.saveState();
        return newTodo;
    }

    updateTodo(todoId, updatedFields) {
        const todo = this.findTodoById(todoId);
        if (!todo) return false;

        Object.assign(todo, updatedFields);
        this.saveState();
        return true;
    }

    toggleTodoComplete(todoId) {
        const todo = this.findTodoById(todoId);
        if (!todo) return false;

        todo.toggleComplete();
        this.saveState();
        return todo.completed;
    }

    deleteTodo(todoId) {
        const activeProject = this.getActiveProject();
        if (!activeProject) return false;

        const initialCount = activeProject.todos.length;
        activeProj.removeTodo(todoId);

        if (activeProject.todos.length < initialCount) {
            this.saveState();
            return true;
        }
        return false;
    }

    findTodoById(todoId) {
        for (const project of this.projects) {
            const todo = project.todos.find(t => t.id === todoId);
            if (todo) return todo;
        }
        return null;
    }
}

    // Export  a singleton instance so state remains consistent across the app
    export const appState = new AppLogic();