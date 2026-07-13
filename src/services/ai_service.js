import { GoogleGenerativeAI } from '@google/generative-ai'

const ai = new GoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY })

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
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })

        const textOutput = response.text.trim()
        return JSON.parse(textOutput)
    } catch (err) {
        throw new Error("Cannot translate this word.")
    }
} 