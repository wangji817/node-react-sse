import React from 'react';
import './index.scss';
const { useEffect, useState } = React;

export default function Header(props) {
    const {
        title,
        avatarUrl,
    } = props.data || {};
    return (
        <div className="Header fixed w-full left-0 z-10 overflow-hidden h-165 top-0">
            <div className="header-bg h-165 flex items-center px-16 bg-cover bg-headbg bg-no-repeat">
                <div className='wel-text w-170 h-40 p-14 text-white items-center justify-center bg-contain bg-wel-text bg-no-repeat'>{title}</div>
                <img className="avatar-img w-225 h-225 absolute -right-30 top-0" src={avatarUrl} />
            </div>
        </div>
    )
}