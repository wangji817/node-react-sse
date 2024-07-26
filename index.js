const axiosApi = require('./axiosApi');
const {
    initAxios,
    get,
    post,
} = axiosApi;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 8686;

//创建sse对象
const aiAgentId = "92ab6001fc6241a5b65f0809ecbdb3ff";//智能体id，目前是奥运版
const ssePost = (question = "", callback) => {
    const headers = {
        "Content-Type": "application/json",
        "user-id": "1",//默认用户id
        "x-identity-id": "40035561513",//身份id
        "referer": `https://wap.cmread.com/nap/p/Ai_shutong_saas_ys.jsp?agentId=${aiAgentId}`,//页面来源，防止被后端识别，过滤
        "conversation-id": "2d049b20-95e7-4ccb-b58c-d93a9ee3f430",//会话id，目前写死一个，如果需要动态创建，则需要发起新的请求
        "ai-agent-id": aiAgentId,
    }
    const url = '/nap/aiagent/api/stream/chat';//当前接口地址
    const ins = initAxios({
        baseURL: 'https://wap.cmread.com',//请求环境域名    
        timeout: 60 * 1000,//超时时间
        headers
    });
    const res = post(ins, url, { question }, {
        "responseType": 'stream',//流式类型            
    })
    res.then(response => {
        const stream = response.data;
        stream.on('data', (data) => {
            try {
                callback && callback(data);
            } catch (error) {
                callback && callback(JSON.stringify({ code: -2, error }));
            }
        });
        stream.on('end', () => {
            // 处理流结束,暂时不需要返回
            callback && callback(({ code: 400, data: {} }));
        });
        stream.on('error', (error) => {
            // 处理流错误                
            callback && callback(({ code: -3, error }));
        });
    })
    res.catch(error => {
        // 处理请求错误
        callback && callback(({ code: -1, error }))
    });
}


//创建会话id
const createConId = () => {
    const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "user-id": "40035561513",//默认用户id
        "x-identity-id": "40035561513",//身份id
        "referer": `https://wap.cmread.com/nap/p/Ai_shutong_saas_ys.jsp?agentId=${aiAgentId}`,//页面来源，防止被后端识别，过滤
    }
    const url = `/nap/aiagent/api/getConversationInfo?agentId=${aiAgentId}`;
    const ins = initAxios(headers);
    return new Promise((resolve, reject) => {
        const res = post(ins, url, { isCreateNew: 1 }, { "responseType": 'json', })
        res.then(data => {
            resolve(data)
        });
        res.catch(err => resolve({ code: -1, data: {} }));
    });
}

// 设置静态文件目录
app.set('views', path.join(__dirname, 'public'));
app.use(bodyParser.json());

const getChat = (req, res) => {
    // 使用res.render方法渲染视图，并传递数据
    const question = req?.query?.question || req?.body?.question || "";    
    if (question) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*' // 允许跨域
        });
        const eventReg = /event:.*\n/g;
        const eventDataReg = /event:.*\ndata:/g;
        ssePost(question, (result => {
            if (result && [400, -1, -3].includes(result.code)) {//已经结束了
                res.end();
                return;
            }
            // 处理接收到的 SSE 数据
            let streamData = result.toString();
            console.log(streamData)
            res.write(streamData);
            // if (streamData) {
            //     let eType = streamData.match(eventReg);
            //     let eData = streamData.replace(eventDataReg, "");
            //     let streamData = {
            //         code: 200,
            //         eventType: eType ? eType[0].replace("event:", "").replace(/\n/g, "") : "",
            //         data: JSON.parse(eData.trim())
            //     }
            //     res.write(JSON.stringify(streamData));
            // }
        }));
        // 如果客户端关闭连接，清理资源
        req.on('close', () => {
            console.log(`${new Date().toLocaleString()} Connection closed`);
        });
    } else {
        res.end(JSON.stringify({ code: 9999 }));
    }
}
app.get('/chat', getChat);
app.post('/chat', getChat);

// 启动服务
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);    
});