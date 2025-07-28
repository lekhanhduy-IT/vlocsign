"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, Flag, FileText, Download, MessageSquare } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface RequestDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: any
}

export function RequestDetailDialog({ open, onOpenChange, request }: RequestDetailDialogProps) {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Nguyễn Thiết Kế",
      content: "Đã nhận yêu cầu, sẽ bắt đầu thiết kế trong ngày hôm nay",
      time: "2 giờ trước",
      avatar: "NT",
    },
  ])

  if (!request) return null

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

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "Admin User",
        content: comment,
        time: "Vừa xong",
        avatar: "AU",
      }
      setComments([...comments, newComment])
      setComment("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{request.title}</DialogTitle>
          <DialogDescription>Chi tiết yêu cầu thiết kế #{request.id}</DialogDescription>
        </DialogHeader>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status and Priority */}
            <div className="flex items-center space-x-3">
              <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
              <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Mô tả chi tiết
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {request.description ||
                    "Thiết kế banner quảng cáo cho sản phẩm mới với phong cách hiện đại, màu sắc tươi sáng. Kích thước 1920x1080px, định dạng PNG và JPG."}
                </p>
              </div>
            </div>

            {/* Purpose */}
            {request.purpose && (
              <div>
                <h3 className="font-semibold mb-2">Mục đích sử dụng</h3>
                <p className="text-gray-600">{request.purpose}</p>
              </div>
            )}

            {/* Attachments */}
            <div>
              <h3 className="font-semibold mb-2">File đính kèm</h3>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">brief-design.pdf</p>
                      <p className="text-sm text-gray-500">2.4 MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Tải xuống
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" />
                Bình luận ({comments.length})
              </h3>

              <div className="space-y-4 mb-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-medium">{comment.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.time}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-medium">AU</span>
                </div>
                <div className="flex-1">
                  <Textarea
                    placeholder="Thêm bình luận..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleAddComment} className="mt-2" size="sm">
                    Gửi bình luận
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Request Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-4">Thông tin yêu cầu</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">Người yêu cầu:</span>
                  <span className="ml-auto font-medium">{request.requester}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">Hạn hoàn thành:</span>
                  <span className="ml-auto font-medium">{request.deadline}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Flag className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">Độ ưu tiên:</span>
                  <span className="ml-auto">
                    <Badge className={getPriorityColor(request.priority)} variant="outline">
                      {request.priority}
                    </Badge>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full">Cập nhật trạng thái</Button>
              <Button variant="outline" className="w-full bg-transparent">
                Chỉnh sửa yêu cầu
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Gán cho designer
              </Button>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="font-semibold mb-4">Lịch sử</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Yêu cầu được tạo</p>
                    <p className="text-xs text-gray-500">2 ngày trước</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Đang xử lý</p>
                    <p className="text-xs text-gray-500">1 ngày trước</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
          <Button>Lưu thay đổi</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
