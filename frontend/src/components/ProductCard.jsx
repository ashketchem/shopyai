import React from 'react'

function ProductCard({ platform, onViewReviews, onBuyNow }) {
  const getPlatformEmoji = (name) => {
    const emojis = {
      'Amazon': '🛒',
      'Flipkart': '📱',
      'BestBuy': '🖥️',
      'eBay': '🏷️',
      'Walmart': '🏪'
    }
    return emojis[name] || '🏬'
  }

  const getPlatformColor = (name) => {
    const colors = {
      'Amazon': 'from-orange-500 to-yellow-600',
      'Flipkart': 'from-blue-500 to-blue-600',
      'BestBuy': 'from-yellow-500 to-orange-600',
      'eBay': 'from-red-500 to-pink-600',
      'Walmart': 'from-blue-600 to-cyan-500'
    }
    return colors[name] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="card hover:shadow-2xl group transform hover:-translate-y-1 transition-all duration-300">
      <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${getPlatformColor(platform.platformName)} text-white font-semibold mb-4 text-sm`}>
        {getPlatformEmoji(platform.platformName)} {platform.platformName}
      </div>

      <div className="mb-6">
        <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text mb-2">
          ₹{platform.price?.toLocaleString() || 'N/A'}
        </div>
        <p className="text-slate-400 text-sm">Current Price</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(platform.bestReviews || []).length > 0 && (
          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold">⭐ {platform.bestReviews.length} Best Reviews</span>
        )}
        {(platform.avgReviews || []).length > 0 && (
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold">📊 {platform.avgReviews.length} Avg Reviews</span>
        )}
        {(platform.badReviews || []).length > 0 && (
          <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-semibold">⚠️ {platform.badReviews.length} Bad Reviews</span>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onViewReviews}
          className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-semibold"
        >
          📝 Reviews
        </button>
        <button
          onClick={onBuyNow}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold"
        >
          🛍️ Buy Now
        </button>
      </div>
    </div>
  )
}

export default ProductCard
