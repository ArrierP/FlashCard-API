import cron from 'node-cron'
import nodemailer from 'nodemailer'
import Card from '../models/card_model.js'
import User from '../models/user_model.js'



const transport = nodemailer.createTransport({
    service: 'mail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
})


export const initReminderCron = async () => {
    cron.schedule('0 8 * * *', async () => {
        console.log('--- Scanning Database to Send reminder email ---');
        try {
            const today = new Date()

            const reviewCards = await Card.find({ nextReviewDate: { $lte: today } })

            if (reviewCards.length === 0) {
                console.log("Don't have any review cards to learn today.")
                return
            }

            const userCardCounts = reviewCards.reduce((acc, card) => {
                const uId = card.userId.toString()
                acc[uId] = (acc[uId] || 0) + 1
                return acc
            }, {})

            for (const [userId, count] of Object.entries(userCardCounts)) {
                const user = await User.findById(userId)

                if (user && user.email) {
                    const mailOptions = {
                        from: process.env.MAIL_USER,
                        to: user.mail,
                        subject: '🔔 [Flashcard] Đã đến giờ ôn tập từ vựng hôm nay rồi!',
                        html: `
                            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 500px; margin: 20px auto; padding: 25px; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eef2f5; color: #333333; line-height: 1.6;">
    
                                <!-- Tiêu đề chào hỏi -->
                                <h3 style="margin-top: 0; margin-bottom: 15px; color: #1a73e8; font-size: 22px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                                    Chào ${user.username}! 👋
                                </h3>
                                
                                <!-- Nội dung thông báo -->
                                <p style="margin: 0 0 12px 0; font-size: 15px; color: #4a5568;">
                                    Hệ thống gợi nhớ thông minh nhận thấy hôm nay bạn đang có 
                                    <span style="background-color: #e8f0fe; color: #1a73e8; padding: 2px 8px; border-radius: 6px; font-weight: bold; font-size: 16px;">
                                        ${count} từ vựng
                                    </span> cần ôn tập lại.
                                </p>
                                
                                <p style="margin: 0 0 25px 0; font-size: 15px; color: #4a5568;">
                                    Đừng để chuỗi ngày học tập bị ngắt quãng nhé. Hãy vào app và lật thẻ ngay nào!
                                </p>
                                
                                <!-- Nút kêu gọi hành động (CTA) - Bạn có thể thêm link vào thẻ <a> nếu cần -->
                                <div style="text-align: center; margin-bottom: 25px;">
                                    <a href="#" style="display: inline-block; padding: 12px 30px; background-color: #1a73e8; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 6px rgba(26, 115, 232, 0.2); transition: all 0.2s;">
                                        Học Ngay Thôi
                                    </a>
                                </div>
                                
                                <!-- Đường kẻ phân cách nhẹ -->
                                <hr style="border: 0; border-top: 1px solid #edf2f7; margin-bottom: 20px;">
                                
                                <!-- Chữ ký -->
                                <div style="font-size: 14px; color: #718096;">
                                    <p style="margin: 0 0 4px 0; font-style: italic;">Chúc bạn học tốt,</p>
                                    <p style="margin: 0; color: #1a73e8; font-weight: 600;">Đội ngũ Flashcard App</p>
                                </div>
                                
                            </div>
                        `
                    }
                }

                await transport.sendMail(mailOptions)
                console.log(`Successfully sending email reminder to user: ${user.email} (${count} words)`);
            }
        } catch (err) {
            console.error('Error occured while Cron Reminder in progress:', error.message);
        }
    })
}