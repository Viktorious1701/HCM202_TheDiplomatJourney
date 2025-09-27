// the-diplomats-journey/src/components/hero-section.tsx
// path: the-diplomats-journey/src/components/hero-section.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HeroHeader } from './header';

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
                                <p className="mt-8 text-lg text-pretty max-w-2xl mx-auto">Trải nghiệm con đường cách mạng Hồ Chí Minh qua các sứ mệnh ngoại giao trọng điểm hình thành phong trào độc lập và tư tưởng xã hội chủ nghĩa ở Việt Nam.</p>

                                <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="px-5 text-base">
                                        <Link to="/game">
                                            <span className="text-nowrap">Bắt đầu hành trình</span>
                                        </Link>
                                    </Button>
                                    
                                    {/* Link to view the leaderboard, as per the UI design */}
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="px-5 text-base">
                                        <Link to="/leaderboard">
                                          <span className="text-nowrap">Xem bảng xếp hạng</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="about">
                  {/* You can add content for the "Learn About HCM" section here */}
                </section>
            </main>
        </>
    );
}