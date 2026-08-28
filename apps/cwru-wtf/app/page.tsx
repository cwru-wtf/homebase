import Link from "next/link"
import { ArrowRight } from "lucide-react"
import WtfMeanings from "@/components/wtf-meanings"
import SubmissionForm from "@/components/submission-form"

const principles = [
  {
    title: "Build anything",
    body: "Hardware hacks, AI experiments, large-scale art, films, open-source tools, weird websites, games. Anything goes.",
  },
  {
    title: "Learn by doing",
    body: "No experience required. Just curiosity and a willingness to build. We learn through projects, not lectures.",
  },
  {
    title: "Ship it",
    body: "Late-night build sessions, mentorship between members, and projects that actually make it out the door.",
  },
]

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[1160px] px-6">
      {/* Hero */}
      <section className="flex min-h-[100svh] flex-col items-center justify-center py-20 text-center">
        <h1 className="animate-fade-in-up font-brand text-display text-foreground">
          cwru<span className="text-muted-foreground">.wtf</span>
        </h1>

        <WtfMeanings />

        <p className="mt-6 max-w-[46ch] text-pretty font-primary text-body text-muted-foreground md:text-lg">
          A student-led collective for{" "}
          <span className="wavy text-foreground">builders</span>,{" "}
          <span className="wavy text-foreground">tinkerers</span>, and{" "}
          <span className="wavy text-foreground">dreamers</span> at Case Western
          Reserve University.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#join"
            className="focus-ring inline-flex h-12 items-center justify-center rounded-xl bg-primary px-5 text-base font-medium text-primary-foreground transition-[transform,background-color] hover:bg-primary/90 active:scale-[0.98]"
          >
            Join .wtf
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="#about"
            className="focus-ring inline-flex h-12 items-center justify-center rounded-xl border border-border px-5 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            What is this?
          </Link>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="screen-line-before screen-line-after py-20 md:py-28"
      >
        <p className="font-mono text-caption uppercase tracking-[0.2em] text-muted-foreground">
          What we do
        </p>
        <h2 className="mt-4 max-w-content font-brand text-page-title text-foreground">
          Not a club. A workshop.
        </h2>
        <p className="mt-5 max-w-content text-pretty font-primary text-body text-muted-foreground md:text-lg">
          This isn&apos;t a place where we talk about doing things. It&apos;s
          where we actually do them &mdash; hardware hacks, AI experiments, art
          installations, films, open-source tools, weird websites. Anything that
          makes you say &ldquo;wtf, I wanna try that.&rdquo;
        </p>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {principles.map((item) => (
            <li key={item.title} className="bg-background p-6">
              <h3 className="font-brand text-section-title text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 font-primary text-body-sm text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Join */}
      <section id="join" className="screen-line-after py-20 md:py-28">
        <div className="mx-auto max-w-content text-center">
          <p className="font-mono text-caption uppercase tracking-[0.2em] text-muted-foreground">
            Join us
          </p>
          <h2 className="mt-4 font-brand text-page-title text-foreground">
            Come build something
          </h2>
          <p className="mt-5 text-pretty font-primary text-body text-muted-foreground md:text-lg">
            Tell us what you&apos;re into and what you want to make. We read
            every submission.
          </p>
        </div>

        <SubmissionForm />
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-3 py-10 sm:flex-row sm:justify-between">
        <span className="font-brand text-base font-semibold text-foreground">
          cwru<span className="text-muted-foreground">.wtf</span>
        </span>
        <span className="font-mono text-caption text-muted-foreground">
          &copy; {new Date().getFullYear()} &mdash; We Tinker Fearlessly
        </span>
      </footer>
    </div>
  )
}
