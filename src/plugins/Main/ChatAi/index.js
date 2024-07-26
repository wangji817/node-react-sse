import React from 'react';
import './index.scss';
import useStore from '../../../store';
const { useEffect, useState } = React;

export default function ChatAi(props) {
    const [globalState, globalActions] = useStore();    
    return (
        <div className='ChatAi'>
            <div className='ai-say'>AI说的话</div>
        </div>
    )
}