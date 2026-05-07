import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import ProductCard from './components/ProductCard'
import ReviewModal from './components/ReviewModal'
import './App.css'

function App() {
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedReviews, setSelectedReviews] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)

  const handleSearch = async (productName) => {
    setLoading(true)
    setError(null)
    setSearchResults(null)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/products/cached/${productName.toLowerCase()}`)
      
      if (response.ok) {
        const data = await response.json()
        setSearchResults(data)
      } else {
        setError('Product not found in cache. Please try again.')
      }
    } catch (err) {
      setError('Failed to fetch product data. Please try again.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleViewReviews = (platformData) => {
    setSelectedReviews({
      platform: platformData.platformName,
      best: platformData.bestReviews || [],
      avg: platformData.avgReviews || [],
      bad: platformData.badReviews || []
    })
    setShowReviewModal(true)
  }

  const handleBuyNow = (url) => {
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="inline-block mb-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              🛍️ ShopYAI
            </h1>
          </div>
          <p className="text-slate-300 text-lg mt-2">Compare product prices across multiple platforms instantly</p>
        </header>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {error && (
          <div className="mt-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200">
            ⚠️ {error}
          </div>
        )}

        {loading && (
          <div className="mt-12 text-center">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <p className="text-slate-300 mt-4">Searching for best prices...</p>
            </div>
          </div>
        )}

        {searchResults && !loading && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-white mb-2">{searchResults.productName}</h2>
            <p className="text-slate-400 mb-8">Found {searchResults.platforms?.length || 0} results</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.platforms && searchResults.platforms.map((platform, idx) => (
                <ProductCard
                  key={idx}
                  platform={platform}
                  onViewReviews={() => handleViewReviews(platform)}
                  onBuyNow={() => handleBuyNow(platform.productUrl)}
                />
              ))}
            </div>
          </div>
        )}

        {!searchResults && !loading && !error && (
          <div className="mt-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-slate-400 text-lg">Search for a product to compare prices and reviews</p>
          </div>
        )}
      </div>

      {showReviewModal && (
        <ReviewModal
          reviews={selectedReviews}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  )
}

export default App
