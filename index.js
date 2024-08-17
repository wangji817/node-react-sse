const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 8686;

const { ChatCompletion, setEnvVariable } = require("@baiducloud/qianfan");

// 使用安全认证AK/SK鉴权，通过环境变量初始化；替换下列示例中参数，安全认证Access Key替换your_iam_ak，Secret Key替换your_iam_sk
setEnvVariable('QIANFAN_ACCESS_KEY', 'e0d3838d18534332bb8b255e915825dc');
setEnvVariable('QIANFAN_SECRET_KEY', 'd639bcfc991b4356ac57bac3335ab165');

const client = new ChatCompletion();//创建chat对象

//发送问题
const chatMsg = async (content) => {
    return await client.chat({
        messages: [
            {
                role: 'user',
                content
            },
        ],
        stream: true,   //启用流式返回
    }, 'ERNIE-Speed-128K');
}

// 设置静态文件目录
app.set('views', path.join(__dirname, 'public'));
app.use(bodyParser.json());

const getChat = async (req, res) => {
    // 使用res.render方法渲染视图，并传递数据
    const question = req?.query?.question || req?.body?.question || "";
    if (question) {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*' // 允许跨域
        });

        try {
            const resp = await chatMsg(question);
            for await (const chunk of resp) {
                console.log(chunk);
                res.write(`event:message\ndata:${JSON.stringify(chunk)}\n\n`);
            }
        } catch (error) {
            console.log('error===', error);
            res.write(`event:error\ndata:${JSON.stringify({ code: -1, result: "同时使用的人数过多，请稍后重试" })}\n\n`);
        }
        // 如果客户端关闭连接，清理资源
        req.on('close', () => {
            console.log(`当前：${new Date().toLocaleString()} Connection closed`);
        });
    } else {
        res.end(JSON.stringify({ code: 9999 }));
    }
}
app.get('/chat', getChat);
app.post('/chat', getChat);

const renderIndex = (req, res) => {
    // 使用res.render方法渲染视图，并传递数据    
    res.render('index', null);
}
app.use(express.static('dist'));
app.get('/', renderIndex);

// 启动服务
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});