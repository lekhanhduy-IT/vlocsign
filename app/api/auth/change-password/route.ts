import { type NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"

const dbConfig = {
  host: "localhost",
  port: 8088,
  user: "root",
  password: "",
  database: "designweb",
}

export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json()

    // Trong thực tế, bạn cần lấy user ID từ session/token
    const userId = 1 // Demo

    const connection = await mysql.createConnection(dbConfig)

    // Kiểm tra mật khẩu hiện tại
    const [rows] = await connection.execute("SELECT password FROM users WHERE id = ?", [userId])

    const users = rows as any[]
    if (users.length === 0) {
      await connection.end()
      return NextResponse.json({ error: "Người dùng không tồn tại" }, { status: 404 })
    }

    // Trong demo này, tôi sử dụng so sánh đơn giản
    // Trong thực tế, bạn nên sử dụng bcrypt
    if (currentPassword !== "admin123") {
      await connection.end()
      return NextResponse.json({ error: "Mật khẩu hiện tại không chính xác" }, { status: 401 })
    }

    // Cập nhật mật khẩu mới
    await connection.execute(
      "UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [newPassword, userId], // Trong thực tế, hash password trước khi lưu
    )

    await connection.end()

    return NextResponse.json({
      success: true,
      message: "Đổi mật khẩu thành công",
    })
  } catch (error) {
    console.error("Change password error:", error)
    return NextResponse.json({ error: "Lỗi hệ thống" }, { status: 500 })
  }
}
