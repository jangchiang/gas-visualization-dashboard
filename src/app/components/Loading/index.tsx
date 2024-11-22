// app/components/Loading/index.tsx
export default function Loading() {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600">Loading data...</span>
      </div>
    )
  }