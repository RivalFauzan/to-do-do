// index.js
import './style.css';
import { DomController } from './domController.js';

document.addEventListener('DOMContentLoaded', () => {
  const domController = new DomController();
  domController.init();
});