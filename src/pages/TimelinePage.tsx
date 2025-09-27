import { useState, useEffect } from 'react'
import { HeroHeader } from '@/components/header'
import Modal from '@/components/ui/modal'
import TimelineEventDetail from '@/components/TimelineEventDetail'

// Timeline data based on the provided historical events
const timelineEvents = [
    {
        id: 1,
        year: "1946",
        title: "Đoàn kết Quốc tế tại Ai Cập",
        description: "Hồ Chí Minh thăm kim tự tháp ở Ai Cập, tượng trưng cho tinh thần đoàn kết quốc tế.",
        image: "/assets/images/aicap.jpg",
        detailContent: {
            context: "Trong chuyến công du ngoại giao nhằm tìm kiếm sự ủng hộ quốc tế cho cuộc đấu tranh độc lập của Việt Nam, Hồ Chí Minh đã đến thăm Ai Cập vào năm 1946. Chuyến thăm này là một phần trong chiến lược rộng lớn nhằm xây dựng mối đoàn kết với các quốc gia khác đang đấu tranh chống chủ nghĩa thực dân.",
            significance: "Chuyến thăm này thể hiện cam kết của Việt Nam đối với hợp tác quốc tế và tinh thần đoàn kết với các phong trào chống thực dân khác. Nó giúp thiết lập các mối quan hệ ngoại giao quan trọng trong cuộc đấu tranh giành độc lập sắp tới.",
            keyFigures: ["Hồ Chí Minh", "Các quan chức Ai Cập"],
            outcomes: [
                "Củng cố quan hệ ngoại giao với Ai Cập",
                "Thể hiện tầm nhìn quốc tế của Việt Nam",
                "Xây dựng nền tảng cho hợp tác trong tương lai"
            ],
            historicalContext: "Ai Cập cũng đang định hướng con đường độc lập của mình khỏi ảnh hưởng của Anh, tạo nên cuộc gặp gỡ giữa hai quốc gia đều đang tìm kiếm chủ quyền."
        }
    },
    {
        id: 2,
        year: "Tháng 3 năm 1951",
        title: "Đại hội Liên minh Việt-Miên-Lào",
        description: "Liên minh Việt Nam-Campuchia-Lào tổ chức đại hội tại căn cứ kháng chiến Việt Bắc.",
        image: "/assets/images/viet-mien-lao.jpg",
        detailContent: {
            context: "Đại hội được tổ chức tại vùng núi Việt Bắc, nơi phục vụ như một căn cứ chiến lược cho kháng chiến Việt Nam. Cuộc họp này quy tụ các nhà lãnh đạo từ cả ba quốc gia Đông Dương.",
            significance: "Liên minh này rất quan trọng trong việc phối hợp các nỗ lực kháng chiến chống lại sự cai trị thực dân của Pháp trên khắp Đông Dương. Nó đại diện cho hành động thống nhất giữa ba quốc gia có chung kinh nghiệm thực dân.",
            keyFigures: ["Hồ Chí Minh", "Các nhà lãnh đạo kháng chiến Campuchia", "Các nhà lãnh đạo kháng chiến Lào"],
            outcomes: [
                "Thiết lập liên minh chính thức giữa ba quốc gia",
                "Phối hợp các chiến lược quân sự và chính trị",
                "Chia sẻ tài nguyên và mạng lưới tình báo",
                "Mặt trận thống nhất chống chủ nghĩa thực dân Pháp"
            ],
            historicalContext: "Pháp đang gặp khó khăn trong việc duy trì quyền kiểm soát toàn bộ Đông Dương, và liên minh này đã làm phức tạp đáng kể việc quản lý thực dân của họ bằng cách tạo ra một mặt trận kháng chiến thống nhất."
        }
    },
    {
        id: 3,
        year: "Tháng 7 năm 1957",
        title: "Chào đón Nồng nhiệt tại Ba Lan",
        description: "Hồ Chí Minh và đoàn đại biểu Việt Nam Dân chủ Cộng hòa được nhân dân Ba Lan chào đón nồng nhiệt.",
        image: "/assets/images/Poland.jpg",
        detailContent: {
            context: "Sau Hiệp định Geneva năm 1954, Việt Nam Dân chủ Cộng hòa đang tìm cách tăng cường mối quan hệ với các nước xã hội chủ nghĩa. Ba Lan, với tư cách là thành viên của Khối Warsaw, đại diện cho một đồng minh quan trọng trong진영 phương Đông.",
            significance: "Chuyến thăm này củng cố vị thế của Việt Nam trong cộng đồng quốc tế xã hội chủ nghĩa và cung cấp hỗ trợ kinh tế và kỹ thuật quan trọng cho Việt Nam Dân chủ Cộng hòa mới thành lập.",
            keyFigures: ["Hồ Chí Minh", "Các quan chức chính phủ Ba Lan", "Nhân dân Ba Lan"],
            outcomes: [
                "Ký kết các thỏa thuận hợp tác kinh tế",
                "Thiết lập các chương trình hỗ trợ kỹ thuật",
                "Khởi động các sáng kiến trao đổi văn hóa",
                "Tăng cường đoàn kết xã hội chủ nghĩa"
            ],
            historicalContext: "Chiến tranh Lạnh đang leo thang, và sự liên kết của Việt Nam với Khối phương Đông là rất quan trọng cho sự tồn tại và phát triển của quốc gia độc lập."
        }
    },
    {
        id: 4,
        year: "20 tháng 12 năm 1960",
        title: "Thành lập Mặt trận Dân tộc Giải phóng",
        description: "Các thành viên Ban Trung ương Mặt trận Dân tộc Giải phóng miền Nam Việt Nam tuyên thệ tại lễ thành lập.",
        image: "/assets/images/20121960.jpg",
        detailContent: {
            context: "Mặt trận Dân tộc Giải phóng (MTDTGP) được thành lập để phối hợp kháng chiến chống chính quyền Nam Việt Nam và ảnh hưởng của Mỹ. Điều này đánh dấu việc tổ chức chính thức các lực lượng đối lập ở miền Nam Việt Nam.",
            significance: "Việc thành lập MTDTGP đại diện cho bước ngoặt trong cuộc đấu tranh thống nhất Việt Nam. Nó cung cấp khung chính trị và quân sự cho phong trào kháng chiến ở miền Nam Việt Nam.",
            keyFigures: ["Các thành viên Ban Trung ương MTDTGP", "Các nhà lãnh đạo kháng chiến miền Nam"],
            outcomes: [
                "Thiết lập tổ chức kháng chiến chính thức",
                "Thông qua cương lĩnh chính trị thống nhất",
                "Tạo cấu trúc phối hợp quân sự",
                "Tìm kiếm sự công nhận quốc tế"
            ],
            historicalContext: "Việc chia cắt Việt Nam sau Hiệp định Geneva đã tạo ra hai nhà nước riêng biệt. MTDTGP thể hiện quyết tâm của nhiều người Việt Nam trong việc thống nhất đất nước dưới một chính phủ duy nhất."
        }
    },
    {
        id: 5,
        year: "8 tháng 2 năm 1965",
        title: "Cuộc Biểu tình Đoàn kết tại Moscow",
        description: "Nhân dân Moscow, Liên Xô tổ chức biểu tình ủng hộ nhân dân Việt Nam trong cuộc đấu tranh chống xâm lược đế quốc.",
        image: "/assets/images/xoviet.jpg",
        detailContent: {
            context: "Khi Chiến tranh Việt Nam leo thang với sự gia tăng can thiệp của Mỹ, Liên Xô đã công khai thể hiện sự ủng hộ đối với Việt Nam Dân chủ Cộng hòa. Cuộc biểu tình này là một trong nhiều biểu hiện đoàn kết quốc tế.",
            significance: "Sự thể hiện ủng hộ này rất quan trọng cho tinh thần và tính chính đáng quốc tế của Việt Nam. Nó cho thấy Việt Nam không đơn độc trong cuộc đấu tranh và có những đồng minh mạnh mẽ.",
            keyFigures: ["Nhân dân Moscow", "Các quan chức Xô Viết", "Đại diện Việt Nam"],
            outcomes: [
                "Thể hiện tinh thần đoàn kết quốc tế",
                "Khẳng định sự ủng hộ công khai của Xô Viết",
                "Huy động tình cảm chống chiến tranh",
                "Tăng áp lực ngoại giao lên Mỹ"
            ],
            historicalContext: "Sự leo thang can thiệp của Mỹ ở Việt Nam đã biến xung đột thành cuộc chiến tranh ủy nhiệm giữa các siêu cường, với Liên Xô cung cấp hỗ trợ quan trọng cho Việt Nam Dân chủ Cộng hòa."
        }
    }
]

export default function TimelinePage() {
    const [selectedEvent, setSelectedEvent] = useState<typeof timelineEvents[0] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [visibleEvents, setVisibleEvents] = useState<number[]>([])

    // Staggered animation effect for timeline events
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const eventIndex = parseInt(entry.target.getAttribute('data-event-index') || '0')
                        setVisibleEvents(prev => [...new Set([...prev, eventIndex])])
                    }
                })
            },
            { threshold: 0.1, rootMargin: '50px' }
        )

        // Observe all timeline events
        const eventElements = document.querySelectorAll('[data-event-index]')
        eventElements.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    const openEventModal = (event: typeof timelineEvents[0]) => {
        setSelectedEvent(event)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedEvent(null)
    }
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden">
                <section className="min-h-screen pt-20">
                    <div className="w-full max-w-6xl mx-auto px-6">
                        {/* Page Header */}
                        <div className="text-center py-8 md:py-12 animate-fade-in">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-balance bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse-slow">
                                TƯ TƯỞNG HỒ CHÍ MINH VỀ ĐOÀN KẾT QUỐC TẾ
                            </h1>
                            <p className="mt-6 md:mt-8 text-base md:text-lg text-pretty max-w-2xl mx-auto opacity-0 animate-slide-up-delayed">
                                Những khoảnh khắc quan trọng trong hành trình ngoại giao của Hồ Chí Minh và con đường giành độc lập của Việt Nam
                            </p>
                        </div>

                        {/* Timeline Container */}
                        <div className="relative">
                            {/* Timeline Line - Hidden on mobile, shown on desktop */}
                            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-blue-500 to-purple-500 h-full animate-glow"></div>
                            
                            {/* Mobile Timeline Line - Left aligned */}
                            <div className="block md:hidden absolute left-4 w-0.5 bg-gradient-to-b from-primary via-blue-500 to-purple-500 h-full animate-glow"></div>
                            
                            {/* Timeline Events */}
                            <div className="space-y-8 md:space-y-16 pb-12">
                                {timelineEvents.map((event, index) => (
                                    <div 
                                        key={index}
                                        data-event-index={index}
                                        className={`relative flex items-center transform transition-all duration-1000 ${
                                            visibleEvents.includes(index) 
                                                ? 'translate-y-0 opacity-100' 
                                                : 'translate-y-20 opacity-0'
                                        } ${
                                            // Desktop: alternating layout, Mobile: all left-aligned
                                            index % 2 === 0 ? 'md:flex-row flex-row' : 'md:flex-row-reverse flex-row'
                                        }`}
                                        style={{ animationDelay: `${index * 200}ms` }}
                                    >
                                        {/* Timeline Node - Desktop center, Mobile left */}
                                        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-primary to-blue-500 rounded-full border-2 md:border-4 border-background shadow-lg z-10 animate-pulse-node"></div>
                                        
                                        {/* Content Container */}
                                        <div className={`w-full md:w-5/12 pl-12 md:pl-0 ${
                                            index % 2 === 0 
                                                ? 'md:pr-8 md:text-right text-left' 
                                                : 'md:pl-8 md:text-left text-left'
                                        }`}>
                                            <div 
                                                className="group bg-background/50 backdrop-blur-sm border rounded-lg p-4 md:p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
                                                onClick={() => openEventModal(event)}
                                            >
                                                {/* Animated gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                                
                                                {/* Glowing border effect */}
                                                <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
                                                
                                                <div className="space-y-3 md:space-y-4 relative z-10">
                                                    <div className={`text-left ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary/20 to-blue-500/20 text-primary rounded-full text-sm font-medium transform group-hover:scale-110 transition-transform duration-300">
                                                            {event.year}
                                                        </span>
                                                    </div>
                                                    
                                                    <h3 className="text-lg md:text-xl font-semibold text-balance group-hover:text-primary transition-colors duration-300">
                                                        {event.title}
                                                    </h3>
                                                    
                                                    <p className="text-muted-foreground text-pretty leading-relaxed text-sm md:text-base group-hover:text-foreground transition-colors duration-300">
                                                        {event.description}
                                                    </p>
                                                    
                                                    {/* Click hint */}
                                                    <div className="mt-3 md:mt-4 text-xs text-primary/70 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                        Nhấp để tìm hiểu thêm...
                                                    </div>
                                                    
                                                    {/* Optional: Add image */}
                                                    <div className="mt-3 md:mt-4 rounded-lg overflow-hidden">
                                                        <img 
                                                            src={event.image} 
                                                            alt={event.title}
                                                            className="w-full h-24 md:h-32 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Empty space for the other side - Only on desktop */}
                                        <div className="hidden md:block md:w-5/12"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Call to Action */}
                        <div className="text-center py-12 md:py-16">
                            <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
                                <h2 className="text-2xl md:text-3xl font-medium">
                                    Khám Phá Hành Trình
                                </h2>
                                <p className="text-muted-foreground text-sm md:text-base">
                                    Tìm hiểu sâu hơn về từng khoảnh khắc lịch sử và trải nghiệm những sứ mệnh ngoại giao đã định hình vận mệnh của Việt Nam.
                                </p>
                                <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row mt-6 md:mt-8">
                                    <button className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
                                        <span className="text-nowrap">Bắt Đầu Nhiệm Vụ</span>
                                    </button>
                                    <button className="w-full sm:w-auto px-6 py-3 border border-border text-foreground bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors duration-200">
                                        <span className="text-nowrap">Tìm Hiểu Thêm</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Modal for event details */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal}
                title={selectedEvent?.title}
            >
                {selectedEvent && (
                    <TimelineEventDetail event={selectedEvent} />
                )}
            </Modal>
        </>
    )
}