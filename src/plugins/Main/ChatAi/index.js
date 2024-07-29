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
        <div className='ChatAi'>
            <div className='ai-say'>
                <MarkdownStream source={chatData?.content || ""} callback={mdCallback} />
            </div>
            {
                isEnd === 1 && !isChat && <div className='ai-info'>
                    {
                        imageUrl && <Image onClick={(e) => {
                            resourceUrl && (location.href = resourceUrl);
                        }} width={"100%"} preview={false} src={imageUrl} />
                    }
                    {
                        books && books.length > 0 && <div className='book-list'>
                            {
                                books.map((item, index) => {
                                    const { bookName, bookCover, authorName = "", paperBookId, awardList = [], rankingList = [], categoryList = [] } = item;
                                    const isBuyBook = paperBookId && paperBookId != '-1';
                                    return (
                                        <div className='book-item' key={`book${index}`}>
                                            <div className='book-cover' onClick={(e) => {
                                                preventDefault(e, clickBook)
                                            }}>
                                                <Image className='bk-img' preview={false} src={bookCover} />
                                            </div>
                                            <div className='book-info' onClick={(e) => {
                                                preventDefault(e, clickBook)
                                            }}>
                                                <div className='book-name'>{bookName}</div>
                                                <div className='book-author'>{isBuyBook ? `纸书` : `电子书`} · {authorName || "无名者"}</div>
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