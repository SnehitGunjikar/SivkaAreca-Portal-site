import React from 'react'

// Base skeleton element with shimmer animation
const SkeletonElement = ({ className = "", ...props }) => (
  <div 
    className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded ${className}`}
    {...props}
  />
)

// Text skeleton with different sizes
export const SkeletonText = ({ lines = 1, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonElement 
        key={index}
        className={`h-4 ${index === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}`}
      />
    ))}
  </div>
)

// Card skeleton
export const SkeletonCard = ({ className = "" }) => (
  <div className={`border border-gray-200 rounded-lg p-6 space-y-4 ${className}`}>
    <SkeletonElement className="h-48 w-full rounded" />
    <SkeletonElement className="h-6 w-3/4" />
    <SkeletonText lines={3} />
    <SkeletonElement className="h-10 w-32 rounded" />
  </div>
)

// Header skeleton
export const SkeletonHeader = ({ className = "" }) => (
  <div className={`space-y-4 ${className}`}>
    <SkeletonElement className="h-12 w-1/2" />
    <SkeletonText lines={2} />
  </div>
)

// Navigation skeleton
export const SkeletonNav = ({ className = "" }) => (
  <div className={`flex space-x-6 ${className}`}>
    {Array.from({ length: 4 }).map((_, index) => (
      <SkeletonElement key={index} className="h-6 w-20" />
    ))}
  </div>
)

// Grid skeleton for project/product listings
export const SkeletonGrid = ({ items = 6, className = "" }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
    {Array.from({ length: items }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
)

// Page skeleton that combines multiple elements
export const SkeletonPage = ({ className = "" }) => (
  <div className={`space-y-8 ${className}`}>
    <SkeletonHeader />
    <div className="space-y-6">
      <SkeletonGrid items={3} />
    </div>
  </div>
)

// Service detail skeleton
export const SkeletonServiceDetail = ({ className = "" }) => (
  <div className={`space-y-8 ${className}`}>
    <div className="space-y-4">
      <SkeletonElement className="h-10 w-2/3" />
      <SkeletonText lines={2} />
    </div>
    <SkeletonElement className="h-64 w-full rounded-lg" />
    <div className="space-y-4">
      <SkeletonElement className="h-6 w-1/4" />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-start space-x-3">
            <SkeletonElement className="h-2 w-2 rounded-full mt-2 flex-shrink-0" />
            <SkeletonElement className="h-4 flex-1" />
          </div>
        ))}
      </div>
    </div>
  </div>
)

// Product detail skeleton
export const SkeletonProductDetail = ({ className = "" }) => (
  <div className={`space-y-8 ${className}`}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <SkeletonElement className="h-96 w-full rounded-lg" />
      <div className="space-y-6">
        <SkeletonElement className="h-8 w-3/4" />
        <SkeletonText lines={3} />
        <div className="space-y-3">
          <SkeletonElement className="h-5 w-1/3" />
          <SkeletonElement className="h-5 w-1/2" />
          <SkeletonElement className="h-5 w-2/5" />
        </div>
        <SkeletonElement className="h-12 w-40 rounded" />
      </div>
    </div>
    <div className="space-y-4">
      <SkeletonElement className="h-6 w-1/4" />
      <SkeletonText lines={4} />
    </div>
  </div>
)

// Project detail skeleton
export const SkeletonProjectDetail = ({ className = "" }) => (
  <div className={`space-y-8 ${className}`}>
    <div className="space-y-4">
      <SkeletonElement className="h-10 w-2/3" />
      <SkeletonText lines={2} />
    </div>
    <SkeletonElement className="h-80 w-full rounded-lg" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonElement key={index} className="h-48 w-full rounded" />
      ))}
    </div>
    <div className="space-y-4">
      <SkeletonElement className="h-6 w-1/3" />
      <SkeletonText lines={3} />
    </div>
  </div>
)

// Home page skeleton
export const SkeletonHome = ({ className = "" }) => (
  <div className={`space-y-12 ${className}`}>
    {/* Hero section */}
    <div className="text-center space-y-6">
      <SkeletonElement className="h-16 w-3/4 mx-auto" />
      <SkeletonText lines={2} className="max-w-2xl mx-auto" />
      <SkeletonElement className="h-12 w-48 mx-auto rounded" />
    </div>
    
    {/* Services section */}
    <div className="space-y-8">
      <SkeletonElement className="h-8 w-1/3 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
    
    {/* Featured projects */}
    <div className="space-y-8">
      <SkeletonElement className="h-8 w-1/3 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </div>
  </div>
)

// Products page skeleton
export const SkeletonProducts = ({ className = "" }) => (
  <div className={`space-y-8 ${className}`}>
    <SkeletonHeader />
    <SkeletonGrid items={8} />
  </div>
)

// Projects page skeleton
export const SkeletonProjects = ({ className = "" }) => (
  <div className={`space-y-8 ${className}`}>
    <SkeletonHeader />
    <SkeletonGrid items={6} />
  </div>
)

// Contact page skeleton
export const SkeletonContact = ({ className = "" }) => (
  <div className={`space-y-8 ${className}`}>
    <SkeletonHeader />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <SkeletonElement className="h-6 w-1/3" />
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <SkeletonElement className="h-4 w-1/4" />
              <SkeletonElement className="h-10 w-full rounded border" />
            </div>
          ))}
        </div>
        <SkeletonElement className="h-12 w-32 rounded" />
      </div>
      <div className="space-y-4">
        <SkeletonElement className="h-6 w-1/3" />
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center space-x-3">
              <SkeletonElement className="h-5 w-5 rounded" />
              <SkeletonElement className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default SkeletonElement