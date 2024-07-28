import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

let end = 0;
let currentChunk = 0;
const MarkdownStream = ({ source }) => {
    const [currentMarkdown, setCurrentMarkdown] = useState('');
    useEffect(() => {
        const aiListDom = document.querySelector('.ai-list');
        if (aiListDom) {
            aiListDom.scrollTo(0, aiListDom.scrollHeight);
        }
    }, [currentMarkdown]);

    useEffect(() => {
        const timer = setInterval(() => {
            const end = currentChunk + 1;
            const md = source.substring(0, end);
            md && setCurrentMarkdown(md);
            currentChunk++;

            // 如果已经处理完毕，清除定时器
            if (currentChunk >= source.length) {
                clearInterval(timer);
            }
        }, 5 * 10); // 每毫秒处理一部分Markdown

        return () => clearInterval(timer);
    }, [source]);

    return <ReactMarkdown children={currentMarkdown} />;
};

export default MarkdownStream;