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
        <div className='ChatUser text-right'>
            <div className='user-say mt-12 w-auto inline-block p-12 text-white bg-06A7FF rounded-[.667rem] text-[1.067rem] leading-normal font-medium text-left max-w-70%'>{msg}</div>
        </div>
    )
}