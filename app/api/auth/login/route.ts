import { type NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"

// Kết nối database
const dbConfig = {
  host: "localhost",
  port: 8088,
  user: "root",
  password: "",
  database: "designweb",
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    const connection = await mysql.createConnection(dbConfig)

    // Kiểm tra thông tin đăng nhập
    const [rows] = await connection.execute(
      "SELECT u.*, r.name as role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.username = ? AND u.is_active = 1",
      [username],
    )

    await connection.end()

    const users = rows as any[]

    if (users.length === 0) {
      return NextResponse.json({ error: "Tên đăng nhập không tồn tại" }, { status: 401 })
    }

    const user = users[0]

    // Trong thực tế, bạn nên sử dụng bcrypt để hash và verify password
    // Ở đây tôi sử dụng so sánh đơn giản cho demo
    if (password !== "admin123") {
      return NextResponse.json({ error: "Mật khẩu không chính xác" }, { status: 401 })
    }

    // Tạo session token (trong thực tế nên sử dụng JWT)
    const sessionData = {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      role: user.role_name,
      department: user.department,
    }

    return NextResponse.json({
      success: true,
      user: sessionData,
      message: "Đăng nhập thành công",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Lỗi hệ thống" }, { status: 500 })
  }
}
