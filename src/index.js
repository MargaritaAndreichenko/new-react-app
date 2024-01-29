import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import styles from './index.module.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App className={styles.body}tab="home" />);