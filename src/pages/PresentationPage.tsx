import React, { useState, useEffect } from 'react'
import { HeroHeader } from '@/components/header'
import Modal from '@/components/ui/modal'

interface ChapterSection {
  id: number;
  title: string;
  content: string;
  keyPoints: string[];
  examples: string[];
  image?: string;
}

// Lightweight wrapper to render the web component without JSX intrinsic type errors
const ModelViewer = (props: any) => {
  // Map common camelCase props to dashed-attribute names expected by model-viewer
  const map: Record<string, string> = {
    cameraControls: 'camera-controls',
    autoRotate: 'auto-rotate',
    shadowIntensity: 'shadow-intensity',
    shadowSoftness: 'shadow-softness',
    interactionPrompt: 'interaction-prompt',
    cameraOrbit: 'camera-orbit',
    fieldOfView: 'field-of-view',
    environmentImage: 'environment-image',
    skyboxImage: 'skybox-image',
    toneMapping: 'tone-mapping',
    disableZoom: 'disable-zoom',
    arModes: 'ar-modes',
  };
  const mapped: any = {};
  Object.entries(props || {}).forEach(([k, v]) => {
    const target = map[k] ?? k;
    mapped[target] = v;
  });
  return (React as any).createElement('model-viewer', mapped);
};

const PresentationPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<ChapterSection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);

  // Chapter 5 sections based on Ho Chi Minh's thought on national unity and international solidarity
  const chapterSections: ChapterSection[] = [
    {
      id: 1,
      title: "Tư Tưởng Đại Đoàn Kết Toàn Dân Tộc",
      content: "Tư tưởng đại đoàn kết toàn dân tộc của Hồ Chí Minh là vấn đề có ý nghĩa chiến lược, quyết định thành công của cách mạng Việt Nam. Đây là vấn đề cơ bản, nhất quán lâu dài và xuyên suốt tiến trình cách mạng. Bác khẳng định: 'Đoàn kết là sức mạnh của chúng ta', 'Đoàn kết, đoàn kết, đại đoàn kết - Thành công, thành công, đại thành công'.",
      keyPoints: [
        "Đại đoàn kết toàn dân tộc là vấn đề có ý nghĩa chiến lược quyết định thành công cách mạng",
        "Là mục tiêu, nhiệm vụ hàng đầu của cách mạng Việt Nam",
        "Cách mạng là sự nghiệp của quần chúng, do quần chúng và vì quần chúng",
        "Đảng phải thức tỉnh, tập hợp, hướng dẫn quần chúng thành khối đại đoàn kết",
        "Nền tảng là liên minh công nông dưới sự lãnh đạo của giai cấp công nhân",
        "Bao gồm toàn thể nhân dân, tất cả những người Việt Nam yêu nước"
      ],
      examples: [
        "Mặt trận Việt Minh - liên minh các tầng lớp nhân dân trong kháng chiến",
        "Chính sách dân tộc hòa hợp và bình đẳng giữa 54 dân tộc",
        "Đoàn kết các tôn giáo: Phật giáo, Công giáo, Cao Đài, Hòa Hảo",
        "Phong trào thi đua yêu nước trong xây dựng đất nước",
        "Mặt trận Tổ quốc Việt Nam - tổ chức đoàn kết rộng rãi nhất"
      ],
      image: "/assets/images/arc2/incomes/moscow-debate.jpg"
    },
    {
      id: 2,
      title: "Tư Tưởng Đoàn Kết Quốc Tế",
      content: "Hồ Chí Minh nhận thức sâu sắc về sự cần thiết phải đoàn kết quốc tế nhằm kết hợp sức mạnh dân tộc với sức mạnh thời đại. Người khẳng định: cách mạng Việt Nam là một bộ phận của cách mạng thế giới, phải tranh thủ sự đồng tình, ủng hộ của bạn bè quốc tế để tạo thành sức mạnh tổng hợp.",
      keyPoints: [
        "Kết hợp sức mạnh dân tộc với sức mạnh thời đại tạo sức mạnh tổng hợp",
        "Cách mạng Việt Nam là bộ phận của cách mạng thế giới",
        "Tranh thủ sự đồng tình, ủng hộ của phong trào cách mạng quốc tế",
        "Ủng hộ các phong trào giải phóng dân tộc trên thế giới",
        "Chủ nghĩa quốc tế vô sản và đoàn kết các dân tộc bị áp bức",
        "Hòa bình, hữu nghị và hợp tác quốc tế trên nguyên tắc bình đẳng"
      ],
      examples: [
        "Thành lập Đảng Cộng sản Pháp (1920) - thể hiện tinh thần quốc tế",
        "Quan hệ hữu nghị với Liên Xô, Trung Quốc trong kháng chiến",
        "Tham gia Hội nghị Bandung (1955) - khẳng định chủ nghĩa không liên kết",
        "Ủng hộ các phong trào giải phóng dân tộc ở châu Phi, châu Á",
        "Thiết lập quan hệ ngoại giao với 23 nước (1945-1969)"
      ],
      image: "/assets/images/world-map.png"
    },
    {
      id: 3,
      title: "Điều Kiện Xây Dựng Khối Đại Đoàn Kết",
      content: "Để xây dựng khối đại đoàn kết dân tộc, quy tụ được mọi giai cấp, tầng lớp, Hồ Chí Minh đề ra các điều kiện cụ thể: phải lấy lợi ích chung làm điểm quy tụ, đồng thời tôn trọng những lợi ích khác biệt chính đáng; thực hiện dân chủ rộng rãi; có chính sách đoàn kết, tranh thủ phù hợp.",
      keyPoints: [
        "Lấy lợi ích chung làm điểm quy tụ, tôn trọng lợi ích khác biệt chính đáng",
        "Thực hiện dân chủ rộng rãi trong đời sống xã hội",
        "Có chính sách đoàn kết, tranh thủ phù hợp với từng đối tượng",
        "Xử lý tốt quan hệ lợi ích, tìm ra điểm tương đồng",
        "Đảng phải nêu gương, giữ vai trò lãnh đạo đúng đắn",
        "Kết hợp đấu tranh và đoàn kết, cương nệm và mềm mại"
      ],
      examples: [
        "Chính sách ruộng đất trong cải cách nông nghiệp",
        "Chính sách đối với dân tộc thiểu số - bình đẳng, đoàn kết, tương trợ",
        "Chính sách tôn giáo - tự do tín ngưỡng, đoàn kết trong xây dựng đất nước",
        "Chính sách đối với trí thức - trọng dụng nhân tài",
        "Chính sách kiều bào - 'Lá lành đùm lá rách'"
      ],
      image: "/assets/images/arc1/incomes/paris-mission-activists.jpg"
    },
    {
      id: 4,
      title: "Nguyên Tắc Và Phương Pháp Đoàn Kết",
      content: "Hồ Chí Minh đề ra những nguyên tắc và phương pháp đoàn kết khoa học: đặt lợi ích dân tộc lên trên hết, kết hợp đấu tranh và đoàn kết, vừa cương quyết vừa mềm mại. Người luôn tìm kiếm tiếng nói chung, điểm tương đồng để đoàn kết, đồng thời kiên quyết đấu tranh với những thế lực thù địch.",
      keyPoints: [
        "Đặt lợi ích dân tộc, lợi ích nhân dân lên trên hết",
        "Kết hợp đấu tranh và đoàn kết một cách linh hoạt",
        "Vừa cương quyết vừa mềm mại tùy từng hoàn cảnh",
        "Tìm kiếm tiếng nói chung, điểm tương đồng để đoàn kết",
        "Kiên quyết đấu tranh với các thế lực thù địch",
        "Thực hiện đúng chính sách 'phân hóa địch, bạn, ta'"
      ],
      examples: [
        "Đối với Pháp: vừa đấu tranh vừa đàm phán (Hiệp định sơ bộ 1946)",
        "Đối với Mỹ: kiên quyết kháng chiến nhưng sẵn sàng đàm phán hòa bình",
        "Đối với các chính phủ Pháp khác nhau: chính sách phân hóa linh hoạt",
        "Đối với các tôn giáo: đoàn kết trên cơ sở yêu nước",
        "Đối với dân tộc thiểu số: 'Bắc tiến Nam tiến cùng tây tiến'"
      ],
      image: "/assets/images/arc2/incomes/moscow-comintern-meeting.jpg"
    },
    {
      id: 5,
      title: "Vận Dụng Trong Giai Đoạn Hiện Nay",
      content: "Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc và đoàn kết quốc tế được Đảng và Nhà nước ta vận dụng sáng tạo trong thời kỳ đổi mới. Việt Nam thực hiện chính sách đa phương hóa, đa dạng hóa quan hệ quốc tế, là bạn, đối tác tin cậy và thành viên có trách nhiệm của cộng đồng quốc tế.",
      keyPoints: [
        "Đa phương hóa, đa dạng hóa quan hệ quốc tế trong thời kỳ đổi mới",
        "Là bạn, đối tác tin cậy của cộng đồng quốc tế",
        "Thành viên tích cực, có trách nhiệm của các tổ chức quốc tế",
        "Xây dựng khối đại đoàn kết toàn dân tộc trong công cuộc đổi mới",
        "Kết hợp sức mạnh dân tộc với sức mạnh thời đại trong hội nhập",
        "Đóng góp tích cực vào hòa bình, ổn định và phát triển khu vực, thế giới"
      ],
      examples: [
        "Gia nhập ASEAN (1995), WTO (2007), là thành viên UN từ 1977",
        "Quan hệ đối tác chiến lược với 16 nước, đối tác toàn diện với 11 nước",
        "Chủ trì APEC 2006, ASEM 2010, đăng cai SEA Games, ASIAD",
        "Mặt trận Tổ quốc Việt Nam - tập hợp các tầng lớp nhân dân",
        "Chính sách đối ngoại 'Cây tre Việt Nam' - vừa vững vàng vừa mềm mại"
      ],
      image: "/assets/images/arc1/outcomes/paris-strategic-respect.jpg"
    }
  ];

  const inspirationalQuotes = [
    "Đoàn kết, đoàn kết, đại đoàn kết! Thành công, thành công, đại thành công!",
    "Không có gì quý hơn độc lập tự do",
    "Dân ta phải thật đoàn kết. Đoàn kết thì ta sống, chia rẽ thì ta chết",
    "Đoàn kết quốc tế là sức mạnh to lớn của các dân tộc yêu chuộng hòa bình"
  ];

  // Tổng quan (dịch từ mô tả người dùng)
  const leaderOverview = {
    keyThemes: [
      "Lãnh tụ cách mạng, người đặt nền móng cho Việt Nam hiện đại",
      "Kiến trúc sư của khối đại đoàn kết dân tộc và phong trào giành độc lập",
      "Chiến lược gia ngoại giao đề cao nhân nghĩa và giải pháp hòa bình thay vì bạo lực",
      "Nhà tư tưởng về đoàn kết, gắn bó các tầng lớp xã hội",
      "Người cổ vũ hợp tác quốc tế trong sự nghiệp giải phóng dân tộc",
    ],
    achievements: [
      "Lãnh đạo phong trào giành độc lập của Việt Nam",
      "Xây dựng chiến lược đại đoàn kết toàn dân tộc",
      "Đặt nền tảng nguyên lý cho con đường xã hội chủ nghĩa Việt Nam",
      "Xây dựng đường lối ngoại giao lấy nhân nghĩa làm gốc, hạn chế bạo lực",
    ],
    philosophy: [
      "Nhấn mạnh sự thống nhất giữa 'dân' và 'nhân dân'",
      "Chủ trương không phân biệt (giàu nghèo, tuổi tác, giới tính, địa vị xã hội)",
      "Kêu gọi phát huy sức mạnh tập thể từ sự đa dạng",
    ],
    timeline: [
      { year: "1995", note: "Công bố các công trình chiến lược về đại đoàn kết dân tộc" },
      { year: "2002–2011", note: "Xuất bản các bộ sưu tập lớn về Toàn tập và tư tưởng ngoại giao của Người" },
      { year: "Hiện nay", note: "Tư tưởng của Người vẫn có ý nghĩa sâu sắc đối với đời sống chính trị Việt Nam hiện đại" },
    ],
  } as const;

  // Animation effect for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.getAttribute('data-section-index') || '0')
            setVisibleSections(prev => [...new Set([...prev, sectionIndex])])
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const sectionElements = document.querySelectorAll('[data-section-index]')
    sectionElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Rotating quotes
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 4000);
    return () => clearInterval(quoteInterval);
  }, [inspirationalQuotes.length]);

  const openSectionModal = (section: ChapterSection) => {
    setSelectedSection(section)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedSection(null)
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
                Chương 5: Tư Tưởng Hồ Chí Minh
              </h1>
              <h2 className="mt-4 text-2xl md:text-3xl font-medium text-primary">
                Về Đại Đoàn Kết Toàn Dân Tộc Và Đoàn Kết Quốc Tế
              </h2>
              <p className="mt-6 md:mt-8 text-base md:text-lg text-pretty max-w-2xl mx-auto opacity-0 animate-slide-up-delayed">
                Khám phá tư tưởng sâu sắc của Bác Hồ về sức mạnh đoàn kết dân tộc và tinh thần hợp tác quốc tế
              </p>
            </div>

            {/* Rotating Quotes */}
            <div className="text-center py-8 relative">
              <div className="h-16 flex items-center justify-center">
                {inspirationalQuotes.map((quote, index) => (
                  <div 
                    key={index} 
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
                      index === currentQuoteIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <blockquote className="text-lg md:text-xl italic text-primary font-medium max-w-4xl">
                      "{quote}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>

            {/* Tổng quan: Chủ đề, Thành tựu, Triết lý, Mốc thời gian */}
            <div className="py-6 md:py-10">
              <div className="bg-background/80 backdrop-blur-sm border rounded-xl p-6 md:p-8 shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Tổng quan: Lãnh đạo, Thành tựu, Triết lý và Mốc thời gian
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm md:text-base">
                    Bức tranh khái quát bổ sung cho Chương 5 về đại đoàn kết và đoàn kết quốc tế
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Key Themes */}
                  <div className="rounded-lg border bg-white/70 p-5 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-primary text-lg mb-3">Chủ đề chính</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {leaderOverview.keyThemes.map((t, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Major Achievements */}
                  <div className="rounded-lg border bg-white/70 p-5 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-blue-600 text-lg mb-3">Thành tựu nổi bật</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {leaderOverview.achievements.map((a, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Philosophy */}
                  <div className="rounded-lg border bg-white/70 p-5 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-emerald-600 text-lg mb-3">Triết lý cốt lõi</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {leaderOverview.philosophy.map((p, i) => (
                        <li key={i} className="flex gap-2 items-start">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline */}
                  <div className="rounded-lg border bg-white/70 p-5 hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-purple-600 text-lg mb-3">Các mốc thời gian</h4>
                    <ol className="relative border-s-2 border-purple-200 ps-4 space-y-4">
                      {leaderOverview.timeline.map((item, i) => (
                        <li key={i} className="ms-2">
                          <div className="absolute -start-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                          <div className="inline-flex items-center gap-2">
                            <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                              {item.year}
                            </span>
                            <span className="text-sm text-gray-700">{item.note}</span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Khái quát tư tưởng đại đoàn kết của Hồ Chí Minh + 3D model */}
            <div className="py-4 md:py-8">
              <div className="rounded-xl border bg-gradient-to-br from-primary/5 via-blue-50/30 to-emerald-50/30 p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Text content */}
                  <div className="lg:col-span-7">
                    <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4">
                      Khái quát tư tưởng đại đoàn kết của Hồ Chí Minh
                    </h3>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p>
                        Hồ Chí Minh (1890–1969) là lãnh tụ vĩ đại của dân tộc Việt Nam, nhà tư tưởng lớn, người chủ xướng và phát triển tư tưởng đại đoàn kết toàn dân tộc. Theo tư tưởng Hồ Chí Minh, đại đoàn kết là vấn đề sống còn, là cội nguồn sức mạnh đưa cách mạng Việt Nam đến thành công. Người cho rằng để xây dựng khối đại đoàn kết phải lấy lợi ích chung làm điểm quy tụ, tôn trọng những lợi ích khác biệt chính đáng, kế thừa truyền thống yêu nước, nhân nghĩa, đoàn kết của dân tộc. Hồ Chí Minh nhấn mạnh vai trò then chốt của nhân dân — chủ thể quyết định mọi thắng lợi, đồng thời đề cao sự khoan dung, độ lượng, niềm tin sâu sắc vào nhân dân.
                      </p>
                      <p>
                        Trong suốt sự nghiệp cách mạng, Hồ Chí Minh luôn khuyến khích xây dựng Mặt trận dân tộc thống nhất trên nền tảng liên minh công — nông — trí thức, dưới sự lãnh đạo của Đảng, hoạt động theo nguyên tắc hiệp thương dân chủ. Qua các thời kỳ khác nhau, Mặt trận có thể thay đổi tên gọi nhưng bản chất vẫn không đổi — là nơi quy tụ, tập hợp đông đảo giai cấp, tầng lớp, dân tộc, tôn giáo, đảng phái, tổ chức yêu nước ở trong và ngoài nước vì mục tiêu độc lập dân tộc, hạnh phúc của nhân dân.
                      </p>
                      <p>
                        Tư tưởng đại đoàn kết của Hồ Chí Minh không tách rời với đoàn kết quốc tế, kết hợp sức mạnh dân tộc với sức mạnh thời đại, tạo nên nguồn lực vô địch giúp cách mạng Việt Nam giữ vững độc lập, phát triển và góp phần vào lý luận cách mạng thế giới.
                      </p>
                    </div>
                  </div>
                  {/* 3D model viewer */}
                  <div className="lg:col-span-5">
                    <div className="relative rounded-xl overflow-hidden ring-1 ring-black/10 shadow-xl">
                      {/* Modern stylized Vietnamese flag: red gradient field */}
                      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#B40018] via-[#D81E24] to-[#E71D2B]" />
                      {/* Soft vignette edges to focus the model */}
                      <div className="absolute inset-0 z-0" style={{
                        background: 'radial-gradient(80% 80% at 50% 45%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.25) 100%)'
                      }} />
                      {/* Centered golden star with glow */}
                      <div className="absolute inset-0 z-0 flex items-center justify-center">
                        <div className="relative" style={{ width: '62%', maxWidth: 520 }}>
                          <div className="absolute -inset-6 rounded-full blur-2xl opacity-40" style={{
                            background: 'radial-gradient(circle, rgba(255,221,0,0.55) 0%, rgba(255,221,0,0) 70%)'
                          }} />
                          <svg viewBox="-1 -1 2 2" className="relative block w-full h-auto opacity-95">
                            <polygon fill="#FFDD00" points="0,-1 0.2245,-0.309 0.9511,-0.309 0.3633,0.118 0.5878,0.809 0,0.381 -0.5878,0.809 -0.3633,0.118 -0.9511,-0.309 -0.2245,-0.309"/>
                          </svg>
                        </div>
                      </div>
                      <div className="relative z-10 p-3">
                      <ModelViewer
                        src="/assets/images/tuongbacho.glb"
                        alt="Tượng Bác Hồ"
                          cameraControls
                          autoRotate
                          exposure="0.6"
                          shadowIntensity="0.95"
                          shadowSoftness="0.95"
                          toneMapping="aces"
                          environmentImage="neutral"
                          cameraOrbit="0deg 75deg 95%"
                          fieldOfView="28deg"
                          style={{ width: '100%', height: '460px', backgroundColor: 'transparent' }}
                          interactionPrompt="none"
                        ar
                      />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Mẫu 3D minh họa — kéo xoay để quan sát.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sections Container - Horizontal Grid Layout (lg: 6 cols, each card spans 2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8 pb-12">
              {chapterSections.map((section, index) => (
                <div 
                  key={section.id}
                  data-section-index={index}
                  className={`transform transition-all duration-1000 lg:col-span-2 ${
                    visibleSections.includes(index) 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-20 opacity-0'
                  } ${
                    // Center the last row when it has two items (for lg: 3 columns)
                    chapterSections.length % 3 === 2 && index === chapterSections.length - 2
                      ? 'lg:col-start-2'
                      : ''
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div 
                    className="group bg-background/80 backdrop-blur-sm border rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden h-full flex flex-col"
                    onClick={() => openSectionModal(section)}
                  >
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br from-primary via-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
                    
                    <div className="space-y-4 relative z-10 flex-1 flex flex-col">
                      <div className="text-center">
                        <span className="inline-block px-4 py-2 text-sm font-semibold bg-primary/10 text-primary rounded-full">
                          Phần {section.id}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-center text-balance group-hover:text-primary transition-colors duration-300 min-h-[3rem] flex items-center justify-center">
                        {section.title}
                      </h3>
                      
                      {/* Image */}
                      {section.image && (
                        <div className="rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={section.image} 
                            alt={section.title}
                            className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                          />
                        </div>
                      )}
                      
                      <p className="text-muted-foreground text-center leading-relaxed text-sm group-hover:text-foreground transition-colors duration-300 flex-1">
                        {section.content.length > 120 ? section.content.substring(0, 120) + '...' : section.content}
                      </p>
                      
                      {/* Key Points Preview */}
                      <div className="space-y-2 text-xs text-muted-foreground">
                        {section.keyPoints.slice(0, 2).map((point, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                            <span className="truncate">{point}</span>
                          </div>
                        ))}
                        {section.keyPoints.length > 2 && (
                          <div className="text-primary/70 text-center mt-2">
                            +{section.keyPoints.length - 2} điểm khác...
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center text-xs text-primary/70 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 mt-auto">
                        Nhấp để tìm hiểu chi tiết...
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="text-center py-12 md:py-16">
              <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-2xl md:text-3xl font-medium text-primary">
                  Giá Trị Vĩnh Hằng Của Tư Tưởng Đoàn Kết
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Tư tưởng Hồ Chí Minh về đại đoàn kết toàn dân tộc và đoàn kết quốc tế không chỉ là di sản 
                  lịch sử quý báu mà còn là kim chỉ nam sáng ngời cho công cuộc xây dựng và phát triển 
                  đất nước trong thời đại mới. Những nguyên lý này tiếp tục định hướng Việt Nam trong 
                  hành trình hội nhập quốc tế và xây dựng một cộng đồng các dân tộc hòa bình, hợp tác.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-primary/5 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">95</div>
                    <div className="text-sm text-muted-foreground">Năm từ khi Bác sinh</div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">54</div>
                    <div className="text-sm text-muted-foreground">Dân tộc trong khối đoàn kết</div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">190+</div>
                    <div className="text-sm text-muted-foreground">Quốc gia có quan hệ ngoại giao</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal for section details */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={selectedSection?.title}
      >
        {selectedSection && (
          <div className="space-y-8">
            {/* Header Section with Image */}
            {selectedSection.image && (
              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={selectedSection.image} 
                  alt={selectedSection.title}
                  className="w-full h-48 md:h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                    Phần {selectedSection.id}
                  </span>
                </div>
              </div>
            )}
            
            {/* Content Description */}
            <div className="bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-lg p-6">
              <h4 className="font-bold text-lg mb-3 text-primary">Nội Dung Chính:</h4>
              <p className="text-base leading-relaxed text-gray-700">{selectedSection.content}</p>
            </div>
            
            {/* Two Column Layout for Points and Examples */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Key Points */}
              <div className="bg-white rounded-lg border border-primary/20 p-6 shadow-sm">
                <h4 className="font-bold text-lg mb-4 text-primary flex items-center">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                  Những Điểm Chính
                </h4>
                <ul className="space-y-3">
                  {selectedSection.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3 group">
                      <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold mt-0.5 flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Examples */}
              <div className="bg-white rounded-lg border border-blue-500/20 p-6 shadow-sm">
                <h4 className="font-bold text-lg mb-4 text-blue-600 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Ví Dụ Minh Họa
                </h4>
                <ul className="space-y-3">
                  {selectedSection.examples.map((example, index) => (
                    <li key={index} className="flex items-start space-x-3 group">
                      <span className="w-6 h-6 bg-blue-500/10 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5 flex-shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        {index + 1}
                      </span>
                      <span className="text-sm leading-relaxed">{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Historical Context Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border-l-4 border-primary">
              <h4 className="font-bold text-lg mb-3 text-gray-800">Ý Nghĩa Lịch Sử:</h4>
              <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                {selectedSection.id === 1 && (
                  <>
                    <p className="italic">
                      "Trước cách mạng Tháng Tám và trong kháng chiến, thì nhiệm vụ tuyên huấn là làm cho đồng bào các dân tộc hiểu được mấy việc: Một là đoàn kết. Hai là làm cách mạng hay kháng chiến để đòi độc lập." - Hồ Chí Minh (1963)
                    </p>
                    <p>
                      Tư tưởng đại đoàn kết của Hồ Chí Minh đã trở thành nền tảng cho sự thống nhất dân tộc trong suốt quá trình đấu tranh giải phóng và xây dựng đất nước. Việt Minh được thành lập năm 1941 là biểu hiện rõ nét nhất của tư tưởng này.
                    </p>
                  </>
                )}
                {selectedSection.id === 2 && (
                  <>
                    <p className="italic">
                      "Cách mạng Việt Nam là một bộ phận của cách mạng thế giới" - đây là quan điểm nhất quán của Hồ Chí Minh về đoàn kết quốc tế.
                    </p>
                    <p>
                      Nguyên tắc đoàn kết quốc tế của Hồ Chí Minh đã định hình chính sách đối ngoại Việt Nam, tạo nên những mối quan hệ bền vững với các quốc gia trên thế giới. Từ việc thành lập Đảng Cộng sản Pháp (1920) đến Hội nghị Bandung (1955), Người luôn thể hiện tinh thần quốc tế chân chính.
                    </p>
                  </>
                )}
                {selectedSection.id === 3 && (
                  <>
                    <p className="italic">
                      Hồ Chí Minh nhấn mạnh: "Phải lấy lợi ích chung làm điểm quy tụ, đồng thời tôn trọng những lợi ích khác biệt chính đáng" - nguyên tắc vàng trong xây dựng đại đoàn kết.
                    </p>
                    <p>
                      Các điều kiện xây dựng khối đại đoàn kết mà Bác Hồ đề ra không chỉ là lý thuyết mà được thực thi thành công trong thực tiễn cách mạng Việt Nam, từ Cách mạng Tháng Tám đến thời kỳ đổi mới.
                    </p>
                  </>
                )}
                {selectedSection.id === 4 && (
                  <>
                    <p className="italic">
                      "Đặt lợi ích dân tộc lên trên hết" - đây là nguyên tắc cốt lõi trong tư tưởng đoàn kết của Hồ Chí Minh, thể hiện qua mọi quyết định chính trị quan trọng.
                    </p>
                    <p>
                      Phương pháp "vừa đấu tranh vừa đoàn kết" của Bác Hồ đã được áp dụng hiệu quả trong các cuộc đàm phán với Pháp (1946), với Mỹ (Paris 1968-1973), và trong chính sách đối nội với các tầng lớp nhân dân.
                    </p>
                  </>
                )}
                {selectedSection.id === 5 && (
                  <>
                    <p className="italic">
                      "Độc lập, tự chủ, hòa bình, hữu nghị, hợp tác và phát triển" - chính sách đối ngoại của Việt Nam hiện nay thể hiện tinh thần tư tưởng Hồ Chí Minh.
                    </p>
                    <p>
                      Tư tưởng đoàn kết của Hồ Chí Minh tiếp tục soi sáng con đường phát triển của Việt Nam trong kỷ nguyên mới. Chính sách "Cây tre Việt Nam" trong đối ngoại và "Khối đại đoàn kết toàn dân tộc" trong đối nội là những biểu hiện sinh động của tư tưởng này.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

export default PresentationPage