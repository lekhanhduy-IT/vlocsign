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
        ba.*,
        bc.name as category_name,
        u.full_name as uploader_name
      FROM brand_assets ba
      LEFT JOIN brand_categories bc ON ba.category_id = bc.id
      LEFT JOIN users u ON ba.uploaded_by = u.id
      ORDER BY ba.created_at DESC
    `)

    await connection.end()

    return NextResponse.json({ assets: rows })
  } catch (error) {
    console.error("Get assets error:", error)
    return NextResponse.json({ error: "Lỗi khi lấy danh sách tài liệu" }, { status: 500 })
  }
}
