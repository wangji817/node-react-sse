import React from 'react';
import './index.scss';
import MarkdownStream from '@plugins/MarkdownStream';
const { useEffect, useState } = React;

export default function ChatAi(props) {
    const {
        data = {}
    } = props.data || {};

    const {
        data: chatData,
    } = data;

    return (
        <div className='ChatAi'>
            <div className='ai-say'>
                <MarkdownStream source={chatData?.content || ""} />
            </div>
        </div>
    )
}