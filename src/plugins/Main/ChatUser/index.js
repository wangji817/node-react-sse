import React from 'react';
import './index.scss';
const { useEffect, useState } = React;

export default function ChatUser(props) {
    const {
        data = {}
    } = props.data || {};

    const {
        msg = "我想说的话"
    } = data;

    return (
        <div className='ChatUser'>
            <div className='user-say'>{msg}</div>
        </div>
    )
}