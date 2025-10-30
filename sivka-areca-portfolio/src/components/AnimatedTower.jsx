import { useState, useEffect } from 'react'

export default function AnimatedCrane() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <>
      <style>{`
        .crane-container {
          perspective: 1200px;
          perspective-origin: center bottom;
        }
        
        @keyframes craneRotation {
          0% { transform: rotateY(-25deg) rotateX(3deg); }
          50% { transform: rotateY(25deg) rotateX(3deg); }
          100% { transform: rotateY(-25deg) rotateX(3deg); }
        }
        
        @keyframes jibMovement {
          0%, 100% { transform: rotateZ(-8deg) rotateX(-2deg); }
          50% { transform: rotateZ(-18deg) rotateX(-4deg); }
        }
        
        @keyframes hookLift {
          0%, 25% { transform: translateY(0px) rotateZ(0deg); }
          65%, 100% { transform: translateY(-50px) rotateZ(2deg); }
        }
        
        @keyframes loadSwing {
          0%, 100% { transform: translateY(0px) rotateZ(0deg); }
          30% { transform: translateY(-45px) rotateZ(3deg); }
          70% { transform: translateY(-45px) rotateZ(-2deg); }
        }
        
        @keyframes dustFloat {
          0% { transform: translateY(0px) scale(0.4) rotateZ(0deg); opacity: 0.7; }
          50% { transform: translateY(-30px) scale(1.2) rotateZ(180deg); opacity: 0.9; }
          100% { transform: translateY(-60px) scale(0.2) rotateZ(360deg); opacity: 0; }
        }
        
        @keyframes warningBlink {
          0%, 45% { opacity: 1; box-shadow: 0 0 20px #ff3333, 0 0 40px #ff333350; }
          50%, 95% { opacity: 0.2; box-shadow: 0 0 5px #ff3333; }
        }
        
        @keyframes sunGlare {
          0%, 100% { opacity: 0.15; transform: translateX(-15px) scale(0.8); }
          50% { opacity: 0.4; transform: translateX(15px) scale(1.2); }
        }
        
        @keyframes atmosphericHaze {
          0%, 100% { opacity: 0.1; transform: translateY(0px); }
          50% { opacity: 0.25; transform: translateY(-5px); }
        }
        
        .crane-rotate { animation: craneRotation 24s ease-in-out infinite; }
        .jib-move { animation: jibMovement 18s ease-in-out infinite; }
        .hook-animate { animation: hookLift 10s ease-in-out infinite; }
        .load-animate { animation: loadSwing 10s ease-in-out infinite; }
        .dust-animate { animation: dustFloat 5s ease-out infinite; }
        .warning-light { animation: warningBlink 1.8s ease-in-out infinite; }
        .sun-glare { animation: sunGlare 12s ease-in-out infinite; }
        .atmospheric-haze { animation: atmosphericHaze 8s ease-in-out infinite; }
      `}</style>
      
      <div className="h-full w-full flex items-end justify-center crane-container overflow-hidden bg-gradient-to-b from-slate-300 via-slate-200 to-stone-200 rounded-lg relative">
        
        {/* Realistic Sky with Atmospheric Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-transparent to-amber-100/20"></div>
        
        {/* Sun Glare Effect */}
        <div className="absolute top-6 right-12 w-20 h-20 bg-gradient-radial from-yellow-200/50 via-yellow-100/30 to-transparent rounded-full sun-glare blur-sm"></div>
        
        {/* Realistic Clouds */}
        <div className="absolute top-8 left-16 w-16 h-6 bg-white/40 rounded-full blur-sm atmospheric-haze"></div>
        <div className="absolute top-12 right-20 w-12 h-4 bg-white/35 rounded-full blur-sm atmospheric-haze" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-6 left-1/3 w-14 h-5 bg-white/30 rounded-full blur-sm atmospheric-haze" style={{animationDelay: '4s'}}></div>
        
        {/* Industrial Ground with Realistic Texture */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stone-400 via-stone-300 to-stone-200">
          {/* Ground Texture Details */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute bottom-3 left-8 w-6 h-2 bg-stone-600 rounded-sm shadow-lg transform rotate-12"></div>
            <div className="absolute bottom-5 left-20 w-4 h-1 bg-stone-700 rounded-sm shadow-md transform -rotate-6"></div>
            <div className="absolute bottom-2 right-12 w-8 h-2 bg-stone-600 rounded-sm shadow-lg transform rotate-8"></div>
            <div className="absolute bottom-6 right-28 w-3 h-1 bg-stone-700 rounded-sm shadow-md transform -rotate-15"></div>
            {/* Tire Tracks */}
            <div className="absolute bottom-1 left-1/4 w-32 h-1 bg-stone-500/60 rounded-full"></div>
            <div className="absolute bottom-2 left-1/3 w-28 h-0.5 bg-stone-600/50 rounded-full"></div>
          </div>
        </div>
        
        {/* Industrial Construction Materials */}
        <div className="absolute bottom-6 left-8">
          <div className="w-12 h-3 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 shadow-2xl transform rotate-8 mb-1 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 transform translate-x-1 translate-y-1 -z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-600/50 to-transparent"></div>
          </div>
          <div className="w-10 h-2.5 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 shadow-xl transform -rotate-3 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 transform translate-x-1 translate-y-1 -z-10"></div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-24">
          <div className="w-8 h-2 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-xl transform rotate-15 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-700/60 to-transparent"></div>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-20">
          <div className="w-7 h-7 bg-gradient-to-br from-orange-700 via-orange-600 to-orange-500 shadow-2xl transform rotate-45 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-800 to-orange-700 transform translate-x-1 translate-y-1 -z-10"></div>
            <div className="absolute inset-1 bg-orange-500/70"></div>
          </div>
        </div>
        
        {/* Photorealistic Crane Structure */}
        <div 
          className={`relative transform-gpu transition-all duration-2000 ease-out crane-rotate ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ 
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.4))'
          }}
        >
          
          {/* Industrial Crane Base with Realistic Materials */}
          <div className="relative mb-3">
            <div className="w-20 h-8 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 mx-auto shadow-2xl relative"
                 style={{ 
                   transform: 'rotateX(-20deg) rotateY(2deg)',
                   transformStyle: 'preserve-3d'
                 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 transform translate-x-2 translate-y-2 -z-10"></div>
              {/* Realistic Base Details */}
              <div className="absolute inset-2 border-2 border-gray-500/70"></div>
              <div className="absolute inset-x-4 inset-y-3 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600"></div>
              {/* Industrial Bolts */}
              <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full shadow-md"></div>
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full shadow-md"></div>
              <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full shadow-md"></div>
              <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full shadow-md"></div>
              {/* Weathering Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-900/20 to-orange-900/30"></div>
            </div>
          </div>

          {/* Industrial Crane Mast with Steel Texture */}
          <div className="relative mb-3">
            <div className="w-4 h-36 bg-gradient-to-t from-yellow-700 via-yellow-600 to-yellow-500 mx-auto shadow-2xl relative"
                 style={{ 
                   transformStyle: 'preserve-3d',
                   transform: 'rotateX(-2deg)'
                 }}>
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-800 via-yellow-700 to-yellow-600 transform translate-x-1.5 translate-y-1.5 -z-10"></div>
              
              {/* Steel Structural Framework */}
              <div className="absolute inset-x-0.5 top-4 bottom-4 border-l-2 border-r-2 border-yellow-400/60"></div>
              {[...Array(10)].map((_, i) => (
                <div key={i} className="absolute inset-x-0 border-t-2 border-yellow-400/50" 
                     style={{ top: `${8 + i * 8}%` }}></div>
              ))}
              
              {/* Industrial Ladder with Realistic Details */}
              <div className="absolute left-1 top-6 bottom-6 w-0.5 bg-yellow-400/80 shadow-sm"></div>
              {[...Array(15)].map((_, i) => (
                <div key={i} className="absolute left-0.5 w-1.5 h-0.5 bg-yellow-400/60 shadow-sm" 
                     style={{ top: `${12 + i * 5}%` }}></div>
              ))}
              
              {/* Weathering and Rust Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/30 via-transparent to-transparent opacity-60"></div>
              <div className="absolute left-0 top-1/3 w-full h-2 bg-gradient-to-r from-orange-800/40 to-transparent"></div>
              <div className="absolute right-0 top-2/3 w-full h-1 bg-gradient-to-l from-orange-700/30 to-transparent"></div>
            </div>
          </div>

          {/* Realistic Operator Cab */}
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
            <div className="w-7 h-4 bg-gradient-to-br from-red-700 via-red-600 to-red-800 shadow-2xl relative"
                 style={{ 
                   transformStyle: 'preserve-3d',
                   transform: 'rotateX(-15deg) rotateY(-5deg)'
                 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-black transform translate-x-1 translate-y-1 -z-10"></div>
              
              {/* Realistic Windows with Reflections */}
              <div className="absolute inset-1 bg-gradient-to-br from-sky-300 via-blue-200 to-sky-400 border border-red-500/70">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/20"></div>
                <div className="absolute top-0 left-0 w-2 h-1 bg-white/60"></div>
              </div>
              
              {/* Industrial Details */}
              <div className="absolute left-0 top-1.5 w-0.5 h-1.5 bg-gray-400 shadow-sm"></div>
              <div className="absolute right-0 top-1 w-0.5 h-0.5 bg-gray-300"></div>
              
              {/* Professional Warning Light */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full warning-light shadow-lg border border-red-800"></div>
              
              {/* Weathering */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-900/20 to-orange-800/40"></div>
            </div>
          </div>

          {/* Industrial Main Jib with Steel Framework */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 origin-left jib-move">
            <div className="w-36 h-3 bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-500 shadow-2xl relative"
                 style={{ 
                   transformStyle: 'preserve-3d',
                   transform: 'rotateX(-6deg)'
                 }}>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-800 via-yellow-700 to-yellow-600 transform translate-x-1.5 translate-y-1.5 -z-10"></div>
              
              {/* Steel Framework Structure */}
              <div className="absolute inset-y-0.5 left-6 right-6 border-t-2 border-b-2 border-yellow-400/60"></div>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute inset-y-0 border-l-2 border-yellow-400/50" 
                     style={{ left: `${12 + i * 10}%` }}></div>
              ))}
              
              {/* Support Cables */}
              <div className="absolute top-0 left-10 w-0.5 h-10 bg-gray-700 transform -rotate-45 origin-bottom shadow-md"></div>
              <div className="absolute top-0 left-20 w-0.5 h-8 bg-gray-700 transform -rotate-45 origin-bottom shadow-md"></div>
              <div className="absolute top-0 left-30 w-0.5 h-6 bg-gray-700 transform -rotate-45 origin-bottom shadow-md"></div>
              
              {/* Industrial Weathering */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 via-transparent to-orange-800/20"></div>
            </div>
            
            {/* Professional Hook and Cable System */}
            <div className="absolute right-3 top-1.5 transform translate-y-1">
              {/* Heavy Duty Cable */}
              <div className="w-1 h-24 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-900 mx-auto hook-animate shadow-lg relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600/50 to-transparent"></div>
              </div>
              {/* Industrial Hook */}
              <div className="w-4 h-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black mx-auto hook-animate shadow-2xl relative">
                <div className="absolute inset-0.5 bg-gray-700"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-900/20 to-orange-800/30"></div>
              </div>
            </div>
          </div>

          {/* Industrial Counter Jib */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 origin-right">
            <div className="w-16 h-2.5 bg-gradient-to-l from-yellow-700 via-yellow-600 to-yellow-500 shadow-xl relative -translate-x-16"
                 style={{ 
                   transformStyle: 'preserve-3d',
                   transform: 'rotateX(-6deg)'
                 }}>
              <div className="absolute inset-0 bg-gradient-to-l from-yellow-800 to-yellow-700 transform translate-x-1 translate-y-1 -z-10"></div>
              
              {/* Heavy Counterweight */}
              <div className="absolute right-0 top-0 w-5 h-5 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 transform translate-y-1 shadow-2xl relative">
                <div className="absolute inset-0.5 bg-gray-600"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-900/30 to-orange-800/40"></div>
              </div>
              
              {/* Weathering */}
              <div className="absolute inset-0 bg-gradient-to-l from-orange-900/30 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Industrial Steel Load */}
        <div className="absolute bottom-12 left-1/3">
          <div className="load-animate">
            <div className="w-10 h-1.5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 shadow-2xl mb-0.5 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 transform translate-x-1 translate-y-1 -z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-600/50 to-transparent"></div>
            </div>
            <div className="w-8 h-1.5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 shadow-2xl mb-0.5 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 transform translate-x-1 translate-y-1 -z-10"></div>
            </div>
            <div className="w-6 h-1.5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 transform translate-x-1 translate-y-1 -z-10"></div>
            </div>
          </div>
        </div>

        {/* Realistic Building Under Construction */}
        <div className="absolute bottom-8 right-1/4">
          <div className="w-8 h-12 bg-gradient-to-t from-gray-700 via-gray-600 to-gray-500 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600 transform translate-x-1.5 translate-y-1.5 -z-10"></div>
            <div className="absolute inset-2 bg-gray-500/70"></div>
            {/* Windows */}
            <div className="absolute top-2 left-1 w-1.5 h-1.5 bg-sky-200 border border-gray-400"></div>
            <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-sky-200 border border-gray-400"></div>
            <div className="absolute top-5 left-1 w-1.5 h-1.5 bg-sky-200 border border-gray-400"></div>
            <div className="absolute top-5 right-1 w-1.5 h-1.5 bg-sky-200 border border-gray-400"></div>
          </div>
          <div className="w-6 h-8 bg-gradient-to-t from-gray-700 via-gray-600 to-gray-500 shadow-xl mt-0.5 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-gray-700 transform translate-x-1 translate-y-1 -z-10"></div>
            <div className="absolute inset-1.5 bg-gray-500/70"></div>
          </div>
        </div>

        {/* Industrial Construction Vehicle */}
        <div className="absolute bottom-5 right-8">
          <div className="w-7 h-4 bg-gradient-to-br from-orange-700 via-orange-600 to-orange-800 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-800 via-orange-900 to-black transform translate-x-1 translate-y-1 -z-10"></div>
            <div className="absolute inset-0.5 bg-orange-500/80"></div>
            {/* Realistic Details */}
            <div className="absolute top-0.5 left-0.5 w-2 h-1 bg-sky-300 border border-orange-500"></div>
            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-red-600 rounded-full"></div>
            <div className="absolute top-2 left-0.5 w-1 h-0.5 bg-gray-300"></div>
            {/* Industrial Wheels */}
            <div className="absolute -bottom-1 left-1 w-2 h-2 bg-gray-900 rounded-full shadow-xl">
              <div className="absolute inset-0.5 bg-gray-700 rounded-full"></div>
            </div>
            <div className="absolute -bottom-1 right-1 w-2 h-2 bg-gray-900 rounded-full shadow-xl">
              <div className="absolute inset-0.5 bg-gray-700 rounded-full"></div>
            </div>
            {/* Weathering */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-900/30 to-orange-800/50"></div>
          </div>
        </div>

        {/* Realistic Dust and Atmospheric Effects */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-radial from-stone-400/80 via-stone-300/60 to-transparent rounded-full dust-animate blur-sm"
            style={{
              left: `${15 + i * 10}%`,
              bottom: `${8 + (i % 4) * 4}px`,
              animationDelay: `${i * 0.6}s`
            }}
          ></div>
        ))}

        {/* Industrial Atmospheric Haze */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-stone-300/10 to-transparent atmospheric-haze"></div>

      </div>
    </>
  )
}