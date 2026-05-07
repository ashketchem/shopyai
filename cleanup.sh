#!/bin/bash

echo "🛑 Stopping ShopYAI Application..."
echo ""

docker-compose down -v

echo ""
echo "✅ All containers stopped and volumes removed."
echo "💾 Database data has been cleaned."
