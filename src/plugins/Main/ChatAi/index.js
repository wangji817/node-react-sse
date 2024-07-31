import React from 'react';
import './index.scss';
import MarkdownStream from '@plugins/MarkdownStream';
import { Image } from 'antd';
const { useEffect, useState } = React;
import useStore from '../../../store';/**状态管理入口文件 */

export default function ChatAi(props) {
    const [globalState, globalActions] = useStore();
    const {
        isChat
    } = globalState;
    const {
        clickBook,
        preventDefault,
    } = globalActions;
    const {
        data = {}
    } = props.data || {};

    const {
        data: chatData,
    } = data;

    const {
        imageUrl = "",
        resourceUrl = "",
        isEnd = 0,
        books = [],
    } = chatData;

    //md流式输出回调方法
    const mdCallback = () => {
    }

    return (
        <div className='ChatAi text-left'>
            <div className='ai-say mt-12 w-auto inline-block p-12 bg-white max-w-available rounded-[.667rem] text-[1.067rem] font-medium leading-normal'>
                <MarkdownStream source={chatData?.content || ""} callback={mdCallback} />
            </div>
            {
                isEnd === 1 && !isChat && <div className='ai-info mt-12 rounded-[.667rem] overflow-hidden'>
                    {
                        imageUrl && <img onClick={(e) => {
                            resourceUrl && (location.href = resourceUrl);
                        }} width={"100%"} src={imageUrl} />
                    }
                    {
                        books && books.length > 0 && <div className='book-list bg-white p-12'>
                            {
                                books.map((item, index) => {
                                    const { bookName, bookCover, authorName = "", paperBookId, awardList = [], rankingList = [], categoryList = [] } = item;
                                    const isBuyBook = paperBookId && paperBookId != '-1';
                                    return (
                                        <div className='book-item flex p-6 bg-slate-200 rounded-[.534rem]' key={`book${index}`}>
                                            <div className='book-cover w-52 h-68' onClick={(e) => {
                                                preventDefault(e, clickBook)
                                            }}>
                                                <img className='bk-img w-52 h-68' src={bookCover} />
                                            </div>
                                            <div className='book-info flex-1 overflow-hidden ml-10' onClick={(e) => {
                                                preventDefault(e, clickBook)
                                            }}>
                                                <div className='book-name max-w-full truncate text-[1.067rem] mt-6'>{bookName}</div>
                                                <div className='book-author max-w-full truncate text-[.934rem] mt-8'>{isBuyBook ? `纸书` : `电子书`} · {authorName || "无名者"}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}