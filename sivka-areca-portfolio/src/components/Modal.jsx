import { useEffect, useRef, useState } from 'react'

export default function Modal({ title, children, onClose }) {
  const [open, setOpen] = useState(false)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    setOpen(true)
    // Focus close button on mount
    closeBtnRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => onClose?.(), 200)
  }

  return (
    <div className="fixed inset-0 z-50">
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
      />
      <div className="absolute inset-0 grid place-items-center px-4">
        <div
          className={`bg-neutral-900 text-gray-200 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-200 ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}`}
        >
          <div className="sticky top-0 bg-neutral-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <button
              ref={closeBtnRef}
              className="h-8 w-8 grid place-content-center rounded hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-500"
              onClick={handleClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}