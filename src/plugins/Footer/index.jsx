import React from 'react';
import './index.scss';
const { useEffect, useState, useRef } = React;
import { message } from 'antd';
import useStore from '../../store';/**状态管理入口文件 */

export default function Footer(props) {
    const [globalState, globalActions] = useStore();

    const {
        isChat,
    } = globalState;
    const {
        getChat,
        setUser,
        setAiChat,
        setIsChat,
        setLastAiChat,
        setWatchScroll,
        scrollBottom,
    } = globalActions;

    const textareaRef = useRef();

    const addResult = (data = {}, lastData = {}) => {
        const result = (lastData?.result || "") + (data?.result || "");
        let obj = Object.assign({}, data, lastData)
        obj.result = result;
        obj.is_end = data.is_end;
        return obj;
    }

    const sendMsg = () => {
        if (isChat) {
            message.info('正在生成中，请稍后');
            return
        }
        const msg = textareaRef?.current?.value || "";
        if (msg) {
            setUser({ msg }, () => {
                textareaRef.current.value = "";
                let aiData = null;
                window.currentChunk = 0;
                setWatchScroll(true);
                scrollBottom();
                getChat(msg, (result) => {
                    if (result) {
                        console.log(result, aiData)
                        const { aiType = "", eventType, data } = result;
                        switch (eventType) {
                            case "ReceiveQuestion":
                                setIsChat(true);
                                setAiChat(data);
                                break;
                            case "AnalysisQuestion":
                                setAiChat(data);
                                break;
                            case "message":
                                if (!aiData) {
                                    aiData = data;
                                    setAiChat(data);
                                } else {
                                    aiData = addResult(data, aiData)
                                    setLastAiChat(aiData);
                                }
                                data?.is_end && setIsChat(false);
                                break;
                            default:
                                break;
                        }
                    } else {
                        setAiChat({
                            result: "我还没有学好这个技能"
                        })
                        setIsChat(false);
                    }
                });
            });
        } else {
            console.log("未输入内容")
        }
    }
    return (
        <div className="Footer bg-yellow-600 fixed bottom-0 w-full h-75  z-10">
            <div className='px-16 flex'>
                <textarea className="textarea h-24 mt-12 px-16 mx-auto py-8 rounded-full flex-1 flex items-center text-16 font-medium leading-normal relative text-[#1f1f1f]" ref={textareaRef} rows="auto" placeholder="有问题尽管问我"
                    onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            e.preventDefault()
                        }
                        e.persist();
                        setTimeout(() => {
                            if (e.key == "Enter") {
                                sendMsg()
                            }
                        }, 100);
                    }}
                ></textarea>
            </div>
            <button className="btn absolute w-34 h-34 top-15 right-19 rounded-full bg-06A7FF z-9" onClick={sendMsg} >
                <img src="https://cdn1.cmread.com/ues/4a/552708090d6392da981710eecd0f0c72404a/pic.jpg" className="btn-img w-22 h-22 mx-auto" />
            </button>
        </div>
    )
}