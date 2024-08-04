import React from 'react';
import './index.scss';
const { useEffect, useState, useRef } = React;
import useStore from '../../store';/**状态管理入口文件 */

export default function Scroller(props) {
    const [globalState, globalActions] = useStore();

    const {
        showScroll
    } = globalState;

    const {
        scrollToBottom
    } = globalActions;

    return (
        <div className="Scroller" style={{ display: showScroll ? "block" : "none" }} onClick={scrollToBottom}></div>
    )
}