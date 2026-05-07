import React, { useState } from 'react'

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
      setQuery('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products... (iPhone, MacBook, Headphones, etc.)"
            className="input flex-1"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? '🔍 Searching...' : '🔍 Search'}
          </button>
        </div>
        <p className="text-slate-400 text-sm mt-4">💡 Tip: Search from multiple platforms and compare prices instantly</p>
      </form>
    </div>
  )
}

export default SearchBar
