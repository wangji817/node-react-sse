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
        scrollBottom,
    } = globalActions;
    const {
        data = {}
    } = props.data || {};

    //md流式输出回调方法
    const mdCallback = () => {
    }

    useEffect(() => {
        !isChat && scrollBottom();
    }, [isChat])

    return (
        <div className='ChatAi text-left'>
            <div className='ai-say mt-12 w-full inline-block p-12 bg-white max-w-available rounded-[.667rem] text-[1.067rem] font-medium leading-normal'>
                <MarkdownStream source={data?.result || ""} callback={mdCallback} />
            </div>
        </div>
    )
}