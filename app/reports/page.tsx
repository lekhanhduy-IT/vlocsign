"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { ArrowLeft, Download, TrendingUp, TrendingDown, Users, FileText, Clock } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  const monthlyData = [
    { month: "T1", requests: 12, completed: 10, pending: 2 },
    { month: "T2", requests: 18, completed: 15, pending: 3 },
    { month: "T3", requests: 24, completed: 20, pending: 4 },
    { month: "T4", requests: 16, completed: 14, pending: 2 },
    { month: "T5", requests: 28, completed: 25, pending: 3 },
    { month: "T6", requests: 32, completed: 28, pending: 4 },
  ]

  const statusData = [
    { name: "Hoàn thành", value: 65, color: "#10B981" },
    { name: "Đang xử lý", value: 20, color: "#3B82F6" },
    { name: "Chờ xử lý", value: 12, color: "#F59E0B" },
    { name: "Từ chối", value: 3, color: "#EF4444" },
  ]

  const departmentData = [
    { department: "Marketing", requests: 45 },
    { department: "Sales", requests: 32 },
    { department: "HR", requests: 18 },
    { department: "IT", requests: 12 },
    { department: "Operations", requests: 8 },
  ]

  const performanceData = [
    { designer: "Nguyễn Thiết Kế", completed: 28, avgTime: "2.5 ngày", rating: 4.8 },
    { designer: "Trần Sáng Tạo", completed: 24, avgTime: "3.1 ngày", rating: 4.6 },
    { designer: "Lê Nghệ Thuật", completed: 19, avgTime: "2.8 ngày", rating: 4.7 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Báo cáo thống kê</h1>
                <p className="text-sm text-gray-500">Phân tích hiệu suất và xu hướng</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Select defaultValue="6months">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 tháng</SelectItem>
                  <SelectItem value="3months">3 tháng</SelectItem>
                  <SelectItem value="6months">6 tháng</SelectItem>
                  <SelectItem value="1year">1 năm</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Xuất báo cáo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng yêu cầu</p>
                  <p className="text-3xl font-bold text-gray-900">156</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12% so với tháng trước</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tỷ lệ hoàn thành</p>
                  <p className="text-3xl font-bold text-green-600">87%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+5% so với tháng trước</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Thời gian TB</p>
                  <p className="text-3xl font-bold text-blue-600">2.8</p>
                  <p className="text-sm text-gray-500">ngày/yêu cầu</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">-0.3 ngày</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Người dùng hoạt động</p>
                  <p className="text-3xl font-bold text-purple-600">48</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+8 người dùng</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="requests">Yêu cầu</TabsTrigger>
            <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
            <TabsTrigger value="departments">Phòng ban</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Monthly Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Xu hướng theo tháng</CardTitle>
                  <CardDescription>Số lượng yêu cầu và hoàn thành theo tháng</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="requests" fill="#3B82F6" name="Yêu cầu" />
                      <Bar dataKey="completed" fill="#10B981" name="Hoàn thành" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Phân bố trạng thái</CardTitle>
                  <CardDescription>Tỷ lệ các trạng thái yêu cầu</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {statusData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">
                          {item.name}: {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Phân tích yêu cầu thiết kế</CardTitle>
                <CardDescription>Chi tiết về các yêu cầu thiết kế</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="requests" stroke="#3B82F6" strokeWidth={2} name="Tổng yêu cầu" />
                    <Line type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} name="Hoàn thành" />
                    <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={2} name="Đang xử lý" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Hiệu suất designer</CardTitle>
                <CardDescription>Đánh giá hiệu suất làm việc của từng designer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceData.map((designer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {designer.designer
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold">{designer.designer}</h3>
                          <p className="text-sm text-gray-600">{designer.completed} yêu cầu hoàn thành</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-sm text-gray-600">Thời gian TB</p>
                            <p className="font-semibold">{designer.avgTime}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Đánh giá</p>
                            <div className="flex items-center">
                              <span className="font-semibold mr-1">{designer.rating}</span>
                              <span className="text-yellow-500">★</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <CardTitle>Yêu cầu theo phòng ban</CardTitle>
                <CardDescription>Số lượng yêu cầu từ các phòng ban</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={departmentData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="department" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="requests" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
