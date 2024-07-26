import React from 'react'
import './App.scss';
import Header from '@/plugins/Header';
import Main from '@/plugins/Main';
import Footer from '@/plugins/Footer';

export default function App() {
  return (
    <>
      <Header data={{ title: "你好呀，我是AI小助手，有问题都可以问我哦~", avatarUrl: "https://cdn3.cmread.com/aigc/manager/2024/07/16/dtww11.webp" }} />
      <Main />
      <Footer />
    </>
  )
}