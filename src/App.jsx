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
      <Header />
      <Main />
      <Footer />
    </>
  )
}