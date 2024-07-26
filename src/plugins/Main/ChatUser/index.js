import React from 'react';
import './index.scss';
const { useEffect, useState } = React;

export default function ChatUser(props) {
    return (
        <div className='ChatUser'>
            <div className='user-say'>我想说的话</div>
        </div>
    )
}