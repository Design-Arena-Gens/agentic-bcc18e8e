export default function HomePage() {
  return (
    <section className="py-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Find your next tennis partner ? fast.
          </h1>
          <p className="text-white/80 text-lg">
            RallyMatch scores nearby players by skill, distance, and availability so you can get on court sooner.
          </p>
          <div className="flex gap-3">
            <a href="/matches" className="btn-primary">Find Partners</a>
            <a href="/profile" className="inline-flex items-center justify-center rounded-md border border-white/20 px-4 py-2 font-semibold hover:bg-white/10 transition">Set Up Profile</a>
          </div>
          <ul className="grid grid-cols-2 gap-3 text-sm text-white/80">
            <li className="card">Smart matching by NTRP rating</li>
            <li className="card">Filter by distance and days</li>
            <li className="card">Local players with sample data</li>
            <li className="card">Private profile stored locally</li>
          </ul>
        </div>
        <div className="card">
          <div className="aspect-[4/3] w-full rounded-lg bg-gradient-to-br from-tennis-green/30 to-tennis-yellow/20 p-6">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg bg-white/10 p-4">
                  <div className="h-4 w-24 rounded bg-white/20 mb-2" />
                  <div className="h-3 w-32 rounded bg-white/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
