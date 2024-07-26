import React from 'react';
import './index.scss';
const { useEffect, useState } = React;
import useStore from './store';/**状态管理入口文件 */
import ChatUser from './ChatUser';
import ChatAi from './ChatAi';

export default function Main(props) {
    const [globalState, globalActions] = useStore();
    const {
        height,
        marginTop,
        list,
    } = globalState;

    const {
        getCurrHeight,
        winResize,
        getChat,        
        setList,
    } = globalActions;


    useEffect(() => {
        setTimeout(() => {
            winResize();
            getCurrHeight();
            setList(["1111","21111","31111","41111"])
        }, 1500);
        // getChat("你好");
    }, []);

    return (
        <div className="Main" style={{ height: height, marginTop: marginTop }}>
            <ChatUser />
            <ChatAi />
            <div className='list'>
                {
                    list.map((item,index) => (
                        <div className='item' key={`item${index}`}>{item}</div>
                    ))
                }
            </div>
        </div>
    )
}