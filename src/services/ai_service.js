import { GoogleGenerativeAI } from '@google/generative-ai'
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const generateFlashCardData = async (word) => {
    const prompt = `Bạn là một từ điển Anh-Việt thông minh. Hãy phân tích từ "${word}" và trả về một chuỗi JSON duy nhất (không bọc trong markdown \`\`\`json) theo cấu trúc chính xác sau:
    {
        "word": "${word}",
        "phonetic": "phiên âm quốc tế IPA của từ kèm dấu gạch chéo, ví dụ /pəˈtatoʊ/",
        "type": "chọn 1 trong các giá trị: noun, verb, adj, adv, phrase",
        "meaning": "nghĩa tiếng Việt ngắn gọn, súc tích nhất",
        "example": "một câu ví dụ tiếng Anh ngắn gọn, thực tế chứa từ đó",
        "exampleMeaning": "bản dịch tiếng Việt của câu ví dụ đó"
    }`;


    try {
        const model = ai.getGenerativeModel({ model: "gemini-3.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;

        // ĐÃ SỬA: Lấy text bằng hàm .text() chuẩn SDK
        let textOutput = response.text().trim();

        // ĐÃ SỬA: Dùng Regex dọn sạch khối gạch ```json và ``` nếu AI cố tình trả về dạng Markdown
        textOutput = textOutput.replace(/^```json\s*/i, '').replace(/```$/, '').trim();

        // Chuyển chuỗi sạch về JSON Object
        return JSON.parse(textOutput);
    } catch (err) {
        console.log("KEY HIỆN TẠI ĐANG LÀ:", process.env.GEMINI_API_KEY);
        console.error("LỖI CHI TIẾT GEMINI:", err);
        throw new Error("Cannot translate this word.")
    }
}

// THÊM MỚI: Hàm phân tích riêng cho Idiom
export const generateIdiomData = async (idiom) => {
    const prompt = `Bạn là một từ điển thành ngữ Anh-Việt thông minh. Hãy phân tích thành ngữ (Idiom) tiếng Anh "${idiom}" và trả về một chuỗi JSON duy nhất (không bọc trong markdown \`\`\`json) theo cấu trúc chính xác sau:
    {
        "word": "${idiom}",
        "phonetic": "phiên âm quốc tế IPA nếu có (hoặc để trống nếu là cụm dài)",
        "type": "phrase",
        "meaning": "nghĩa bóng/nghĩa thực tế của thành ngữ trong tiếng Việt",
        "context": "giải thích ngắn gọn về ngữ cảnh hoặc nguồn gốc sử dụng thành ngữ này",
        "example": "một câu ví dụ tiếng Anh ngắn gọn, thực tế có sử dụng thành ngữ này",
        "exampleMeaning": "bản dịch tiếng Việt của câu ví dụ đó"
    }`;

    try {
        const model = ai.getGenerativeModel({ model: "gemini-3.5-flash" }); // Đã đổi sang model 2026 mới nhất
        const result = await model.generateContent(prompt);
        const response = await result.response;

        let textOutput = response.text().trim();
        textOutput = textOutput.replace(/^```json\s*/i, '').replace(/```$/, '').trim();

        return JSON.parse(textOutput);
    } catch (err) {
        console.error("❌ LỖI GỌI GEMINI IDIOM:", err);
        throw new Error("Cannot analyze this idiom.");
    }
};