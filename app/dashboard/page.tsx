"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Download,
  Plus,
  Bell,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Palette,
  ImageIcon,
  Star,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"

export default function Dashboard() {
  const [userRole, setUserRole] = useState("staff") // admin, designer, staff
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Yêu cầu thiết kế mới",
      message: "Có yêu cầu thiết kế banner cho chiến dịch mùa hè",
      type: "info",
      time: "5 phút trước",
      isRead: false,
    },
    {
      id: 2,
      title: "Thiết kế hoàn thành",
      message: "Logo phiên bản mới đã được hoàn thành",
      type: "success",
      time: "1 giờ trước",
      isRead: false,
    },
  ])

  const stats = {
    totalRequests: 24,
    pendingRequests: 8,
    completedRequests: 16,
    totalAssets: 156,
  }

  const recentRequests = [
    {
      id: 1,
      title: "Banner quảng cáo sản phẩm mới",
      status: "Đang xử lý",
      priority: "high",
      deadline: "2024-01-15",
      requester: "Nguyễn Văn A",
      description: "Mô tả banner quảng cáo sản phẩm mới",
      purpose: "Quảng cáo sản phẩm",
    },
    {
      id: 2,
      title: "Thiết kế brochure công ty",
      status: "Hoàn thành",
      priority: "medium",
      deadline: "2024-01-10",
      requester: "Trần Thị B",
      description: "Mô tả thiết kế brochure công ty",
      purpose: "Giới thiệu công ty",
    },
    {
      id: 3,
      title: "Logo sự kiện cuối năm",
      status: "Chờ xử lý",
      priority: "urgent",
      deadline: "2024-01-20",
      requester: "Lê Văn C",
      description: "Mô tả logo sự kiện cuối năm",
      purpose: "Quảng bá sự kiện",
    },
  ]

  const featuredAssets = [
    {
      id: 1,
      title: "Logo chính thức Vĩnh Lộc",
      category: "Logo",
      downloads: 45,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Bộ font chữ thương hiệu",
      category: "Typography",
      downloads: 32,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Bảng màu thương hiệu 2024",
      category: "Colors",
      downloads: 28,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const showcaseItems = [
    {
      id: 1,
      title: "Thiết kế poster sự kiện",
      designer: "Nguyễn Thiết Kế",
      category: "Poster",
      views: 234,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: "Banner website mới",
      designer: "Trần Sáng Tạo",
      category: "Web Design",
      views: 189,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: "Thiết kế bao bì sản phẩm",
      designer: "Lê Nghệ Thuật",
      category: "Packaging",
      views: 156,
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Chờ xử lý":
        return "bg-yellow-100 text-yellow-800"
      case "Đang xử lý":
        return "bg-blue-100 text-blue-800"
      case "Hoàn thành":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const [showCreateRequestDialog, setShowCreateRequestDialog] = useState(false)
  const [showRequestDetailDialog, setShowRequestDetailDialog] = useState(false)
  const [showEditRequestDialog, setShowEditRequestDialog] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showChangePasswordDialog, setShowChangePasswordDialog] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    purpose: "",
    deadline: "",
    priority: "medium",
  })

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const handleCreateRequest = async () => {
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newRequest, requested_by: 1 }),
      })
      if (response.ok) {
        setShowCreateRequestDialog(false)
        setNewRequest({ title: "", description: "", purpose: "", deadline: "", priority: "medium" })
        // Refresh data
      }
    } catch (error) {
      console.error("Error creating request:", error)
    }
  }

  const handleViewDetail = (request) => {
    setSelectedRequest(request)
    setShowRequestDetailDialog(true)
  }

  const handleEditRequest = (request) => {
    setSelectedRequest(request)
    setNewRequest({
      title: request.title,
      description: request.description,
      purpose: request.purpose,
      deadline: request.deadline,
      priority: request.priority,
    })
    setShowEditRequestDialog(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Vĩnh Lộc Brand</h1>
                <p className="text-sm text-gray-500">Hệ thống quản lý thương hiệu</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Tìm kiếm..." className="pl-10 w-64" />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-5 h-5" />
                    {notifications.filter((n) => !n.isRead).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications.filter((n) => !n.isRead).length}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b">
                    <h4 className="font-semibold">Thông báo</h4>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 border-b hover:bg-gray-50 ${!notification.isRead ? "bg-blue-50" : ""}`}
                      >
                        <h5 className="font-medium text-sm">{notification.title}</h5>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">A</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Admin User</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
                    <User className="w-4 h-4 mr-2" />
                    Thông tin cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowChangePasswordDialog(true)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Đổi mật khẩu
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tổng yêu cầu</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalRequests}</p>
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
                  <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pendingRequests}</p>
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
                  <p className="text-sm font-medium text-gray-600">Hoàn thành</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completedRequests}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Tài liệu</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.totalAssets}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="requests">Yêu cầu thiết kế</TabsTrigger>
            <TabsTrigger value="assets">Tài liệu thương hiệu</TabsTrigger>
            <TabsTrigger value="showcase">Trưng bày</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Requests */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Yêu cầu gần đây</CardTitle>
                      <CardDescription>Các yêu cầu thiết kế mới nhất</CardDescription>
                    </div>
                    <Dialog open={showCreateRequestDialog} onOpenChange={setShowCreateRequestDialog}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Tạo yêu cầu
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentRequests.map((request) => (
                        <div
                          key={request.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{request.title}</h4>
                            <p className="text-sm text-gray-500">Yêu cầu bởi: {request.requester}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                              <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Hạn: {request.deadline}</p>
                            <Button variant="ghost" size="sm" className="mt-2">
                              Xem chi tiết
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông báo</CardTitle>
                  <CardDescription>Cập nhật mới nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border ${!notification.isRead ? "bg-blue-50 border-blue-200" : "bg-gray-50"}`}
                      >
                        <h5 className="font-medium text-sm text-gray-900">{notification.title}</h5>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
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
                <CardTitle>Quản lý yêu cầu thiết kế</CardTitle>
                <CardDescription>Theo dõi và quản lý tất cả yêu cầu thiết kế</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex space-x-2">
                    <Input placeholder="Tìm kiếm yêu cầu..." className="w-64" />
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Lọc
                    </Button>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo yêu cầu mới
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{request.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span>Yêu cầu bởi: {request.requester}</span>
                            <span>•</span>
                            <span>Hạn: {request.deadline}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                            <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetail(request)}>
                            Xem
                          </Button>
                          <Button size="sm" onClick={() => handleEditRequest(request)}>
                            Chỉnh sửa
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets">
            <Card>
              <CardHeader>
                <CardTitle>Tài liệu thương hiệu</CardTitle>
                <CardDescription>Quản lý và truy cập tài liệu thương hiệu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredAssets.map((asset) => (
                    <div key={asset.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gray-100">
                        <img
                          src={asset.image || "/placeholder.svg"}
                          alt={asset.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{asset.title}</h3>
                        <div className="flex justify-between items-center">
                          <Badge variant="secondary">{asset.category}</Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Download className="w-4 h-4 mr-1" />
                            {asset.downloads}
                          </div>
                        </div>
                        <Button className="w-full mt-3" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Tải xuống
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="showcase">
            <Card>
              <CardHeader>
                <CardTitle>Trưng bày sản phẩm thiết kế</CardTitle>
                <CardDescription>Những sản phẩm thiết kế nổi bật của đội ngũ</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {showcaseItems.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gray-100">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">Thiết kế bởi: {item.designer}</p>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">{item.category}</Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="w-4 h-4 mr-1" />
                            {item.views} lượt xem
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
