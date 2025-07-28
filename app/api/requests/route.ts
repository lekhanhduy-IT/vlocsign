import { type NextRequest, NextResponse } from "next/server"
import mysql from "mysql2/promise"

const dbConfig = {
  host: "localhost",
  port: 8088,
  user: "root",
  password: "",
  database: "designweb",
}

export async function GET(request: NextRequest) {
  try {
    const connection = await mysql.createConnection(dbConfig)

    const [rows] = await connection.execute(`
      SELECT 
        dr.*,
        rs.name as status_name,
        rs.color as status_color,
        u1.full_name as requester_name,
        u2.full_name as assignee_name
      FROM design_requests dr
      LEFT JOIN request_statuses rs ON dr.status_id = rs.id
      LEFT JOIN users u1 ON dr.requested_by = u1.id
      LEFT JOIN users u2 ON dr.assigned_to = u2.id
      ORDER BY dr.created_at DESC
    `)

    await connection.end()

    return NextResponse.json({ requests: rows })
  } catch (error) {
    console.error("Get requests error:", error)
    return NextResponse.json({ error: "Lỗi khi lấy danh sách yêu cầu" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description, purpose, deadline, priority, requested_by } = await request.json()

    const connection = await mysql.createConnection(dbConfig)

    const [result] = await connection.execute(
      "INSERT INTO design_requests (title, description, purpose, deadline, priority, requested_by) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, purpose, deadline, priority, requested_by],
    )

    await connection.end()

    return NextResponse.json({
      success: true,
      message: "Tạo yêu cầu thành công",
      id: (result as any).insertId,
    })
  } catch (error) {
    console.error("Create request error:", error)
    return NextResponse.json({ error: "Lỗi khi tạo yêu cầu" }, { status: 500 })
  }
}
