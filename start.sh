#!/bin/bash

echo "🚀 Starting ShopYAI Application..."
echo ""

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "📦 Building and starting containers..."
docker-compose up --build -d

echo ""
echo "⏳ Waiting for services to start..."
sleep 30

echo ""
echo "✅ ShopYAI is running!"
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "📡 Backend API: http://localhost:8080/api"
echo "🗄️  Database: localhost:5432"
echo ""
echo "📝 To view logs: docker-compose logs -f"
echo "🛑 To stop: ./cleanup.sh"
