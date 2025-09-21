/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.8s ease-out',
  			'slide-up-delayed': 'slideUpDelayed 1s ease-out 0.5s both',
  			'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
  			'pulse-node': 'pulseNode 2s ease-in-out infinite',
  			'glow': 'glow 2s ease-in-out infinite alternate',
  			'modal-backdrop': 'modalBackdrop 0.3s ease-out',
  			'modal-slide-in': 'modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  			'content-fade-in': 'contentFadeIn 0.5s ease-out 0.2s both',
  			'title-glow': 'titleGlow 2s ease-in-out infinite alternate'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': { opacity: '0', transform: 'translateY(20px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			slideUpDelayed: {
  				'0%': { opacity: '0', transform: 'translateY(30px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			pulseSlow: {
  				'0%, 100%': { opacity: '1' },
  				'50%': { opacity: '0.7' }
  			},
  			pulseNode: {
  				'0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(var(--primary), 0.7)' },
  				'50%': { transform: 'scale(1.2)', boxShadow: '0 0 0 10px rgba(var(--primary), 0)' }
  			},
  			glow: {
  				'0%': { boxShadow: '0 0 5px rgba(var(--primary), 0.5)' },
  				'100%': { boxShadow: '0 0 20px rgba(var(--primary), 0.8), 0 0 30px rgba(59, 130, 246, 0.5)' }
  			},
  			modalBackdrop: {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' }
  			},
  			modalSlideIn: {
  				'0%': { opacity: '0', transform: 'scale(0.95) translateY(-20px)' },
  				'100%': { opacity: '1', transform: 'scale(1) translateY(0)' }
  			},
  			contentFadeIn: {
  				'0%': { opacity: '0', transform: 'translateY(20px)' },
  				'100%': { opacity: '1', transform: 'translateY(0)' }
  			},
  			titleGlow: {
  				'0%': { textShadow: '0 0 5px rgba(var(--primary), 0.5)' },
  				'100%': { textShadow: '0 0 20px rgba(var(--primary), 0.8), 0 0 30px rgba(59, 130, 246, 0.5)' }
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}