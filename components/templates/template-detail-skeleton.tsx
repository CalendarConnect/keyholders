export default function TemplateDetailSkeleton() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="w-40 h-6 bg-white/10 rounded-lg animate-pulse" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <div className="aspect-[16/9] rounded-2xl bg-white/10 animate-pulse" />
          
          <div className="mt-8 flex gap-3">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="w-8 h-8 bg-white/10 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-24 h-6 bg-white/10 rounded-full animate-pulse" />
            <div className="w-40 h-6 bg-white/10 rounded-lg animate-pulse" />
          </div>
          
          <div className="h-10 w-3/4 bg-white/10 rounded-xl mb-4 animate-pulse" />
          <div className="h-6 w-2/3 bg-white/10 rounded-lg mb-6 animate-pulse" />
          
          <div className="space-y-6">
            {Array(5).fill(0).map((_, i) => (
              <div key={i}>
                <div className="w-40 h-6 bg-white/10 rounded-lg mb-2 animate-pulse" />
                <div className="w-full h-16 bg-white/10 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <div className="h-8 w-48 mx-auto bg-white/10 rounded-lg mb-8 animate-pulse" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-96 bg-white/10 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
      
      <div>
        <div className="h-8 w-48 mx-auto bg-white/10 rounded-lg mb-8 animate-pulse" />
        <div className="h-80 bg-white/10 rounded-2xl animate-pulse" />
      </div>
    </div>
  );
} 