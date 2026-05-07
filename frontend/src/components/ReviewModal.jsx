import React from 'react'

function ReviewModal({ reviews, onClose }) {
  if (!reviews) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-dark rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-slate-700">
        <div className="sticky top-0 glass-dark border-b border-slate-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{reviews.platform} Reviews</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
              ⭐ Best Reviews ({reviews.best?.length || 0})
            </h3>
            <div className="space-y-3">
              {reviews.best && reviews.best.length > 0 ? (
                reviews.best.map((review, idx) => (
                  <div key={idx} className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-slate-300 text-sm">
                    {review}
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No best reviews available</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
              📊 Average Reviews ({reviews.avg?.length || 0})
            </h3>
            <div className="space-y-3">
              {reviews.avg && reviews.avg.length > 0 ? (
                reviews.avg.map((review, idx) => (
                  <div key={idx} className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-slate-300 text-sm">
                    {review}
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No average reviews available</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
              ⚠️ Bad Reviews ({reviews.bad?.length || 0})
            </h3>
            <div className="space-y-3">
              {reviews.bad && reviews.bad.length > 0 ? (
                reviews.bad.map((review, idx) => (
                  <div key={idx} className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-slate-300 text-sm">
                    {review}
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic">No bad reviews available</p>
              )}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 glass-dark border-t border-slate-700 p-6 flex justify-end">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal
