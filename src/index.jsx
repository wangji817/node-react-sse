import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);

// 装载
ReactDOM.createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
// 卸载
// ReactDOM.createRoot(document.querySelector('#root')).unmount();