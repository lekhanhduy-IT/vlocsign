-- Tạo database
CREATE DATABASE IF NOT EXISTS designweb;
USE designweb;

-- Bảng vai trò người dùng
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng người dùng
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    role_id INT,
    avatar VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Bảng danh mục tài liệu thương hiệu
CREATE TABLE brand_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES brand_categories(id)
);

-- Bảng tài liệu thương hiệu
CREATE TABLE brand_assets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    category_id INT,
    uploaded_by INT,
    is_featured BOOLEAN DEFAULT FALSE,
    tags TEXT,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES brand_categories(id),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Bảng phân quyền truy cập tài liệu
CREATE TABLE asset_permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    asset_id INT,
    role_id INT,
    can_view BOOLEAN DEFAULT FALSE,
    can_download BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asset_id) REFERENCES brand_assets(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Bảng trạng thái yêu cầu
CREATE TABLE request_statuses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    color VARCHAR(7) DEFAULT '#6B7280',
    description TEXT
);

-- Bảng yêu cầu thiết kế
CREATE TABLE design_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    purpose TEXT,
    deadline DATE,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status_id INT DEFAULT 1,
    requested_by INT,
    assigned_to INT,
    project_tag VARCHAR(100),
    attachment_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (status_id) REFERENCES request_statuses(id),
    FOREIGN KEY (requested_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Bảng file thiết kế hoàn thành
CREATE TABLE design_deliverables (
    id INT PRIMARY KEY AUTO_INCREMENT,
    request_id INT,
    file_path VARCHAR(500) NOT NULL,
    file_name VARCHAR(200) NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    version VARCHAR(20) DEFAULT '1.0',
    notes TEXT,
    uploaded_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES design_requests(id),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Bảng thông báo
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    related_id INT,
    related_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Bảng sản phẩm trưng bày
CREATE TABLE showcase_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    image_path VARCHAR(500) NOT NULL,
    category VARCHAR(100),
    designer_id INT,
    is_featured BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (designer_id) REFERENCES users(id)
);

-- Chèn dữ liệu mẫu
INSERT INTO roles (name, description) VALUES
('admin', 'Quản trị viên hệ thống'),
('designer', 'Bộ phận thiết kế'),
('staff', 'Nhân viên phòng ban');

INSERT INTO request_statuses (name, color, description) VALUES
('Chờ xử lý', '#F59E0B', 'Yêu cầu mới được gửi'),
('Đang xử lý', '#3B82F6', 'Đang được thiết kế'),
('Chờ duyệt', '#8B5CF6', 'Chờ phê duyệt từ quản lý'),
('Hoàn thành', '#10B981', 'Đã hoàn thành và giao'),
('Từ chối', '#EF4444', 'Yêu cầu bị từ chối');

INSERT INTO brand_categories (name, description) VALUES
('Logo', 'Các phiên bản logo công ty'),
('Font chữ', 'Bộ font chính thức của công ty'),
('Màu sắc', 'Bảng màu thương hiệu'),
('Template', 'Mẫu thiết kế chuẩn'),
('Guidelines', 'Hướng dẫn sử dụng thương hiệu');

-- Tạo tài khoản admin mặc định (password: admin123)
INSERT INTO users (username, email, password, full_name, department, role_id) VALUES
('admin', 'admin@vinhloc.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'Quản trị viên', 'IT', 1),
('designer1', 'designer@vinhloc.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'Nguyễn Văn Thiết Kế', 'Design', 2),
('staff1', 'staff@vinhloc.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'Trần Thị Nhân Viên', 'Marketing', 3);
