export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: "#0f172a",
                mist: "#f5f7fb",
                line: "#dbe3f0",
                panel: "#ffffff",
                brand: {
                    50: "#eef8f3",
                    100: "#d6efdf",
                    500: "#2f8f63",
                    600: "#25724f"
                },
                sand: {
                    50: "#fff8ea",
                    100: "#ffedc2",
                    500: "#d18b1f"
                },
                coral: {
                    50: "#fff1ee",
                    100: "#ffd8d0",
                    500: "#d45745"
                },
                sky: {
                    50: "#edf5ff",
                    100: "#d8e9ff",
                    500: "#4b7bec"
                }
            },
            boxShadow: {
                soft: "0 16px 40px -24px rgba(15, 23, 42, 0.35)",
                panel: "0 18px 48px -32px rgba(25, 40, 69, 0.28)"
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.5rem"
            },
            fontFamily: {
                sans: ["Manrope", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
            },
            backgroundImage: {
                "dashboard-glow": "radial-gradient(circle at top left, rgba(47,143,99,0.18), transparent 32%), radial-gradient(circle at top right, rgba(75,123,236,0.16), transparent 24%), linear-gradient(180deg, #f8fbff 0%, #f4f6fb 100%)"
            }
        }
    },
    plugins: []
};
