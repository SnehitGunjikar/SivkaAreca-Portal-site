import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-white hover:bg-gray-50 text-brand-700 border-2 border-brand-600 shadow-md hover:shadow-lg',
  outline: 'bg-transparent hover:bg-brand-50 text-brand-600 border-2 border-brand-600 shadow-sm hover:shadow-md',
  success: 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl',
  // New variants for better contrast and visibility
  'white-solid': 'bg-white hover:bg-gray-100 text-brand-700 border-2 border-white shadow-lg hover:shadow-xl font-semibold',
  'white-outline': 'bg-transparent hover:bg-white text-white hover:text-brand-700 border-2 border-white shadow-md hover:shadow-lg font-semibold',
  'brand-solid': 'bg-brand-700 hover:bg-brand-800 text-white border-2 border-brand-700 shadow-lg hover:shadow-xl font-semibold',
  'contrast-white': 'bg-white hover:bg-gray-50 text-brand-800 border-2 border-white shadow-xl font-bold',
  'contrast-outline': 'bg-white/10 hover:bg-white text-white hover:text-brand-800 border-2 border-white backdrop-blur-sm shadow-lg hover:shadow-xl font-bold'
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base lg:text-lg rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95'
  const variantClasses = variants[variant] || variants.primary
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${className}`} 
      {...props}
    >
      {children}
    </button>
  )
}

export function ButtonLink({ to, children, variant = 'primary', className = '', ...props }) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base lg:text-lg rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95'
  const variantClasses = variants[variant] || variants.primary
  
  return (
    <Link 
      to={to} 
      className={`${baseClasses} ${variantClasses} ${className}`} 
      {...props}
    >
      {children}
    </Link>
  )
}