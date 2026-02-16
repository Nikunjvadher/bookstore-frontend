import Link from 'next/link'

const Banner = () => {
    return (
        <div className='relative w-full overflow-hidden min-h-[600px] flex items-center'>
            {/* Premium Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary-800 to-slate-900"></div>

            {/* Subtle Dot Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            {/* Floating Orbs - Premium Glassmorphism Effect */}
            <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-3xl"></div>

            {/* Geometric Accent Shapes */}
            <div className="absolute top-32 right-[20%] w-4 h-4 bg-amber-400/60 rotate-45"></div>
            <div className="absolute top-40 right-[35%] w-2 h-2 bg-primary-300/60 rounded-full"></div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Content */}
                    <div className="text-center lg:text-left max-w-2xl">
                        {/* Premium Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                            <span className="text-white/90 text-sm font-medium tracking-wide uppercase">Premium Book Collection</span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="font-bold tracking-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
                            Discover Your Next{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                                Great Adventure
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-white/70 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Join thousands of readers in our curated library. Exchange knowledge, discover hidden gems, and build your personal collection.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                href="#books"
                                className="group relative px-8 py-4 bg-white text-slate-900 font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Explore Library
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </Link>

                            <Link
                                href="/signup"
                                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    Get Started Free
                                </span>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10 pt-8 border-t border-white/10">
                            <div className="flex items-center gap-2 text-white/60">
                                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm font-medium">4.9/5 Rating</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/60">
                                <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span className="text-sm font-medium">10K+ Readers</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/60">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium">Verified Books</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Premium Visual Composition */}
                    <div className="relative w-full max-w-md lg:max-w-lg">
                        {/* Main Glass Card */}
                        <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                            {/* Decorative Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">Featured Collection</h3>
                                    <p className="text-white/60 text-sm">Handpicked for you</p>
                                </div>
                            </div>

                            {/* Book Preview Items */}
                            <div className="space-y-4">
                                {[
                                    { icon: '📚', title: 'Classic Literature', subtitle: '2,500+ Books' },
                                    { icon: '🎨', title: 'Art & Design', subtitle: '1,200+ Books' },
                                    { icon: '💡', title: 'Self Development', subtitle: '3,800+ Books' }
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer group border border-white/10 hover:border-white/20">
                                        <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/5 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-white/20">
                                            <span className="text-2xl">{item.icon}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                                            <div className="text-white/50 text-xs">{item.subtitle}</div>
                                        </div>
                                        <div className="w-9 h-9 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-amber-400/30 group-hover:to-amber-600/20 transition-all duration-300 border border-amber-400/20">
                                            <svg className="w-4 h-4 text-amber-400/80 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Stats Footer */}
                            <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">50K+</div>
                                    <div className="text-white/50 text-xs">Books</div>
                                </div>
                                <div className="w-px h-8 bg-white/20"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">120+</div>
                                    <div className="text-white/50 text-xs">Categories</div>
                                </div>
                                <div className="w-px h-8 bg-white/20"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-white">24/7</div>
                                    <div className="text-white/50 text-xs">Access</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Accent Elements */}
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-amber-400/30 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-400/30 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
