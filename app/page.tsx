import Hero from '@/components/Hero'
import Timeline from '@/components/Timeline'
import DayEntry from '@/components/DayEntry'
import travelData from '@/data/travelLog.json'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative">
      <Hero meta={travelData.meta} />
      <Timeline days={travelData.days} />
      
      <div className="relative">
        {travelData.days.map((day, index) => (
          <DayEntry key={day.id} day={day} index={index} />
        ))}
      </div>
      
      {/* Footer */}
      <footer className="relative bg-slate-900 text-sand-100 py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),transparent_50%)]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="font-serif text-3xl md:text-4xl mb-6 text-balance">
            The journey ends, but the pankration continues.
          </p>
          <div className="w-24 h-px bg-sand-400 mx-auto mb-6" />
          <p className="text-sm text-sand-300 opacity-75 mb-8 tracking-wide">
            {travelData.meta.year} — A time-traveling tale
          </p>
          <Link 
            href="/works-cited"
            className="inline-block text-sm text-sand-300 hover:text-sand-100 transition-all uppercase tracking-widest border-b border-sand-300 hover:border-sand-100 pb-1 group"
          >
            <span className="inline-block group-hover:-translate-y-0.5 transition-transform">
              Works Cited
            </span>
          </Link>
        </div>
      </footer>
    </main>
  )
}
