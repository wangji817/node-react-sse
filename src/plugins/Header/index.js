import React from 'react';
import './index.scss';
const { useEffect, useState } = React;

export default function Header(props) {
    const {
        title,
        avatarUrl,
    } = props.data || {};
    return (
        <div className="Header">
            <div className='header-bg'>
                <div className='wel-text'>{title}</div>
                <img className="avatar-img" src={avatarUrl} />
            </div>
        </div>
    )
}