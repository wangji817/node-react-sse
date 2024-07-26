export default {
    /**获取流式数据 */
    getChat: (store, question) => {
        const url = `/chat?question=${question}`;//当前接口地址
        const eventSource = new EventSource(url);
        eventSource.addEventListener('ReceiveQuestion', (event) => {
            console.log('Custom Event:', event.data);
        });
        eventSource.addEventListener('AnalysisQuestion', (event) => {
            console.log('Custom Event:', event.data);
        });
        eventSource.addEventListener('message', (event) => {
            console.log('Custom Event:', event.data, typeof event.data);
            try {
                const data = JSON.parse(event.data);
                if (data && data.data && data.data.isEnd === 1) {
                    eventSource.close();
                }
            } catch (error) {
                eventSource.close();
            }
        });
    },
    /**获取可视内容高度和上间距 */
    getCurrHeight: (store) => {
        const Header = document.querySelector(".Header");
        const Footer = document.querySelector(".Footer");
        const winH = window.innerHeight || window.outerHeight;
        store.actions.setHeight(winH - Header.offsetHeight - Footer.offsetHeight);
        store.actions.setMarginTop(Header.offsetHeight);        
    },
    /**窗口尺寸变化监听，重设内容高度 */
    winResize: (store) => {
        window.onresize = () => {
            store.actions.getCurrHeight();
        }
    },
    /**设置高度 */
    setHeight: (store, height) => {
        store.setState({ height })
    },/**设置上间距 */
    setMarginTop: (store, marginTop) => {
        store.setState({ marginTop })
    },
    setList: (store, AiList) => {
        store.setState({ AiList })
    },
}