import { ArrowRight, Code2, Eye, Gauge, Route } from "lucide-react";
import { Link } from "react-router-dom";
import { algorithmMetadata } from "../data/algorithms";
import { FadeIn, StaggerContainer, StaggerItem } from "../components/Animations";

const benefits = [
  { icon: Eye, title: "See every move", description: "Watch values compare, move, and settle into place with glowing step indicators." },
  { icon: Code2, title: "Connect code to action", description: "The active line of code synchronizes with every single visualization step." },
  { icon: Gauge, title: "Learn at your speed", description: "Pause, replay, step back, or test custom array inputs on the fly." },
];

export const HomePage = () => (
  <div className="bg-black text-zinc-100">
    {/* Hero Section */}
    <section className="relative overflow-hidden border-b border-emerald-950/80 py-24 sm:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_50%),radial-gradient(circle_at_20%_80%,rgba(5,150,105,0.1),transparent_40%)]" />
      <div className="mx-auto grid max-w-screen-2xl gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <FadeIn>
          <p className="eyebrow">Your Visual DSA Lab</p>
          <h1 className="mt-6 max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Learn DSA by <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(16,185,129,0.4)]">Seeing It.</span>
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-9 text-zinc-400">
            Master algorithms effortlessly through step-by-step animations, synchronized code execution, and plain-language explanations.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link to="/learn" className="button-primary">
              Start Learning <ArrowRight size={18} />
            </Link>
            <Link to="/visualize/binary-search" className="button-secondary">
              Explore Visualizers
            </Link>
          </div>
          <p className="mt-6 text-sm font-medium text-emerald-500/80">No sign-up required to explore all visualizers.</p>
        </FadeIn>

        {/* Hero Interactive Card Preview */}
        <FadeIn delay={0.2} variant="scale">
        <div className="panel overflow-hidden p-1.5 border-emerald-900/50 bg-black shadow-[0_0_50px_rgba(16,185,129,0.1)]">
          <div className="rounded-xl bg-zinc-950 p-7 sm:p-9 border border-emerald-950/80">
            <div className="mb-6 flex items-center justify-between">
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400">
                BINARY SEARCH
              </span>
              <span className="text-xs font-mono font-semibold text-zinc-400">Step 4 / 9</span>
            </div>

            {/* Array Demo */}
            <div className="flex items-end justify-center gap-2 py-8 sm:gap-3">
              {[10, 20, 30, 40, 50, 60, 70].map((value, index) => (
                <div className="relative" key={value}>
                  <div
                    className={`grid h-14 w-12 place-items-center rounded-xl border-2 text-sm font-bold sm:h-16 sm:w-14 transition-all duration-300 ${
                      index === 3
                        ? "border-amber-400 bg-amber-500/20 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                        : index < 3
                        ? "border-zinc-800 bg-black text-zinc-600 opacity-40"
                        : "border-emerald-950/80 bg-zinc-950 text-zinc-200"
                    }`}
                  >
                    {value}
                  </div>
                  {index === 3 && (
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-black text-amber-400">
                      ↑ MID
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-emerald-400">What is happening?</p>
              <p className="mt-1.5 text-sm leading-6 text-zinc-200">
                The middle value is <strong className="text-amber-400">40</strong>. Since our target is <strong className="text-emerald-400">60</strong>, we safely discard the left half and search right.
              </p>
            </div>
          </div>
        </div>
        </FadeIn>
      </div>
    </section>

    {/* Popular Algorithms Catalog */}
    <section className="mx-auto max-w-screen-2xl section-gap page-padding">
      <FadeIn className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Start Here</p>
          <h2 className="mt-2 text-4xl font-black text-white">Popular Algorithms</h2>
        </div>
        <Link className="text-sm font-semibold text-emerald-400 hover:text-emerald-300" to="/learn">
          View all algorithms <ArrowRight className="ml-1 inline" size={15} />
        </Link>
      </FadeIn>

      <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {algorithmMetadata.slice(0, 3).map((algorithm) => (
          <StaggerItem key={algorithm.id}>
          <Link
            to={`/algorithms/${algorithm.id}`}
            className="panel group p-8 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-emerald-950/80 border border-emerald-900/60 px-3 py-1 text-xs font-semibold text-emerald-300">
                {algorithm.category}
              </span>
              <span className="text-xs font-bold text-emerald-400">{algorithm.difficulty}</span>
            </div>
            <h3 className="mt-6 text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">{algorithm.name}</h3>
            <p className="mt-3 text-base leading-6 text-zinc-400">{algorithm.shortDescription}</p>
            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-emerald-400">
              Explore Lesson <ArrowRight size={16} />
            </div>
          </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>

    {/* Benefits Grid */}
    <section className="border-y border-emerald-950/80 bg-black">
      <div className="mx-auto grid max-w-screen-2xl gap-8 section-gap page-padding md:grid-cols-3">
        {benefits.map(({ icon: Icon, title, description }, index) => (
          <FadeIn key={title} delay={index * 0.1}>
          <div className="rounded-2xl border border-emerald-950/60 bg-zinc-950/60 p-8">
            <span className="grid h-14 w-14 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Icon size={28} />
            </span>
            <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
            <p className="mt-3 text-base leading-6 text-zinc-400">{description}</p>
          </div>
          </FadeIn>
        ))}
      </div>
    </section>

    {/* Roadmap Banner */}
    <section className="mx-auto max-w-screen-2xl section-gap page-padding">
      <FadeIn>
      <div className="panel grid gap-6 overflow-hidden p-10 sm:p-14 md:grid-cols-[1fr_auto] md:items-center border-emerald-900/50 bg-black shadow-[0_0_40px_rgba(16,185,129,0.08)]">
        <div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Route size={20} />
            <p className="eyebrow">Beginner-Friendly Path</p>
          </div>
          <h2 className="mt-3 text-4xl font-black text-white">Build your DSA foundations in the right order.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-zinc-400 text-base">
            Follow a structured roadmap from basic array operations to sorting, searching, and advanced topics.
          </p>
        </div>
        <Link className="button-primary" to="/roadmap">
          See the Roadmap <ArrowRight size={18} />
        </Link>
      </div>
      </FadeIn>
    </section>
  </div>
);
