import React from 'react';
import './index.scss';
const { useEffect, useState } = React;
import useStore from '../../store';/**状态管理入口文件 */
import ChatUser from './ChatUser';
import ChatAi from './ChatAi';

export default function Main(props) {
    const [globalState, globalActions] = useStore();
    const {
        height,
        marginTop,
        AiList,
    } = globalState;

    const {
        getCurrHeight,
        winResize,
    } = globalActions;

    useEffect(() => {
        winResize();
        getCurrHeight();
    }, []);

    return (
        <div className="Main" style={{ height: height, marginTop: marginTop }}>
            {
                AiList.map((item, index) => {
                    if (item.aiType === "user") {
                        return (
                            <ChatUser data={item} />
                        )
                    } else if (item.aiType === "chatAi") {
                        return (
                            <ChatAi data={item} />
                        )
                    }
                })
            }
        </div>
    )
}