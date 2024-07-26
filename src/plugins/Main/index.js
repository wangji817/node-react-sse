import React from 'react';
import './index.scss';
import ChatUser from './ChatUser';
import ChatAi from './ChatAi';
const { useEffect, useState } = React;

export default function Main(props) {
    const [height, setHeight] = useState(0);
    const [marginTop, setMarginTop] = useState(0);

    /**动态计算当前可视高度-头部和底部的高度等于当前内容展示高度 */
    const getCurrHeight = () => {
        const Header = document.querySelector(".Header");
        const Footer = document.querySelector(".Footer");
        const winH = window.innerHeight || window.outerHeight;
        setHeight(winH - Header.offsetHeight - Footer.offsetHeight);
        setMarginTop(Header.offsetHeight);
    }

    /**窗口发生变化时，重新计算内容区域 */
    const winResize = () => {
        window.onresize = () => {
            getCurrHeight();
        }
    }

    const getChat = (question) => {
        const url = `/chat?question=${question}`;//当前接口地址
        const eventSource = new EventSource(url);
        eventSource.addEventListener('ReceiveQuestion', (event) => {
            console.log('Custom Event:', event.data);
        });
        eventSource.addEventListener('AnalysisQuestion', (event) => {
            console.log('Custom Event:', event.data);
        });
        eventSource.addEventListener('message', (event) => {
            console.log('Custom Event:', event.data, typeof event.data);
            try {
                const data = JSON.parse(event.data);
                if (data && data.data && data.data.isEnd === 1) {
                    eventSource.close();
                }
            } catch (error) {
                eventSource.close();
            }
        });
    }

    useEffect(() => {
        getCurrHeight();
        winResize();
        getChat("你好");
    }, []);


    return (
        <div className="Main" style={{ height, marginTop }}>
            <ChatUser />
            <ChatAi />
        </div>
    )
}