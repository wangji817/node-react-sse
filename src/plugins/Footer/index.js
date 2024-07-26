import React from 'react';
import './index.scss';
const { useEffect, useState, useRef } = React;

export default function Footer(props) {
    const textareaRef = useRef();
    return (
        <div className="Footer">
            <textarea className="textarea" ref={textareaRef} rows="auto" placeholder="有问题尽管问我" ></textarea>
            <button className="btn">
                <img src="https://cdn1.cmread.com/ues/4a/552708090d6392da981710eecd0f0c72404a/pic.jpg" className="btn-img" />
            </button>
        </div>
    )
}