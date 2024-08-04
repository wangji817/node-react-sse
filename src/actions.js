import {
    debugFlag,
} from '../src/util/common';
export default {
    setUser: (store, userData, callback) => {
        const { AiList = [] } = store.state;
        store.actions.setList([...AiList, {
            aiType: "user",
            data: userData
        }], callback);
    },
    setAiChat: (store, aiChatData, callback) => {
        const { AiList = [] } = store.state;
        store.actions.setList([...AiList, {
            aiType: "chatAi",
            data: aiChatData
        }], callback);
    },
    setLastAiChat: (store, aiChatData, callback) => {
        const { AiList = [] } = store.state;
        let _AiList = AiList;
        _AiList[_AiList.length - 1] = {
            aiType: "chatAi",
            data: aiChatData
        };
        store.actions.setList(_AiList, callback);
    },
    getAiList: (store) => {
        const { AiList = [] } = store.state;
        return AiList;
    },
    /**获取流式数据 */
    getChat: (store, question, callback) => {
        const url = `/apis/chat?question=${question}`;//当前接口地址
        const eventSource = new EventSource(url);
        eventSource.addEventListener('ReceiveQuestion', (event) => {
            debugFlag && console.log('Custom Event:', event.data, typeof event.data);
            try {
                const data = JSON.parse(event.data);
                callback && callback({ aiType: "chatAi", eventType: "ReceiveQuestion", data })
            } catch (error) {
                const data = {
                    "msg": "成功",
                    "code": "00000",
                    "data": {
                        "chatId": "1e0c97022b954e3a93398b86ff6bb704", "isEnd": 0, "content": "你的问题已收到"
                    },
                    "chatId": "1e0c97022b954e3a93398b86ff6bb704",
                    "action": "state",
                    "isEnd": 0
                }
                callback && callback({ aiType: "chatAi", eventType: "ReceiveQuestion", data })
            }
        });
        eventSource.addEventListener('AnalysisQuestion', (event) => {
            debugFlag && console.log('Custom Event:', event.data, typeof event.data);
            try {
                const data = JSON.parse(event.data);
                callback && callback({ aiType: "chatAi", eventType: "AnalysisQuestion", data })
            } catch (error) {
                const data = {
                    "msg": "成功",
                    "code": "00000",
                    "data": {
                        "chatId": "6b0efc7b9b4e4165b6c96d58c58f1617", "isEnd": 0, "content": "分析完成"
                    },
                    "chatId": "6b0efc7b9b4e4165b6c96d58c58f1617",
                    "action": "state",
                    "isEnd": 0
                }
                callback && callback({ aiType: "chatAi", eventType: "AnalysisQuestion", data })
            }
        });
        eventSource.addEventListener('message', (event) => {
            debugFlag && console.log('Custom Event:', event.data, typeof event.data);
            try {
                const data = JSON.parse(event.data);
                callback && callback({ aiType: "chatAi", eventType: "message", data })
                if (data && data.data && data.data.isEnd === 1) {
                    eventSource.close();
                }
            } catch (error) {
                callback && callback({ aiType: "chatAi", eventType: "message", data: {} })
                eventSource.close();
            }
        });
    },
    /**获取可视内容高度和上间距 */
    getCurrHeight: (store) => {
        const Header = document.querySelector(".Header");
        const Footer = document.querySelector(".Footer");
        const winH = window.innerHeight || window.outerHeight;
        store.actions.setHeight(winH - Header.offsetHeight - Footer.offsetHeight);
        store.actions.setMarginTop(Header.offsetHeight);
    },
    /**窗口尺寸变化监听，重设内容高度 */
    winResize: (store) => {
        window.onresize = () => {
            store.actions.getCurrHeight();
        }
    },
    /**设置高度 */
    setHeight: (store, height) => {
        store.setState({ height })
    },/**设置上间距 */
    setMarginTop: (store, marginTop) => {
        store.setState({ marginTop })
    },
    setList: (store, AiList, callback) => {
        store.setState({ AiList }, callback);
    },
    setIsChat: (store, isChat) => {
        store.setState({ isChat });
    },
    setAiListRef: (store, aiListRef) => {
        store.setState({ aiListRef });
    },
    setWatchScroll: (store, watchScroll) => {
        store.setState({ watchScroll });
    },
    scrollBottom: (store) => {
        const {
            aiListRef,
            watchScroll,
        } = store.state;
        if (aiListRef.current && watchScroll) {
            aiListRef.current.scrollTo(0, aiListRef.current.scrollHeight);
        }
    },
    scrollToBottom: (store) => {
        const { aiListRef } = store.state;
        aiListRef?.current && aiListRef.current.scrollTo(0, aiListRef.current.scrollHeight);
    },
    //取消默认事件
    preventDefault: (store, e, callback) => {
        e && e.preventDefault();
        callback && callback();
    },
    //点击书籍触发事件，有多种场景，1、书封是讲书，2、内容是详情页跳转
    clickBook: (store, type = "", book = {}) => {
        console.log(type, book)
    },
    showScroll: (store, showScroll) => {
        store.setState({ showScroll });
    },
}