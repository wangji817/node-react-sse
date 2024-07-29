import React from 'react';
import './index.scss';
const { useEffect, useState, useRef } = React;
import useStore from '../../store';/**状态管理入口文件 */

export default function Scroller(props) {
    const [globalState, globalActions] = useStore();

    const {
        setScrollerRef,
    } = globalActions;

    const scrollerRef = useRef();

    useEffect(() => {
        setScrollerRef(scrollerRef);
    }, [])
    return (
        <div className="Scroller" ref={scrollerRef}></div>
    )
}