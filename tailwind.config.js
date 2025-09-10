/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0D1117',
        'dark-card': '#161B22',
        'neon-blue': '#00A3FF',
        'neon-purple': '#6C48F5',
        'neon-cyan': '#00F5FF',
        'dark-border': '#30363D',
      },
      fontFamily: {
        'sans': ['Roboto Mono', 'monospace'], // A monospace font adds a techy feel
      },
      boxShadow: {
        'glow-blue': '0 0 10px #00A3FF',
        'glow-cyan': '0 0 10px #00F5FF',
      },
    },
  },
  plugins: [],
  
}



