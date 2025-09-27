//the-diplomats-journeysrc/pages/AiDisclosurePage.tsx
import { HeroHeader } from '@/components/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';

export default function AiDisclosurePage() {
  return (
    <>
      <HeroHeader />
      <main className="flex justify-center items-start min-h-screen pt-24 bg-background/95">
        <Card className="w-full max-w-3xl mx-4 my-8 animate-fade-in">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 text-primary">
              <Bot className="w-12 h-12" />
            </div>
            <CardTitle className="text-3xl">Công Bố Về Hợp Tác Cùng AI</CardTitle>
            <CardDescription className="text-lg">
              Minh bạch trong quy trình sáng tạo và phát triển của nhóm em.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 text-left text-base leading-relaxed px-8 pb-8">
            <section>
              <h2 className="text-xl font-semibold mb-2 text-primary">Triết Lý của nhóm em về AI</h2>
              <p className="text-muted-foreground">
                "Hành Trình Nhà Ngoại Giao" được tạo ra nhờ sự kết hợp giữa sức sáng tạo của nhóm em và trí tuệ nhân tạo. nhóm em tin rằng AI là một công cụ mạnh mẽ giúp nâng cao quy trình phát triển, mở rộng tầm nhìn sáng tạo và mang lại trải nghiệm hấp dẫn hơn. Trang này trình bày chi tiết về những đóng góp của AI trong dự án.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 text-primary">Hình Ảnh Do AI Tạo Ra</h2>
              <p className="text-muted-foreground">
                Phần lớn hình ảnh lịch sử và chủ đề trong trò chơi được tạo ra bằng AI. Cách tiếp cận này cho phép nhóm em tạo ra một phong cách hình ảnh nhất quán, gợi cảm, phù hợp với bối cảnh lịch sử của trò chơi.
              </p>
              <ul className="list-disc list-inside mt-3 text-muted-foreground space-y-2">
                <li>
                  <strong>Công cụ sử dụng:</strong> Chủ yếu là Gemini để tạo hình ảnh.
                </li>
                <li>
                  <strong>Quy trình:</strong> nhóm em đã tạo và tinh chỉnh các câu lệnh (prompt) để tạo ra những hình ảnh thể hiện được không khí, bối cảnh và các tình tiết của câu chuyện. Quá trình này đòi hỏi sự định hướng, lựa chọn và giám sát kỹ lưỡng từ nhóm em để đảm bảo tính chính xác về mặt lịch sử và chủ đề.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 text-primary">Thiết Kế & Phát Triển Được AI Hỗ Trợ</h2>
              <p className="text-muted-foreground">
                AI cũng đóng vai trò quan trọng như một cộng tác viên trong giai đoạn thiết kế và lập trình của dự án.
              </p>
              <ul className="list-disc list-inside mt-3 text-muted-foreground space-y-2">
                <li>
                  <strong>Thiết kế cấu trúc trang:</strong> Các trợ lý AI của Gemini đã giúp lên ý tưởng và cấu trúc bố cục cho một số trang, bao gồm trang dòng thời gian và trang trình bày. Quá trình này bao gồm việc tạo ra các ý tưởng về tổ chức thành phần và luồng người dùng, sau đó được đội ngũ của nhóm em hoàn thiện và triển khai.
                </li>
                <li>
                  <strong>Tạo và tái cấu trúc mã nguồn:</strong> Các trợ lý lập trình AI của Gemini được sử dụng để tạo mã nguồn mẫu, đề xuất cấu trúc thành phần, tái cấu trúc các hàm phức tạp và hỗ trợ gỡ lỗi. Điều này giúp đẩy nhanh chu kỳ phát triển và cho phép nhóm em tập trung hơn vào logic cốt lõi của trò chơi và trải nghiệm người dùng.
                </li>
              </ul>
            </section>

             <section>
              <h2 className="text-xl font-semibold mb-2 text-primary">Sự Giám Sát của nhóm em</h2>
              <p className="text-muted-foreground">
                Cần lưu ý rằng tất cả nội dung do AI tạo ra—dù là hình ảnh hay mã nguồn—đều được nhóm em xem xét, chọn lọc và phê duyệt cuối cùng. Định hướng chiến lược, nội dung câu chuyện và việc triển khai cuối cùng đều do các nhà phát triển và thiết kế nhóm em thực hiện. AI đóng vai trò là một trợ lý đắc lực, không phải là sự thay thế cho óc sáng tạo và tư duy phản biện của nhóm em.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </>
  );
}