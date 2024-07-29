import React from 'react';
import './index.scss';
import MarkdownStream from '@plugins/MarkdownStream';
import { Image } from 'antd';
const { useEffect, useState } = React;
import useStore from '../../../store';/**状态管理入口文件 */

export default function ChatAi(props) {
    const [globalState, globalActions] = useStore();
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
    // [
    //     {
    //         "paperBookUrl": "https://citic.cmread.com/zxHtml/html/paperBookDirect.html?bookid=100000000001276273&source=cmread&papertitleflag=0&tabFlag=1",
    //         "bookIntroduce": "《小球大世界》用乒乓球讲述清华体育、清华精神和清华故事。这是清华校友乒乓球爱好者写给自己，写给乒乓球，写给母校的一本书。\n《小球大世界——清华乒乓故事》为读者揭秘：清华乒乓球运动为何普及得这么好？清华乒乓球队为何屡获佳绩？非专业出身的清华乒乓球员凭什么脱颖而出？清华乒乓为什么是快乐乒乓？国运盛，球运盛，清华乒乓怎样与时代同呼吸、共命运？\n《小球大世界——清华乒乓故事》回顾了100余年来清华的乒乓运动，展现了清华师生多姿多彩的乒乓世界。书中既有老故事，也有新传奇，真切诠释了“无体育，不清华”的精神。清华乒乓追求永不放弃，这正是清华体育之魂。\n序\n得知清华大学乒乓球爱好者们正在编辑一本文集，用一种特殊的方式纪念母校建校110周年，我作为一名曾经为国争光的乒乓球运动员，同时又作为清华校友乒乓球协会现任会长，感到由衷的高兴。\n“无体育，不清华”，这是对清华一百多年来坚持“体魄与人格并重”体育教育理念的最好诠释。同样，清华与乒乓球运动在中国的开展也有着悠久的渊源。特别是中华人民共和国成立以来，乒乓球一直是清华大学广大师生最喜爱的运动项目之一，在培养一代代清华学子成为国家栋梁的过程中发挥了积极作用，留下了无数精彩镜头和难忘的回忆。\n1952年在清华举办了第一届全国乒乓球锦标赛。1959年容国团获得了第一个世界冠军，他的人生格言“人生能有几回搏”，深深地鼓舞着全国人民和清华学子。1982年在北京举办了第一届全国大学生运动会，而乒乓球比赛就设置在清华老体育馆。\n这本文集中的每一篇文章，都是大家在清华乒乓之路“克服困难、锻炼身心、提高球艺、团队合作、获得友谊”的真实写照，读起来让人感同身受，回味无穷！\n乒乓球作为我国的国球，“国球精神”很难一言以蔽之；同样，到底什么是“清华精神”也是我们清华学子需要以一生来上下求索的。\n2019年7月，我在清华大学人文学院毕业生典礼上曾和学弟学妹们“谈心”，希望他们“不要让名校毕业成为一生z大成就”，在未来的人生道路上勇于挑战偏见，不断取得突破。通过这本文集中的生动故事，我看到的正是永不停步的科学奋斗精神和积极向上的健康生活理念。对此，我同样感到十分欣慰。\n我们都是乒乓球爱好者，小小银球早已经和工作、生活甚至人生融为一体。我愿与大家一起继续努力，推动乒乓球运动在清华，在中国，在世界的广泛开展，共同享受“以球会友、快乐乒乓”带给我们的无穷乐趣。\n是为序。\n2021 年4 月",
    //         "bookName": "小球大世界——清华乒乓故事",
    //         "bookCover": "http://img13.360buyimg.com/n1/jfs/t1/196773/12/15442/97649/61024f7cEaec2a2b5/e27249fcf888f5f9.jpg",
    //         "paperBookId": "100000000001276273",
    //         "authorName": "",
    //         "rankingList": [],
    //         "categoryList": [
    //             "社会科学"
    //         ],
    //         "id": "boe812ad9080ce4a6c91d72a71787e1280",
    //         "awardList": []
    //     }
    // ]
    return (
        <div className='ChatAi'>
            <div className='ai-say'>
                <MarkdownStream source={chatData?.content || ""} />
            </div>
            {
                isEnd === 1 && <div className='ai-info'>
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