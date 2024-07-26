import React from 'react';
import './index.scss';
const { useEffect, useState } = React;

export default function ChatAi(props) {
    return (
        <div className='ChatAi'>
            <div className='ai-say'>AI说的话</div>
        </div>
    )
}