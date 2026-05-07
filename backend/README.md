Backend README

## Backend Setup

Spring Boot REST API with PostgreSQL integration and caching.

### Requirements
- Java 17+
- Maven 3.6+
- PostgreSQL 12+

### Installation

1. Install dependencies:
```bash
mvn clean install
```

2. Configure database in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/shopyai
spring.datasource.username=postgres
spring.datasource.password=postgres
```

3. Run application:
```bash
mvn spring-boot:run
```

### API Endpoints

**Search Products:**
```
GET /api/products/search/{searchKey}
```
Returns cached products for search query.

**Save Single Product:**
```
POST /api/products/save?searchKey={searchKey}
Content-Type: application/json

{
  "platform": "Amazon",
  "productName": "Product Name",
  "price": "₹999",
  "productUrl": "https://...",
  "reviews": {
    "best": ["Great product"],
    "avg": ["Average quality"],
    "bad": ["Not good"]
  }
}
```

**Save Multiple Products:**
```
POST /api/products/save-multiple?searchKey={searchKey}
Content-Type: application/json

[
  { product1 },
  { product2 }
]
```

**Get by Platform:**
```
GET /api/products/{searchKey}/{platform}
```

**Health Check:**
```
GET /api/products/health
```

### Database Schema

```sql
CREATE TABLE products (
  id BIGSERIAL PRIMARY KEY,
  search_key VARCHAR(255) NOT NULL,
  platform VARCHAR(100) NOT NULL,
  product_name VARCHAR(500) NOT NULL,
  price VARCHAR(100) NOT NULL,
  product_url VARCHAR(1000) NOT NULL,
  reviews JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_search_key ON products(search_key);
CREATE INDEX idx_platform ON products(platform);
```

### Cache Configuration

Edit `application.properties`:
```properties
spring.cache.type=simple
```

Modify cache TTL by updating `ProductService`.

### Logging

View logs:
```bash
tail -f logs/application.log
```

### Build for Production

```bash
mvn clean package
java -jar target/shopyai-backend-1.0.0.jar
