// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            // @ 替代为 src
            '@': __dirname + '/src',
            // @component 替代为 src/component
            '@plugins': __dirname + '/src/plugins',
        },
    },
    css: {
        postcss: {
            plugins: [
                tailwindcss({
                    config: 'tailwind.config.js',
                }),
                // ... 其他 PostCSS 插件
            ],
        },
    },
    server: {
        proxy: {
            '/': {
                target: 'http://localhost:8686',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\//, '')
            }
        }
    }
    // ... 其他配置
})