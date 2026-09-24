import { appState } from './appLogic.js';
import { format, parseISO } from 'date-fns';

export class DomController {
    constructor() {
        // Cache DOM elements for later use
        this.projectsListEl = document.getElementById('project-list');
        this.todosListEl = document.getElementById('todo-list');
        this.activeProjectTitleEl = document.getElementById('active-project-title');

        // Modals & buttons
        this.btnNewProject = document.getElementById('btn-new-project');
        this.btnNewTodo = document.getElementById('btn-new-todo');
        this.modalProject = document.getElementById('modal-project');
        this.modalTodo = document.getElementById('modal-todo');
        this.modalDetail = document.getElementById('modal-detail');

        //forms
        this.formProject = document.getElementById('form-project');
        this.formTodo = document.getElementById('form-todo');

        this.initEventListeners();
    }

    init() {
        this.render();
    }

    // --- Core Render Orchestrator ---

    render() {
        this.renderProjects();
        this.renderTodos();
    }

    // --- Render Function ---

    renderProjects() {
        this.projectsListEl.innerHTML = '';
        const projects = appState.getProjects();
        const activeProject = appState.getActiveProject();

        projects.forEach(project => {
            const li = document.createElement('li');
            li.className = `Project-item  ${project.id === activeProject.id ? 'active' : ''}`;
            li.dataset.projectId = project.id;

            li.innerHTML = `
                <span class="project-name">${this.escapeHTML(project.name)}</span>
                <span class="project-count">${project.todos.length}</span>
                ${
                    project.length > 1
                        ? `<button class="btn-delete-project" data-id=${project.id} title="Delete Project">&times;</button>`
                        : ''
                }
            `;

            this.projectsListEl.appendChild(li);
        });
    }

    renderTodos() {
        this.todosListEl.innerHTML = '';
        const activeProject = appState.getActiveProject();

        this.activeProjectTitleEl.textContent = activeProject ? activeProject.name : 'Project';

        if (!activeProject || activeProject.todos.length === 0) {
            this.todosListEl.innerHTML = `<div class="empty-state">No TODOS here yet. Click "+ Add Task" to create one!</div>`;
            return;
        }

        activeProject.todos.forEach(todo => {
            const card = document.createElement('div');
            card.className = `todo-card priority-${todo.priority} ${todo.completed ? 'completed' : ''}`;
            card.dataset.todoId = todo.id;

            // Format date using date-fns
            let formatedDate = 'No date';
            if(todo.dueDate) {
                try {
                    formatedDate = format(parseISO(todo.dueDate), 'MMM dd, yyyy');
                } catch (e) {
                    formatedDate = todo.dueDate;
                }
            }

            card.innerHTML = `
                <div class="todo-left">
                    <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
                    <span class="todo-title">${this.escapeHTML(todo.title)}</span>
                </div>
                <div class-"todo-right">
                    <span class="todo-date">${formatedDate}</span>
                    <button class="btn-delete-todo" data-id="${todo.id}" title="Delete task">&times;</button>
                </div>
            `;

            this.todosListEl.appendChild(card);
        });
    }

    // --- Event Listeners Initialization ---

    initEventListeners() {
        //1. Switch Active Project or Delete Project (Event Delegation)
        this.projectsListEl.addEventListener('click', e => {
            if (e.target.classList.contains('btn-delete-project')) {
              e.stopPropagation();
              const id = e.target.dataset.id;
              if (confirm(`Are you sure want to delete this project and all its task?`)) {
                appState.deleteProject(id);
                this.render();
              }
              return;
            }
        });
        //2. Todo Interactions: Toggle Complete, Delete, or Expand Details
        this.todosListEl.addEventListener('click', e => {
            const todoId = e.target.dataset.id || e.target.closest('.todo-card')?.dataset.todoId;
            if (!todoId) return;

            // Toggle Complete
            if (e.target.classList.contains('todo-checkbox')) {
                appState.toggleTodoComplete(todoId);
                this.render();
                return;
            }

            // Delete Todo
            if (e.target.classList.contains('btn-delete-todo')) {
                e.stopPropagation();
                appState.deleteTodo(todoId);
                this.render();
                return;
            }

            // Open Expand / Detail Modal
            const todoCard = e.target.closest('.todo-card');
            if (todoCard && !e.target.classList.contains('todo-checbox')) {
                this.openDetailModal(todoId);
            }
        });

        // 3. Modal Triggers
        if (this.btnNewProject) {
            this.btnNewProject.addEventListener('click', () => this.modalProject.classList.add('open'));
        }
        if (this.btnNewTodo) {
            this.btnNewTodo.addEventListener('click', () => this.modalTodo.classList.add('open'));
        }

        // Modal Close Buttons (Handles any element with data-close="modal")
        document.addEventListener('click', e => {
            if (e.target.dataset.close === 'modal' || e.target.classList.contains("modal-backdrop")) {
                this.closeAllModals();
            }
        });

        // 4. Submit New Project Form
        if (this.formProject) {
            this.formProject.addEventListener('submit', e => {
                e.preventDefault();
                const input = document.getElementById('project-name-input');
                const name = input.value.trim();

                if(name) {
                    appState.addProject(name);
                    input.value = '';
                    this.closeAllModals();
                    this.render();
                }
            });
        }

        // 5. Submit New Todo Form
        if (this.formTodo) {
            this.formTodo.addEventListener('submit', e => {
                e.preventDefault();

                const title = document.getElementById('todo-title-input').value.trim();
                const description = document.getElementById('todo-desc-input').value.trim();
                const dueDate = document.getElementById('todo-date-input').value;
                const priority = document.getElementById('todo-priority-input').value;

                if (title) {
                    appState.addTodoToActiveProject({
                        title,
                        description,
                        dueDate,
                        priority
                    });

                    this.formTodo.reset();
                    this.closeAllModals();
                    this.render();
                }
            });
        }
    }

    // --- Detail Modal Helper ---

    openDetailModal(todoId) {
        const todo = appState.findTodoById(todoId);
        if (!todo) return;

        this.modalDetail.innerHTML = `
            <div class="modal-backdrop"></div>
            <div classs="modal-content">
                <button class="modal-close" data-close="modal">&times;</button>
                <h3>Edit Task</h3>
                <form id="form-edit-todo" data-id="${todo.id}">
                    <label>
                        Title
                        <input type="text" id="edit-title" value="${this.escapeHTML(todo.title)}" required>
                    </label>
                    <label>
                        Description
                        <textarea id="edit-desc">${this.escapeHTML(todo.description || '')}</textarea>
                    </label>
                    <div class="form-row">
                        <label>
                            Due Date
                            <input type="date" id="edit-date" value="${todo.dueDate || ''}">
                        </label>
                        <label>
                            Priority
                            <select id="edit-priority">
                                <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>low</option>
                                <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>Medium</option>
                                <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>High</option>
                            </select>
                        </label>
                    </div>
                    <button type="submit" class="btn-primary">Save Changes</button>
                </form>
            </div>            
        `;

        this.modalDetail.classList.add('open');

        // Wire up dynamic edit from submision 
        const formEdit = document.getElementById('form-edit-todo');
        formEdit.addEventListener('submit', e => {
            e.preventDefault();
            appState.updateTodo(todoId, {
                title: document.getElementById('edit-title').value.trim(),
                description: document.getElementById('edit-desc').value.trim(),
                dueDate: document.getElementById('edit-date').value,
                priority: document.getElementById('edit-priority').value,
            });

            this.closeAllModals();
            this.render();
        });
    }

    closeAllModals() {
        [this.modalProject, this.modalTodo, this.modalDetail].forEach(modal => {
            if (modal) modal.classList.remove('open');
        })
    }

    escapeHTML(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
    }
}
