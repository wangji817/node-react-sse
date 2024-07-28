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
    } = globalActions;

    const textareaRef = useRef();

    const getLastAiContent = (data = {}, lastData = {}) => {
        lastData.data.content += data?.data?.content || "";
        return lastData || data;
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
                getChat(msg, (result) => {
                    if (result) {
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
                                if (aiData) {
                                    aiData = getLastAiContent(data, aiData);
                                    setLastAiChat(aiData);
                                } else {
                                    aiData = data;
                                    setAiChat(data);
                                }
                                aiData?.data?.isEnd === 1 && setIsChat(false);
                                break;
                            default:
                                break;
                        }
                    } else {
                        setAiChat({
                            data: {
                                content: "我还没有学好这个技能"
                            }
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
        <div className="Footer">
            <textarea className="textarea" ref={textareaRef} rows="auto" placeholder="有问题尽管问我" ></textarea>
            <button className="btn" onClick={sendMsg} >
                <img src="https://cdn1.cmread.com/ues/4a/552708090d6392da981710eecd0f0c72404a/pic.jpg" className="btn-img" />
            </button>
        </div>
    )
}