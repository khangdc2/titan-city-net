/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

    // 👇 Optional: Nếu bạn có component từ thư viện bên ngoài
    // "./node_modules/@titancity-ui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Custom TitanCity colors (nếu muốn dùng tailwind màu riêng)
        "titan-dark": "#0f172a",
        "titan-light": "#1e293b",
        "titan-accent": "#14b8a6", // teal-500
      },
      animation: {
        "pulse-fast": "pulse 1s ease-in-out infinite",
      },
    },
  },
  plugins: [
    // 🧩 Gợi ý plugin đẹp cho UI sau này
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};
