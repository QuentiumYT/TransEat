import defaultTheme from 'tailwindcss/defaultTheme'

const sizing = {
  '1/2': '50%',
  '1/3': '33.333333%', '2/3': '66.666667%',
  '1/4': '25%', '2/4': '50%', '3/4': '75%',
  '1/5': '20%', '2/5': '40%', '3/5': '60%', '4/5': '80%',
  '1/6': '16.666667%', '2/6': '33.333333%', '3/6': '50%', '4/6': '66.666667%', '5/6': '83.333333%',
  '1/12': '8.333333%', '2/12': '16.666667%', '3/12': '25%', '4/12': '33.333333%', '5/12': '41.666667%',
  '6/12': '50%', '7/12': '58.333333%', '8/12': '66.666667%', '9/12': '75%', '10/12': '83.333333%', '11/12': '91.666667%',
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js}'],
  safelist: ['!hidden'],
  theme: {
    extend: {
      colors: {
        black: '#242424',
        white: '#faf9f4',
        success: '#a8e9c0',
        info: '#82b6ff',
        warning: '#fbcda5',
        danger: '#fe9f97',
      },
      fontFamily: {
        sans: ['MyriadPro', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: () => {
        return Object.keys(defaultTheme.spacing).reduce((accumulator, spacingKey) => {
          return {
            ...accumulator,
            [`fill-${spacingKey}`]: `repeat(auto-fill, minmax(${defaultTheme.spacing[spacingKey]}, 1fr))`,
            [`fit-${spacingKey}`]: `repeat(auto-fit, minmax(${defaultTheme.spacing[spacingKey]}, 1fr))`,
          }
        }, {})
      },
      inset: sizing,
      minWidth: sizing,
      maxWidth: sizing,
      minHeight: sizing,
      maxHeight: sizing,
      screens: {
        // Base responsive
        'xs': { min: '360px' },
        'sm': { min: '640px' },
        'md': { min: '768px' },
        'lg': { min: '1024px' },
        'xl': { min: '1280px' },
        '2xl': { min: '1536px' },
        // Reverse responsive
        '-2xl': { max: '1535px' },
        '-xl': { max: '1279px' },
        '-lg': { max: '1023px' },
        '-md': { max: '767px' },
        '-sm': { max: '639px' },
        '-xs': { max: '359px' },
        // Between responsive
        'b-xs': { min: '360px', max: '639px' },
        'b-sm': { min: '640px', max: '767px' },
        'b-md': { min: '768px', max: '1023px' },
        'b-lg': { min: '1024px', max: '1279px' },
        'b-xl': { min: '1280px', max: '1535px' },
        'b-2xl': { min: '1536px' },
      },
    },
  },
}
