import Skeleton from 'react-loading-skeleton'

const SkeletonCard = () => {
    return (
        <div className='flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100'>
            {/* Image Container Skeleton */}
            <div className="relative w-full h-64 overflow-hidden">
                <Skeleton height="100%" />
            </div>

            {/* Content Skeleton */}
            <div className="flex flex-col gap-3 p-5 flex-1">
                {/* Title Skeleton */}
                <h3 className='text-lg'>
                    <Skeleton count={2} />
                </h3>

                {/* Author Skeleton */}
                <div className="flex items-center gap-2">
                    <Skeleton circle width={24} height={24} />
                    <div className='flex-1'>
                        <Skeleton width="60%" />
                    </div>
                </div>

                {/* Description Skeleton */}
                <div className='mt-2'>
                    <Skeleton count={2} />
                </div>

                {/* Footer Skeleton */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                    <div className="flex items-center gap-1">
                        <Skeleton width={40} height={20} />
                    </div>

                    <div className='w-24'>
                        <Skeleton height={36} borderRadius={12} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonCard
