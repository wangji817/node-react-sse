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
    <div className='w-full h-full text-center'>
      <div className='max-w-1024 h-full flex flex-col mx-auto bg-normal'>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  )
}