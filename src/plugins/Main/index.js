import React from 'react';
import './index.scss';
const { useEffect, useState, useRef } = React;
import useStore from '../../store';/**状态管理入口文件 */
import ChatUser from './ChatUser';
import ChatAi from './ChatAi';
import Scroller from '../Scroller';

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
        setAiListRef,
        setWatchScroll,
        showScroll,
    } = globalActions;

    const aiListRef = useRef();

    //监听dom的滚动事件
    const watchScroll = () => {
        let startX = 0, startY = 0, endX = 0, endY = 0, scrollTop = 0;
        let setWatchTimer = null;
        aiListRef.current.addEventListener("touchstart", (e) => {
            const {
                clientX = 0,
                clientY = 0,
            } = e?.changedTouches[0] || {};
            startX = clientX;
            startY = clientY;
            scrollTop = aiListRef?.current?.scrollTop || 0;
        })
        aiListRef.current.addEventListener("touchmove", (e) => {
            const {
                clientX = 0,
                clientY = 0,
            } = e?.changedTouches[0] || {};
            endX = clientX;
            endY = clientY;
            clearTimeout(setWatchTimer);
            setWatchTimer = setTimeout(() => {
                setWatchScroll(false);
            }, 1);
        })
        aiListRef.current.addEventListener("touchend", (e) => {
            if (Math.abs(startY - endY) >= 60) {//下拉超过多少，触发事件机制

            }
        })
        aiListRef.current.addEventListener("scroll", (e) => {
            const scrollHeight = e.target.scrollHeight;
            const clientHeight = e.target.clientHeight;
            const scrollTop = e.target.scrollTop;
            showScroll(scrollHeight - clientHeight - scrollTop >= 100);
        })
    }

    useEffect(() => {
        winResize();
        getCurrHeight();
        setAiListRef(aiListRef);
        watchScroll();
    }, []);

    return (
        <div className="Main fixed z-5 w-full" style={{ height: height, top: marginTop }}>
            <div className="ai-list px-16 pb-[10%] overflow-y-scroll h-[90%]" ref={aiListRef}>
                {
                    AiList.map((item, index) => {
                        if (item.aiType === "user") {
                            return (
                                <div className="dialog" key={`user${index}`}>
                                    <ChatUser data={item} />
                                </div>
                            )
                        } else if (item.aiType === "chatAi") {
                            return (
                                <div className="dialog" key={`chatAi${index}`}>
                                    <ChatAi data={item} />
                                </div>
                            )
                        }
                    })
                }
            </div>
            <Scroller />
        </div>
    )
}