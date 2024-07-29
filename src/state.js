export default {
    height: 0,
    marginTop: 0,
    AiList: [],
    isChat: false,//是否正在发送流式输出中，默认false，未输出，true时，需要暂停其他操作
    aiListRef: null,
    watchScroll: true,//是否在流式滚动中未被打断滚动，默认true，如果流式滚动中，触发了用户滚动，设置false则取消流式滚动
    scrollerRef: null,//下滑箭头对象
}