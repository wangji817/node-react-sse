import React from 'react';
const { useEffect, useState } = React;
import './App.scss';
import useStore from './store';/**状态管理入口文件 */
import Header from '@/plugins/Header';
import Main from '@/plugins/Main';
import Footer from '@/plugins/Footer';

export default function App() {
  const [globalState, globalActions] = useStore();  

  return (
    <>
      <Header data={{ title: "你好呀，我是AI小助手，有问题都可以问我哦~", avatarUrl: "https://cdn3.cmread.com/aigc/manager/2024/07/16/dtww11.webp" }} />
      <Main />
      <Footer />
    </>
  )
}