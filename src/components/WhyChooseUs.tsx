"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  Sparkles,
  UserSearch,
  ClipboardCheck,
  GraduationCap,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";

const reasons = [
  {
    num: "01",
    tag: "Specialist focus",
    title: "Beauty Industry Focus",
    description:
      "Support is designed specifically for salons, spas, barbershops, nail studios, beauty businesses, investors, and beauty professionals.",
    icon: Sparkles,
  },
  {
    num: "02",
    tag: "Recruitment & placement",
    title: "Structured Recruitment Support",
    description:
      "Beauty businesses receive support with sourcing, screening, shortlisting, and placement guidance for more confident hiring decisions.",
    icon: UserSearch,
  },
  {
    num: "03",
    tag: "SOPs & templates",
    title: "Practical Operating Systems",
    description:
      "Daily operations become clearer through SOPs, HR documents, checklists, templates, reporting tools, and practical business structures.",
    icon: ClipboardCheck,
  },
  {
    num: "04",
    tag: "Skills & standards",
    title: "Training That Improves Performance",
    description:
      "Owners, managers, and teams are supported with training focused on customer care, sales, service standards, productivity, and professionalism.",
    icon: GraduationCap,
  },
  {
    num: "05",
    tag: "KPIs & tracking",
    title: "Growth & Accountability",
    description:
      "Beauty businesses are guided to improve sales tracking, staff productivity, client experience, digital visibility, and management discipline.",
    icon: TrendingUp,
  },
  {
    num: "06",
    tag: "Brand positioning",
    title: "Premium Business Mindset",
    description:
      "The goal is to help beauty businesses build cleaner operations, stronger teams, better client experiences, and a more professional brand position.",
    icon: BadgeCheck,
  },
];

export default function WhyChooseUs() {
  const reasonRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers = reasonRefs.current.map((el, i) => {
      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add("reason-visible");
            }, i * 75);

            obs.unobserve(el);
          }
        },
        { threshold: 0.12 }
      );

      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        @keyframes wcu-fadeUp  { to { opacity:1; transform:translateY(0); } }
        @keyframes wcu-slideIn { to { opacity:1; transform:translateX(0); } }
        @keyframes wcu-barGrow { to { width:100%; } }
        @keyframes wcu-pulse   { 0%,100%{opacity:1;} 50%{opacity:.4;} }

        .wcu-section {
          font-family: 'Outfit', sans-serif;
          background: #fff;
          color: #071b33;
          padding: 80px 52px 0;
          overflow: hidden;
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
        }

        .wcu-eyebrow {
          display: flex; align-items: center; gap: 12px;
          opacity: 0; transform: translateY(14px);
          animation: wcu-fadeUp .65s .05s cubic-bezier(.22,1,.36,1) forwards;
        }

        .wcu-eyebrow-bar {
          display: block; height: 1px; background: #b87586;
          width: 0; animation: wcu-barGrow .85s .25s cubic-bezier(.22,1,.36,1) forwards;
        }

        .wcu-eyebrow-text {
          font-size: 10px; font-weight: 600;
          letter-spacing: .26em; text-transform: uppercase; color: #b87586;
        }

        .wcu-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4.8vw, 64px);
          font-weight: 700; line-height: 1.03;
          letter-spacing: -.03em; color: #071b33;
          margin-top: 18px; max-width: 780px;
          opacity: 0; transform: translateY(20px);
          animation: wcu-fadeUp .85s .22s cubic-bezier(.22,1,.36,1) forwards;
        }

        .wcu-headline em { font-style: italic; color: #b87586; }

        .wcu-intro {
          margin-top: 20px; max-width: 580px;
          font-size: 14.5px; font-weight: 300; line-height: 1.85; color: #64748b;
          opacity: 0; transform: translateY(16px);
          animation: wcu-fadeUp .75s .38s cubic-bezier(.22,1,.36,1) forwards;
        }

        .wcu-intro strong { font-weight: 500; color: #071b33; }

        .wcu-grid {
          margin-top: 52px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 52px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .wcu-section { padding: 60px 24px 0; }
          .wcu-grid { grid-template-columns: 1fr; gap: 36px; }
          .wcu-img-panel { position: static !important; height: 480px; }
        }

        .wcu-img-panel {
          position: sticky; top: 32px;
          border-radius: 20px; overflow: hidden;
          background: #071b33; height: 720px;
          opacity: 0; transform: translateX(-28px);
          animation: wcu-slideIn .95s .48s cubic-bezier(.22,1,.36,1) forwards;
          box-shadow: 0 32px 80px rgba(7,27,51,0.18);
        }

        .wcu-img-overlay {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(
            180deg,
            rgba(7,27,51,0) 30%,
            rgba(7,27,51,0.88) 100%
          );
        }

        .wcu-img-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 36px; z-index: 2;
        }

        .wcu-img-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(184,117,134,.15);
          border: 1px solid rgba(184,117,134,.3);
          padding: 6px 14px; border-radius: 2px; margin-bottom: 18px;
        }

        .wcu-img-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #b87586; animation: wcu-pulse 2s infinite;
        }

        .wcu-img-badge-text {
          font-size: 9px; font-weight: 600; letter-spacing: .22em;
          text-transform: uppercase; color: #d9a3af;
        }

        .wcu-img-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px, 3.2vw, 44px);
          font-weight: 600; line-height: 1.1;
          letter-spacing: -.02em; color: #fff;
        }

        .wcu-img-stats {
          margin-top: 22px; display: flex; gap: 28px;
          padding-top: 18px; border-top: 1px solid rgba(255,255,255,.1);
        }

        .wcu-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 700; color: #d9a3af; line-height: 1;
        }

        .wcu-stat-lbl {
          font-size: 9.5px; font-weight: 300;
          color: rgba(255,255,255,.4); letter-spacing: .04em; margin-top: 3px;
        }

        .wcu-reasons { border-top: 1px solid rgba(7,27,51,0.1); }

        .reason {
          display: grid; grid-template-columns: 72px 1fr;
          border-bottom: 1px solid rgba(7,27,51,0.1);
          padding: 30px 0;
          opacity: 0; transform: translateY(24px);
          transition: background .3s;
        }

        .reason:last-child { border-bottom: none; }

        .reason-visible {
          opacity: 1 !important; transform: translateY(0) !important;
          transition:
            opacity .7s cubic-bezier(.22,1,.36,1),
            transform .7s cubic-bezier(.22,1,.36,1),
            background .3s !important;
        }

        .reason:hover { background: linear-gradient(90deg,#f9f2f4,transparent); }

        .reason-left {
          display: flex; flex-direction: column;
          align-items: flex-start; gap: 10px; padding-right: 16px;
        }

        .reason-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 300; line-height: 1;
          color: #d9a3af; transition: color .3s;
        }

        .reason:hover .reason-num { color: #b87586; }

        .reason-icon-box {
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid rgba(7,27,51,0.1);
          display: flex; align-items: center; justify-content: center;
          color: #b87586;
          transition: background .3s, color .3s, border-color .3s;
        }

        .reason:hover .reason-icon-box {
          background: #071b33; color: #fff; border-color: #071b33;
        }

        .reason-right {
          position: relative; padding-left: 20px;
          border-left: 1px solid rgba(7,27,51,0.1);
        }

        .reason-bar {
          position: absolute; left: -1px; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, #b87586, transparent);
          transform: scaleY(0); transform-origin: top; opacity: 0;
          transition: transform .45s cubic-bezier(.22,1,.36,1), opacity .3s;
        }

        .reason:hover .reason-bar { transform: scaleY(1); opacity: 1; }

        .reason-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(17px, 1.9vw, 23px);
          font-weight: 600; line-height: 1.2;
          letter-spacing: -.02em; color: #071b33;
          transition: color .3s;
        }

        .reason:hover .reason-title { color: #b87586; }

        .reason-desc {
          margin-top: 8px;
          font-size: 13.5px; font-weight: 300; line-height: 1.8; color: #64748b;
        }

        .reason-tag {
          margin-top: 12px;
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 9.5px; font-weight: 500; letter-spacing: .18em;
          text-transform: uppercase; color: #b87586;
          opacity: 0; transform: translateX(-6px);
          transition: opacity .3s, transform .3s;
        }

        .reason:hover .reason-tag { opacity: 1; transform: translateX(0); }

        .wcu-footer {
          margin-top: 56px; padding: 52px;
          background: #071b33; position: relative; overflow: hidden;
          opacity: 0;
          animation: wcu-fadeUp .8s 1.5s cubic-bezier(.22,1,.36,1) forwards;
        }

        .wcu-footer::before {
          content: ''; position: absolute;
          top: -120px; right: -80px;
          width: 360px; height: 360px; border-radius: 50%;
          background: radial-gradient(circle,rgba(184,117,134,.18) 0%,transparent 65%);
          pointer-events: none;
        }

        .wcu-footer-rule {
          height: 1px; background: rgba(184,117,134,.38); margin-bottom: 26px;
          width: 0; animation: wcu-barGrow 1s 1.7s cubic-bezier(.22,1,.36,1) forwards;
        }

        .wcu-footer-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(22px, 2.8vw, 40px);
          font-weight: 300; line-height: 1.15;
          letter-spacing: -.02em; color: #fff; max-width: 820px;
        }

        .wcu-footer-text em { font-style: italic; color: #d9a3af; }

        .wcu-footer-actions {
          margin-top: 28px; display: flex; align-items: center; gap: 24px;
        }

        .wcu-footer-btn {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 10.5px; font-weight: 600; letter-spacing: .2em;
          text-transform: uppercase;
          background: #b87586; color: #fff; border: none;
          padding: 15px 30px; cursor: pointer; border-radius: 2px;
          transition: background .3s, transform .2s, box-shadow .3s;
        }

        .wcu-footer-btn:hover {
          background: #a3687a; transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(184,117,134,.38);
        }

        .wcu-footer-btn-arrow { display: inline-block; transition: transform .3s; }

        .wcu-footer-btn:hover .wcu-footer-btn-arrow { transform: translateX(4px); }

        .wcu-footer-note {
          font-size: 12px; font-weight: 300;
          color: rgba(255,255,255,.35); letter-spacing: .04em;
        }
      `}</style>

      <section className="wcu-section" aria-labelledby="wcu-heading">
        <p className="wcu-eyebrow" aria-hidden="true">
          <span className="wcu-eyebrow-bar" />
          <span className="wcu-eyebrow-text">Why Choose Us</span>
        </p>

        <h2 className="wcu-headline" id="wcu-heading">
          Built for beauty businesses
          <br />
          that want <em>structure and growth.</em>
        </h2>

        <p className="wcu-intro">
          From <strong>recruitment and staff training</strong> to business
          systems, documentation, digital visibility, and management support,
          every solution is designed to help beauty businesses operate with
          confidence and professionalism.
        </p>

        <div className="wcu-grid">
          <div className="wcu-img-panel">
            <Image
              src="/why-choose-us.png"
              alt="Professional beauty business consultation and salon operations support"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />

            <div className="wcu-img-overlay" aria-hidden="true" />

            <div className="wcu-img-content">
              <div className="wcu-img-badge" aria-hidden="true">
                <span className="wcu-img-badge-dot" />
                <span className="wcu-img-badge-text">Premium Support</span>
              </div>

              <p className="wcu-img-quote">
                Stronger teams.
                <br />
                Better systems.
                <br />
                Cleaner operations.
              </p>

              <div className="wcu-img-stats" aria-hidden="true">
                {[
                  { num: "6", lbl: "Core pillars" },
                  { num: "100%", lbl: "Beauty focused" },
                  { num: "End-to-end", lbl: "Support model" },
                ].map((s) => (
                  <div key={s.lbl}>
                    <div className="wcu-stat-num">{s.num}</div>
                    <div className="wcu-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="wcu-reasons">
            {reasons.map((r, i) => {
              const Icon = r.icon;

              return (
                <article
                  key={r.title}
                  className="reason"
                  ref={(el) => {
                    reasonRefs.current[i] = el;
                  }}
                  style={{ transitionDelay: `${i * 75}ms` }}
                >
                  <div className="reason-left">
                    <span className="reason-num" aria-hidden="true">
                      {r.num}
                    </span>

                    <div className="reason-icon-box" aria-hidden="true">
                      <Icon size={16} strokeWidth={1.6} />
                    </div>
                  </div>

                  <div className="reason-right">
                    <div className="reason-bar" aria-hidden="true" />

                    <h3 className="reason-title">{r.title}</h3>

                    <p className="reason-desc">{r.description}</p>

                    <span className="reason-tag" aria-hidden="true">
                      {r.tag} →
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="wcu-footer">
          <div className="wcu-footer-rule" aria-hidden="true" />

          <p className="wcu-footer-text">
            A premium beauty business needs more than talent. It needs{" "}
            <em>systems, standards, accountability,</em> and a clear growth
            direction.
          </p>

          <div className="wcu-footer-actions">
            <button className="wcu-footer-btn">
              Work With Us&nbsp;
              <span className="wcu-footer-btn-arrow">→</span>
            </button>

            <span className="wcu-footer-note">
              Beauty businesses locally and internationally
            </span>
          </div>
        </div>
      </section>
    </>
  );
}