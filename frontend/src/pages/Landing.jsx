import React from 'react'
import { Link } from 'react-router-dom'
import { FileSearch, Target, Compass as CompassIcon, TrendingUp, UserRound, FileText, Briefcase, Gauge, ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import Card from '../components/Card'

const processStages = [
  { label: 'Profile', icon: UserRound, desc: 'Education, skills & goals' },
  { label: 'Resume', icon: FileText, desc: 'Upload & analyze' },
  { label: 'Job', icon: Briefcase, desc: 'Paste the description' },
  { label: 'Skill Gap', icon: Gauge, desc: 'See what to improve' },
  { label: 'Preparation', icon: TrendingUp, desc: 'Close the gap' },
]

const features = [
  {
    icon: FileSearch,
    title: 'Resume Analysis',
    desc: 'Understand how your resume reads against ATS systems and where it falls short.',
  },
  {
    icon: Briefcase,
    title: 'Job Matching',
    desc: 'Compare your profile directly against a real job description, skill by skill.',
  },
  {
    icon: Target,
    title: 'Skill Gap Detection',
    desc: 'See exactly which skills are holding your readiness score back.',
  },
  {
    icon: CompassIcon,
    title: 'Adaptive Preparation',
    desc: 'A preparation path that updates as your skills and goals change.',
  },
]

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="container-page pb-16 pt-14 sm:pb-24 sm:pt-20">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
            Prepare smarter. Become job-ready.
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink-muted sm:text-lg">
            PrepToJob analyzes your career profile, resume and target job to identify skill gaps and create a
            personalized preparation path.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button as={Link} to="/register" size="lg">
              Get Started
            </Button>
            <Button as="a" href="#features" variant="secondary" size="lg">
              Explore Platform
            </Button>
          </div>
        </div>

        {/* Process visual */}
        <div className="mt-16 sm:mt-20">
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div
              className="absolute left-6 right-6 top-6 hidden h-px bg-line sm:block"
              aria-hidden="true"
            />
            {processStages.map((stage) => (
              <div key={stage.label} className="relative flex flex-1 flex-col items-start gap-3 sm:items-center sm:text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-ink-soft shadow-soft">
                  <stage.icon size={19} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{stage.label}</p>
                  <p className="text-xs text-ink-faint sm:mx-auto sm:max-w-[9rem]">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-line-soft bg-white/50">
        <div className="container-page py-14 sm:py-16">
          <h2 className="text-xl font-semibold sm:text-2xl">What PrepToJob does</h2>
          <p className="mt-2 max-w-lg text-sm text-ink-muted">
            A focused set of tools that turn your resume and target job into a clear readiness picture.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} hover>
                <div className="mb-4 inline-flex rounded-xl bg-forest-50 p-2.5 text-forest-600">
                  <f.icon size={19} />
                </div>
                <h3 className="text-sm font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="container-page py-14 sm:py-16">
        <Card className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold">Ready to see your readiness score?</h3>
            <p className="mt-1 text-sm text-ink-muted">Set up your profile in a few minutes — no resume required to start.</p>
          </div>
          <Button as={Link} to="/register" icon={ArrowRight} size="lg">
            Get Started
          </Button>
        </Card>
      </section>
    </div>
  )
}
