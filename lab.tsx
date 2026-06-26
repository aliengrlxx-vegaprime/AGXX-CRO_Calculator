import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Footer } from "@/components/Footer";
import { unlockClassified } from "@/lib/classified.functions";
import { trackEvent } from "@/lib/analytics";

import { TelegramBubble } from "@/components/TelegramBubble";
import faviconAsset from "@/assets/845.png.asset.json";
import logoAsset from "@/assets/1220.png.asset.json";
import classifiedFolderAsset from "@/assets/case-study-folder.webp.asset.json";


export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "AGXX Lab — Methodology & Research" },
      {
        name: "description",
        content:
          "Deeper insight into the AGXX process, methodology, and the systems behind the projection.",
      },
      { property: "og:title", content: "AGXX Lab — Methodology & Research" },
      {
        property: "og:description",
        content:
          "The 42 Formula System, the 9 Pillars, and the research behind Predictive CRO.",
      },
      { name: "twitter:title", content: "AGXX Lab — Methodology & Research" },
      {
        name: "twitter:description",
        content:
          "The 42 Formula System, the 9 Pillars, and the research behind Predictive CRO.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Lab,
});

function Lab() {
  return (
    <main className="relative min-h-screen bg-[#eef1f2] text-[#121416]/85">
      <LabHero />
      <LabTeasers />
      <LabReturn />
      <Footer />
      <TelegramBubble />
    </main>
  );
}

function LabHero() {
  return (
    <section className="section-shell relative z-10">
      <div className="grid-overlay-light" aria-hidden />
      <div className="relative z-10 mx-auto flex max-w-[800px] flex-col">
        <img
          src={logoAsset.url}
          alt="AGXX Lab"
          width={180}
          height={90}
          className="mb-[34px] h-auto w-[160px] object-contain opacity-90"
        />
        <div className="mb-[21px] h-[1px] w-[89px] bg-[#00a0c0]" aria-hidden />
        <p className="label-mono mb-[21px] text-[#00a0c0]">
          Section 01 · The Lab
        </p>
        <h1 className="font-display text-[34px] font-bold uppercase leading-[1.1] tracking-[0.04em] text-[#121416] sm:text-[55px] md:text-[72px]">
          Access the <span className="text-[#00a0c0]">Lab</span>
        </h1>
        <p className="mt-[34px] max-w-[640px] text-[16px] leading-[1.75] text-[#121416]/80 sm:text-[18px]">
          Deeper insight into our process, methodology, and the systems behind the projection.
        </p>
      </div>
    </section>
  );
}

const METHODOLOGY_BODY = `At Agxx Labs, our methodology is a structured, data-centric operational process designed to transform digital performance into measurable business value. Central to this approach is our Predictive CRO Diagnostic, a comprehensive analysis that systematically identifies and quantifies opportunities for revenue growth and cost optimization within your digital ecosystem.

This diagnostic process is distinctly different from conventional, iterative CRO and UX strategies. Instead of relying on generalized assumptions or trial-and-error, our methodology integrates the analytical power of our proprietary 42 Formula System. This means every step of our diagnostic, from initial assessment to final recommendation, is underpinned by a rigorous mathematical framework validated by leading research from institutions such as the Baymard Institute and McKinsey & Company.

Our process ensures that we not only pinpoint areas for strategic intervention but also accurately predict the precise dollar-amount impact of these interventions. This predictive capability allows us to forecast the Return on Investment (ROI) with an unparalleled level of precision, providing our clients with transparent, actionable insights and a clear roadmap for maximizing their digital investments. The Agxx Labs methodology is about delivering certainty and quantifiable results, enabling strategic decisions based on robust, data-backed projections.`;

const FORMULAS_BODY = `At Agxx Labs, our analytical prowess is powered by the 42 Formula System, a sophisticated and proprietary mathematical framework. This system comprises 42 distinct, interconnected formulas, each meticulously engineered to quantify and predict the complex dynamics of Conversion Rate Optimization (CRO) and User Experience (UX) within digital environments.

Each formula within this framework is grounded in empirical research and has undergone rigorous validation by leading industry authorities. For instance, the Baymard Institute's extensive research into e-commerce usability and conversion patterns provides foundational data for our conversion-centric algorithms. Similarly, insights from McKinsey & Company's studies on the tangible business value of design are integrated, enhancing the predictive accuracy of our UX-focused models.

The 42 Formula System serves as the analytical engine behind our predictive capabilities. It allows us to move beyond conventional, qualitative assessments by translating intricate user behaviors and design elements into precise, quantifiable metrics. This mathematical rigor enables Agxx Labs to generate highly accurate ROI projections, offering our clients a clear, data-backed understanding of the financial impact of their CRO and UX investments. This framework is a cornerstone of our ability to provide unparalleled precision in digital strategy, differentiating our approach from less mathematically robust methodologies.

(The Hitchhiker's Guide to the Galaxy reference was JUST a very happy coincidence. I assure you ☆)`;

type Teaser = {
  n: string;
  title: string;
  desc: string;
  status: "Available" | "Classified";
  kind: "formulas" | "methodology" | "classified";
};

const TEASERS: Teaser[] = [
  {
    n: "01",
    title: "The 42 Formulas",
    desc: "Overview of the deterministic calculation model that powers every projection.",
    status: "Available",
    kind: "formulas",
  },
  {
    n: "02",
    title: "Methodology",
    desc: "How inputs become projections. The high-level architecture of the engine.",
    status: "Available",
    kind: "methodology",
  },
  {
    n: "03",
    title: "Case Studies",
    desc: "Documented projections versus measured outcomes across verticals.",
    status: "Classified",
    kind: "classified",
  },
];




function LabTeasers() {
  const unlock = useServerFn(unlockClassified);
  const [open, setOpen] = useState<Teaser | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const openModule = (teaser: Teaser) => {
    setEmail("");
    setSubmitted(false);
    setPin("");
    setPinError(false);
    setVerifying(false);
    setOpen(teaser);
  };

  const close = () => {
    setOpen(null);
    setEmail("");
    setSubmitted(false);
    setPin("");
    setPinError(false);
    setVerifying(false);
  };

  const tryPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verifying) return;
    setVerifying(true);
    setPinError(false);
    try {
      const res = await unlock({ data: { pin } });
      if (res.ok) {
        trackEvent("classified_pin_success", { location: "lab_classified" });
        window.open(res.url, "_blank", "noopener,noreferrer");
        close();
      } else {
        trackEvent("classified_pin_failure", {
          location: "lab_classified",
          reason: "invalid_pin",
        });
        setPinError(true);
      }
    } catch {
      trackEvent("classified_pin_failure", {
        location: "lab_classified",
        reason: "error",
      });
      setPinError(true);
    } finally {
      setVerifying(false);
    }
  };



  return (
    <section className="section-shell relative z-10">
      <div className="grid-overlay-light" aria-hidden />
      <div className="relative z-10 mx-auto flex max-w-[1000px] flex-col">
        <div className="mb-[21px] h-[1px] w-[55px] bg-[#00a0c0]" aria-hidden />
        <p className="label-mono mb-[55px] text-[#121416]/60">
          Section 02 · Modules
        </p>

        <div className="grid grid-cols-1 gap-[1px] border border-[#121416]/15 bg-[#121416]/15 md:grid-cols-3">
          {TEASERS.map((t) =>
            t.kind === "classified" ? (
              <button
                key={t.n}
                type="button"
                onClick={() => {
                  trackEvent("classified_folder_click", { location: "lab_classified" });
                  openModule(t);
                }}
                aria-haspopup="dialog"
                aria-label={`Open ${t.title}`}
                className="group relative flex min-h-[240px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-black p-[16px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3aff7a]"
              >
                <img
                  src={classifiedFolderAsset.url}
                  alt="Classified case study folder"
                  className="h-full max-h-[220px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <span className="absolute bottom-[12px] left-1/2 -translate-x-1/2 font-mono-data text-[10px] uppercase tracking-[0.24em] text-[#c43a3a]">
                  Classified
                </span>
              </button>
            ) : (
              <button
                key={t.n}
                type="button"
                onClick={() => openModule(t)}
                aria-haspopup="dialog"
                aria-label={`Open ${t.title}`}
                className="group flex min-h-[240px] cursor-pointer flex-col gap-[16px] bg-[#eef1f2] p-[34px] text-left transition-colors hover:bg-[#e3e7e9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00a0c0]"
              >
                <span className="font-mono-data text-[10px] uppercase tracking-[0.24em] text-[#00a0c0]">
                  Module {t.n}
                </span>
                <h2 className="font-display text-[20px] font-bold uppercase leading-[1.2] tracking-[0.04em] text-[#121416]">
                  {t.title}
                </h2>
                <p className="text-[14px] leading-[1.7] text-[#121416]/75">{t.desc}</p>
                <span
                  className="mt-auto inline-block font-mono-data text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: "#121416" }}
                >
                  {t.status}
                </span>
                <span className="inline-flex w-fit border-b border-[#00a0c0] pb-[3px] font-mono-data text-[10px] uppercase tracking-[0.22em] text-[#00a0c0] transition-colors group-hover:border-[#121416] group-hover:text-[#121416]">
                  Open popup
                </span>
              </button>
            )
          )}
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lab-popup-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-[16px]"
          onClick={close}
        >
          <div
            className="relative max-h-[85vh] w-full max-w-[720px] overflow-y-auto bg-[#eef1f2] p-[34px] sm:p-[55px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-[16px] top-[16px] font-mono-data text-[12px] uppercase tracking-[0.22em] text-[#121416]/60 hover:text-[#121416]"
            >
              Close ×
            </button>

            <p className="label-mono mb-[13px] text-[#00a0c0]">Module {open.n}</p>
            <h3 id="lab-popup-title" className="font-display text-[24px] font-bold uppercase leading-[1.15] tracking-[0.04em] text-[#121416] sm:text-[32px]">
              {open.title}
            </h3>
            <div className="mt-[21px] h-[1px] w-[55px] bg-[#00a0c0]" aria-hidden />

            {open.kind === "classified" ? (
              <div className="mt-[21px]">
                <p className="text-[14px] leading-[1.7] text-[#121416]/80">
                  Classified. Enter access PIN to continue.
                </p>
                <form onSubmit={tryPin} className="mt-[21px] flex flex-col gap-[13px] sm:flex-row">
                  <input
                    type="password"
                    inputMode="numeric"
                    autoComplete="off"
                    required
                    autoFocus
                    value={pin}
                    onChange={(e) => {
                      setPin(e.target.value);
                      setPinError(false);
                    }}
                    placeholder="PIN"
                    className="flex-1 border border-[#121416]/30 bg-white px-[16px] py-[12px] text-[14px] tracking-[0.3em] text-[#121416] outline-none focus:border-[#00a0c0]"
                  />
                  <button
                    type="submit"
                    disabled={verifying}
                    className="bg-[#121416] px-[21px] py-[12px] font-mono-data text-[12px] uppercase tracking-[0.22em] text-[#eef1f2] hover:bg-[#00a0c0] disabled:opacity-60"
                  >
                    {verifying ? "Verifying…" : "Unlock"}
                  </button>

                </form>
                {pinError && (
                  <p className="mt-[13px] font-mono-data text-[11px] uppercase tracking-[0.22em] text-[#c43a3a]">
                    Access denied
                  </p>
                )}
                {/* suppress unused warnings for shared state */}
                <span className="hidden">{email}{submitted ? "1" : ""}</span>
              </div>
            ) : (
              <div className="mt-[21px] space-y-[16px] text-[14px] leading-[1.75] text-[#121416]/85 sm:text-[15px]">
                {(open.kind === "formulas" ? FORMULAS_BODY : METHODOLOGY_BODY)
                  .split("\n\n")
                  .map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}


function LabReturn() {
  return (
    <section className="section-shell relative z-10">
      <div className="grid-overlay-light" aria-hidden />
      <div className="relative z-10 mx-auto flex max-w-[800px] flex-col items-start">
        <div className="mb-[21px] h-[1px] w-[55px] bg-[#00a0c0]" aria-hidden />
        <Link
          to="/"
          className="group inline-flex items-center gap-[13px] font-mono-data text-[14px] uppercase tracking-[0.22em] text-[#00a0c0] transition-colors hover:text-[#121416]"
        >
          <span aria-hidden className="inline-block h-[1px] w-[34px] bg-[#00a0c0] transition-colors group-hover:bg-[#121416]" />
          Return to AGXX
        </Link>

        <img
          src={faviconAsset.url}
          alt=""
          width={24}
          height={24}
          aria-hidden
          className="pointer-events-none fixed bottom-[16px] right-[16px] z-20 h-[24px] w-[24px] object-contain opacity-60"
        />
      </div>
    </section>
  );
}
