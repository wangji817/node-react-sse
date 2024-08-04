/** @type {import('tailwindcss').Config} */
const rem = 15;
const remToPx = (num) => {
  return (num / rem).toFixed(4);
}
const $cdn = "https://cdn1.cmread.com/ues";

const getSpaceings = (nums = 9999, bix = 0.5, opx = '') => {
  let spaceings = {};
  let i = bix;
  for (i; i < nums;) {
    switch (opx) {
      case 'zIndex':
        spaceings[i] = i;
        break;
      case 'rem':
        spaceings[i] = remToPx(i) + opx;
        break;
      case '%':
        spaceings[i + "%"] = i + opx;
        break;
      default:
        break;
    }
    i += bix;
  }
  return spaceings;
}

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '/index.html',
  ],
  theme: {
    spacing: {
      px: '1px',
      0: '0',
      0.5: remToPx(0.5) + 'rem',
      ...getSpaceings(9999, .5, 'rem')
    },
    backgroundImage: theme => ({
      'headbg': `url(${$cdn}/c6/5527d20306d78c564d8ea740719521ef99c6/pic.jpg)`,
      'wel-text': `url(${$cdn}/23/55279b5feeeb4b9dc5c201803e7cf870ac23/pic.jpg)`,
      '06A7FF': 'linear-gradient(125deg, #06A7FF 40%, #06A7FF 100%)',
      // 你可以添加更多的背景图样式
    }),    
    extend: {
      colors: {
        '06A7FF': '#06A7FF',
      },
      zIndex: {
        ...getSpaceings(999, 1, 'zIndex')
      },
      maxWidth: {
        'available': '-webkit-fill-available',
        ...getSpaceings(101, 1, '%')
      }
    }
  },
  plugins: [
  ],
}

