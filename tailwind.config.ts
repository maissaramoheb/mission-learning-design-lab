import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef5fb",
          100: "#d7e8f5",
          700: "#173960",
          800: "#102b4c",
          900: "#081f3b"
        },
        un: {
          blue: "#4B92DB",
          light: "#EAF4FF",
          line: "#B7D8F6"
        },
        field: {
          mist: "#F5F7FA",
          border: "#D8E0EA",
          ink: "#11243A"
        }
      },
      boxShadow: {
        command: "0 18px 60px rgba(8, 31, 59, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
