// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react(), tailwindcss({
        config: 'tailwind.config.js',
    })],
    resolve: {
        alias: {
            // @ 替代为 src
            '@': __dirname + '/src',
            // @component 替代为 src/component
            '@plugins': __dirname + '/src/plugins',
        },
    },
    server: {
        port: '5178',
        proxy: {
            '/apis': {
                target: 'http://localhost:8686',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/apis/, '')
            }
        }
    }
    // ... 其他配置
})