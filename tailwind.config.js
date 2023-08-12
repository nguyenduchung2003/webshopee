/** @type {import('tailwindcss').Config} */
export default {
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
          extend: {
               colors: {
                    backgroudBanner: "#ee4d2d",
               },
               width: {
                    "800px": "800px",
               },
               height: {
                    "120px": "120px",
                    "76px": "76px",
                    "35px": "35px",
               },
               inset: {
                    "-10px": "-10px",
                    "-20px": "-20px",
                    "200px": "200px",
                    "300px": "300px",
                    "1050px": "1050px",
                    "1300px": "1300px",
                    "-25px": "-25px",
               },
               margin: {
                    "-20px": "-20px",
                    "300px": "300px",
               },
          },
     },
     plugins: [],
}
