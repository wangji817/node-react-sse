import React from 'react';
import './index.scss';
import aiPng from './ai.jpg'
const { useEffect, useState } = React;

export default function Header(props) {
    return (
        <div className="Header w-full z-10 overflow-hidden top-0">
            <div className="header-bg max-h-200 flex items-center">
                <img className="avatar-img w-full" src={aiPng} />
            </div>
        </div>
    )
}