import { ReactNode } from "react";

interface ResponsiveWrapperProps {
  children: ReactNode;
}

export function ResponsiveWrapper({ children }: ResponsiveWrapperProps) {
  return (
    <div className="min-h-screen">
      {/* Desktop/Tablet View */}
      <div className="hidden md:block">{children}</div>

      {/* Mobile View - Simplified Message */}
      <div className="md:hidden flex items-center justify-center min-h-screen bg-gradient-to-br from-[#007787] to-[#1DB2AB] p-6">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-4">
            Best Viewed on Desktop
          </h1>
          <p className="text-lg opacity-90 mb-6">
            For the complete interactive experience, please visit this site on a desktop or tablet device.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mt-8">
            <p className="text-sm">
              This is a rich, interactive web experience optimized for larger screens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
