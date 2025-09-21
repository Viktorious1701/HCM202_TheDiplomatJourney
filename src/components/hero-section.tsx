import React from 'react'
import { Button } from '@/components/ui/button'
import { HeroHeader } from './header'

// Simple Link component for Vite/React (replaces Next.js Link)
const Link = ({ href, children, className, ...props }: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
}) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
)

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden">
                <section className="min-h-screen flex items-center justify-center">
                    <div className="w-full max-w-6xl mx-auto px-6">
                        <div className="flex flex-col items-center text-center space-y-8">
                            <div className="max-w-4xl">
                                <h1 className="text-5xl font-medium md:text-6xl xl:text-7xl text-balance">The Diplomat's Journey</h1>
                                <p className="mt-8 text-lg text-pretty max-w-2xl mx-auto">Experience the revolutionary path of Ho Chi Minh through key diplomatic missions that shaped Vietnam's independence movement and socialist ideology.</p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="px-5 text-base">
                                        <Link href="#link">
                                            <span className="text-nowrap">Begin Journey</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="px-5 text-base">
                                        <Link href="#link">
                                            <span className="text-nowrap">Learn About HCM</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            {/* Removed problematic background image that was causing horizontal overflow */}
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
