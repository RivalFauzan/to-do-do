import { Todo } from './todo.js';
import { Project } from './project.js';

const STORAGE_KEY = 'odin_todo_app_data';

/**
 * Saves current projects array to localStorage.
 * @param {Array<Project>} projects 
 */
export function saveProjects(projects) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
        console.error('Error saving projects to localStorage:', error);
    }
}

/**
 * Retrieves projects from localStorage and rehydrates plain objects back into Class instances.
 * Returns null if no data exists.
 * @returns {Array<Project>|null}
 */
export function loadProjects() {
    try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) return null;
    
    const rawProjects = JSON.parse(rawData);

    // Reconstruct Project and Todo class instances from plain objects
    return rawProjects.map(projData => {
        const project = new Project(projData.name, projData.id);
        project.todos = (projData.todos || []).map(todoData => {
            return new Todo({
                id : todoData.id,
                title : todoData.title,
                description : todoData.description,
                dueDate : todoData.dueDate,
                priority : todoData.priority,
                notes : todoData.notes,
                checklist : todoData.checklist,
                completed : todoData.completed
            });
        });
        return project;
    });
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
    return null;
  }
}