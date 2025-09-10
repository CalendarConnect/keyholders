'use client';

export default function ClientsSection() {
  const clients = [
    {
      name: "Bruce",
      company: "WayneTech Enterprises",
      role: "Strategic Executive",
      quote: "My AI Partner knows my decision-making style and company politics. Every briefing is calibrated to how I actually think and communicate.",
      logo: "B",
      color: "from-slate-700 to-slate-900"
    },
    {
      name: "Alfred",
      company: "Manor Operations Ltd",
      role: "Operational Manager",
      quote: "My AI Partner remembers every team member's strengths and communication preferences. Makes coordination effortless.",
      logo: "A",
      color: "from-blue-600 to-blue-800"
    },
    {
      name: "Gigi",
      company: "Hadid Design Studios",
      role: "Creative Director",
      quote: "My AI Partner understands my creative process and client relationships. Adapts communication for each project's unique personality.",
      logo: "G",
      color: "from-purple-600 to-pink-600"
    },
    {
      name: "Lucy",
      company: "Quantum Development Co",
      role: "Technical Lead",
      quote: "My AI Partner knows our codebase, team dynamics, and technical constraints. Every conversation builds on previous context.",
      logo: "L",
      color: "from-green-600 to-emerald-600"
    }
  ];

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* Background Network Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          {/* Network connections */}
          {[...Array(20)].map((_, i) => (
            <g key={i}>
              <line
                x1={Math.random() * 400}
                y1={Math.random() * 400}
                x2={Math.random() * 400}
                y2={Math.random() * 400}
                stroke="#0066cc"
                strokeWidth="1"
                opacity="0.3"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
              <circle
                cx={Math.random() * 400}
                cy={Math.random() * 400}
                r="2"
                fill="#00a8ff"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            </g>
          ))}
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">
            Real People, Real
            <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Partnership
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            See how memory-driven AI transforms professional performance
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-slate-50 to-white p-8 rounded-3xl border border-gray-200 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
            >
              {/* Logo */}
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${client.color} flex items-center justify-center text-white text-2xl font-black shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {client.logo}
                </div>
                <div className="ml-4">
                  <div className="text-sm text-slate-500 font-medium">{client.company}</div>
                  <div className="text-lg font-bold text-slate-900">{client.name}</div>
                </div>
              </div>

              {/* Role Badge */}
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-6">
                {client.role}
              </div>

              {/* Quote */}
              <blockquote className="text-lg text-slate-700 leading-relaxed italic">
                "{client.quote}"
              </blockquote>

              {/* Decorative quote marks */}
              <div className="absolute top-6 right-6 text-6xl text-blue-200 font-serif opacity-50 group-hover:opacity-75 transition-opacity duration-300">
                "
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-slate-600 mb-6">
            Ready to join successful professionals using AI Partners?
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
            Start Your Partnership Today
          </button>
        </div>
      </div>
    </section>
  );
} 