
import { ChatCompletion, setEnvVariable } from "@baiducloud/qianfan";

// 使用安全认证AK/SK鉴权，通过环境变量初始化；替换下列示例中参数，安全认证Access Key替换your_iam_ak，Secret Key替换your_iam_sk
setEnvVariable('QIANFAN_ACCESS_KEY', 'e0d3838d18534332bb8b255e915825dc');
setEnvVariable('QIANFAN_SECRET_KEY', 'd639bcfc991b4356ac57bac3335ab165');

const client = new ChatCompletion();
async function main() {
    const resp = await client.chat({
        messages: [
            {
                role: 'user',
                content: '简单介绍下故宫',
            },
        ],
        stream: true,   //启用流式返回
    }, 'ERNIE-Speed-128K');
    for await (const chunk of resp) {
        console.log(chunk);
    }
}

main();