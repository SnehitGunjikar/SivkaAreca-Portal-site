import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-brand-600 hover:bg-brand-700 text-white',
  secondary: 'bg-white hover:bg-gray-50 text-brand-700 border border-brand-600',
  outline: 'bg-transparent hover:bg-brand-50 text-brand-600 border border-brand-600',
  success: 'bg-green-600 hover:bg-green-700 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white'
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button className={`${variants[variant]} font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base lg:text-lg rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-all duration-300 ${className}`} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({ to, children, variant = 'primary', className = '', ...props }) {
  return (
    <Link to={to} className={`inline-block ${variants[variant]} font-semibold px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-sm sm:text-base lg:text-lg rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-all duration-300 ${className}`} {...props}>
      {children}
    </Link>
  )
}