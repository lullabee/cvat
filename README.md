# CVAT Local Setup

A **production-ready, fully functional CVAT setup** that anyone can use without the common issues encountered during local installation.

## 🚀 Quick Start

### 1. Clone this repository
```bash
git clone https://github.com/lullabee/cvat.git
cd cvat
```

### 2. Start CVAT
```bash
docker compose -f docker-compose.simple.yml up -d
```

### 3. Access CVAT
- **UI**: http://localhost:3000
- **API**: http://localhost:8080
- **Default Login**: admin/admin

### 4. Create admin user (optional)
```bash
docker compose -f docker-compose.simple.yml exec cvat_server python manage.py createsuperuser
```

## 📁 Repository Structure

```
📁 cvat/
├── 🐳 docker-compose.simple.yml    # Main CVAT setup with all services
├── 🐍 mock-opa.py                  # Mock OPA server (fixes permission errors)
├── 🟨 proxy-server.js              # Node.js proxy (handles login conversion)
├── 📦 package.json                 # Node.js dependencies for proxy
├── ⚙️ .env                         # Environment configuration
├── 📁 cvat_ui_files/               # Static CVAT UI files
└── 📝 .gitignore                   # Git ignore rules
```

## 🔧 Services Included

- **cvat_server**: Main CVAT backend (port 8080)
- **cvat_ui**: Node.js proxy serving UI (port 3000)
- **cvat_db**: PostgreSQL database
- **cvat_redis**: Redis cache
- **cvat_opa**: Mock OPA server for permissions

## 🛑 Stop CVAT

```bash
docker compose -f docker-compose.simple.yml down
```

## 📚 Original CVAT Repository

This setup is based on the official CVAT repository:
- **Original Repository**: https://github.com/cvat-ai/cvat
- **Official Website**: https://cvat.ai
- **Documentation**: https://opencv.github.io/cvat/

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This setup follows the same MIT License as the original CVAT project.

---

**Ready to annotate? Start CVAT and begin your computer vision projects! 🎯**
