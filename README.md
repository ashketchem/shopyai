# ShopYAI - Multi-Platform Product Price Scraper

![ShopYAI](https://img.shields.io/badge/ShopYAI-1.0.0-blue)
![Python](https://img.shields.io/badge/Python-3.11-green)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.1.5-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)

## 🎯 Overview

ShopYAI is a full-stack web scraper application that compares product prices and reviews across multiple e-commerce platforms. Built with Python Selenium, Spring Boot, and React with a beautiful glass-morphism UI.

### Key Features
- ✅ **Multi-Platform Scraping**: Amazon, Flipkart, BestBuy, eBay, Walmart
- ✅ **Smart Caching**: PostgreSQL-based caching for instant results
- ✅ **Categorized Reviews**: 4 Best, 4 Average, 4 Bad reviews per platform
- ✅ **Real-Time Search**: Glass-morphism UI with instant search
- ✅ **Price Comparison**: Side-by-side price comparison
- ✅ **One-Command Deployment**: Docker Compose ready

---

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git
- 4GB RAM minimum

### Installation & Run

```bash
git clone https://github.com/ashketchem/shopyai.git
cd shopyai
chmod +x start.sh
./start.sh
```

### Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Database**: localhost:5432

### Stop Application
```bash
./cleanup.sh
```

---

## 📊 Project Structure

```
shopyai/
├── backend/                    # Spring Boot REST API
│   ├── src/main/java/
│   │   ├── com/shopyai/
│   │   │   ├── controller/     # REST Controllers
│   │   │   ├── entity/         # JPA Entities
│   │   │   ├── repository/     # Data Access Layer
│   │   │   ├── service/        # Business Logic
│   │   │   └── ShopYAIApplication.java
│   ├── src/main/resources/
│   │   └── application.yml     # Spring Configuration
│   ├── pom.xml                 # Maven Dependencies
│   └── Dockerfile
│
├── scraper/                    # Python Selenium Scraper
│   ├── scraper.py              # Main Scraper Logic
│   ├── requirements.txt        # Python Dependencies
│   └── Dockerfile
│
├── frontend/                   # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx   # Search Component
│   │   │   ├── ProductCard.jsx # Product Display
│   │   │   └── ReviewModal.jsx # Reviews Modal
│   │   ├── App.jsx             # Main App
│   │   ├── App.css             # Styles
│   │   ├── main.jsx            # Entry Point
│   │   └── index.css           # Global Styles
│   ├── package.json            # NPM Dependencies
│   ├── vite.config.js          # Vite Configuration
│   ├── tailwind.config.js      # Tailwind CSS Config
│   ├── index.html              # HTML Template
│   └── Dockerfile
│
├── docker-compose.yml          # Multi-service Orchestration
├── start.sh                    # Startup Script
├── cleanup.sh                  # Cleanup Script
├── README.md                   # This File
└── SETUP.md                    # Setup Guide
```

---

## 🔗 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get product by ID |
| GET | `/api/products/search?query=name` | Search products |
| GET | `/api/products/cached/{query}` | Get cached product |
| POST | `/api/products` | Save new product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |
| GET | `/api/products/check/{query}` | Check if product exists |

### Example API Requests

**Search for cached product:**
```bash
curl http://localhost:8080/api/products/cached/iphone%2015
```

**Save product data:**
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "searchQuery": "iphone 15",
    "productName": "iPhone 15",
    "platforms": [
      {
        "platformName": "Amazon",
        "price": 79999,
        "productUrl": "https://amazon.in/...",
        "bestReviews": ["Great!", "Excellent!"],
        "avgReviews": ["Good", "Decent"],
        "badReviews": ["Not good", "Broken"]
      }
    ]
  }'
```

---

## 🗄️ Database Schema

### Products Table
```sql
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  search_query VARCHAR(255) NOT NULL UNIQUE,
  product_name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
```

### Platform Data Table
```sql
CREATE TABLE platform_data (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id),
  platform_name VARCHAR(100) NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  product_url TEXT NOT NULL,
  best_reviews TEXT[],
  avg_reviews TEXT[],
  bad_reviews TEXT[],
  scrape_date TIMESTAMP NOT NULL
);
```

---

## 🐍 Python Scraper Details

### Supported Platforms
1. **Amazon** - amazon.in
2. **Flipkart** - flipkart.com
3. **BestBuy** - bestbuy.com
4. **eBay** - ebay.com
5. **Walmart** - walmart.com

### Features
- Headless Chrome browser automation
- Smart review categorization (5-star, 3-star, 1-star)
- Automatic API integration
- Error handling and logging
- User-agent rotation
- Timeout and retry mechanisms

---

## 🎨 Frontend Features

### Glass-Morphism UI
- Modern, sleek design inspired by BuyHatke
- Gradient backgrounds
- Backdrop blur effects
- Smooth animations
- Responsive layout

### Components
- **SearchBar**: Product search with loading state
- **ProductCard**: Platform pricing display
- **ReviewModal**: Categorized reviews modal
- **Error Alerts**: User-friendly error messages

---

## ⏱️ Performance Metrics

| Operation | Time |
|-----------|------|
| First Search | 15-30 seconds |
| Cached Search | <2 seconds |
| UI Response | <1 second |
| Database Query | <100ms |

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
docker-compose down
docker ps -a
docker kill <container_id>
```

### Database Connection Error
```bash
docker-compose logs postgres
docker-compose restart postgres
```

### Frontend Not Loading
```bash
docker-compose logs frontend
docker-compose rebuild frontend
```

### Scraper Not Finding Elements
- Wait 15-30 seconds for first scrape
- Check internet connection
- Verify CSS selectors in scraper.py

---

## 📋 System Requirements

- **OS**: Linux, macOS, Windows (WSL2)
- **RAM**: 4GB minimum
- **Storage**: 5GB free space
- **Docker**: 20.10+
- **Docker Compose**: 2.0+

---

## 🔐 Security

- ✅ Input validation on all endpoints
- ✅ CORS configuration
- ✅ SQL injection prevention
- ✅ User-agent rotation in scraper
- ✅ Rate limiting ready
- ✅ No sensitive data in logs

---

## 📈 Future Enhancements

- [ ] User authentication
- [ ] Price alert notifications
- [ ] Browser extension
- [ ] Mobile app
- [ ] Advanced filtering
- [ ] Price history charts
- [ ] AI-powered recommendations
- [ ] Multi-language support

---

## 📝 License

MIT License - See LICENSE file

---

## 👨‍💻 Development

### Manual Setup

**Backend:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Scraper:**
```bash
cd scraper
pip install -r requirements.txt
python scraper.py
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📞 Support

For issues and questions:
- Open GitHub Issues
- Check SETUP.md for detailed setup guide
- Review Troubleshooting section

---

**Made with ❤️ by ShopYAI Team**

```
  ____  _               __   _   _
 / ___|| |__   ___  ___|  \ / | |_| |
 \___ \| '_ \ / _ \/ __|| |\| |  _  |
  ___) | | | | (_) \__ \| | \ | | | |
 |____/|_| |_|\___/|___/|_| \_|_| |_|

```
