"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JetBrains_Mono } from "next/font/google";
import Image from "next/image";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Yashu Raj Singh",
  title: "Cybersecurity Specialist & Cloud Engineer",
  location: "Dehradun, Uttarakhand, India",
  email: "yashurajsingh504@gmail.com",
  linkedin: "linkedin.com/in/yashu-raj-singh-311312326",
  bio: "Diploma in Electronics Engineering (Government Polytechnic Dehradun, 2023) followed by a BCA in Cyber Security at Uttaranchal University (expected 2027). Highly proficient in traffic analysis, network defense frameworks, and comprehensive vulnerability assessments (VAPT).",
};

const ARSENAL = [
  { id: "toolkits", label: "security_toolkits", items: ["Wireshark", "Nmap", "Kali Linux", "Metasploit", "Burp Suite", "TShark / PyShark"] },
  { id: "vectors", label: "core_vector_proficiency", items: ["Vulnerability Assessment & Penetration Testing (VAPT)", "Web Application Security", "Network Traffic Auditing", "OSINT"] },
  { id: "infra", label: "infrastructure_and_dev", items: ["Python Automation", "Linux Environment Administration", "DNS Configuration", "Server Operations", "Cloud Architecture", "Bash, C++, Java, FastAPI, MySQL"] },
  { id: "found", label: "foundational_engineering", items: ["Electronics Engineering", "System Configurations", "Network Topologies"] },
];

const OPERATIONS = [
  { id: "dbs", tag: "incoming", title: "Incoming Cloud Engineer", org: "Digital Byte Solutions", body: "Engineering secure, scalable cloud architecture frameworks." },
  { id: "vapt", tag: "deployment", title: "VAPT & Network Auditing Deployments", org: "Independent builds", body: "Architectural builds focusing on active vulnerability tracking, threat modeling, and network log analysis tools." },
  { id: "voip", tag: "project", title: "VoIPHunter: VoIP Call Tracing System", org: "Cyber Hackathon 2025 / Bihar Government Hackathon", body: "Lead developer and architect. Real-time STUN, SIP and RTP analysis through PyShark and TShark pipelines into a FastAPI and MySQL backend, with an investigator dashboard for session filtering and PCAP logging." },
  { id: "usb", tag: "project", title: "USB Firewall: Endpoint Security", org: "Personal cybersecurity project", body: "Host-based C++ prototype using libusb to monitor hardware events and block unauthorized USB devices, with event logging and a PyQt management interface." },
  { id: "rmsi", tag: "history", title: "IT Trainee", org: "RMSI Pvt. Ltd., 9 months", body: "System configuration, troubleshooting across hardware, software and networks, and IT operations in an enterprise environment." },
  { id: "hack", tag: "competitive", title: "Security Hackathons", org: "Team lead and organizer", body: "Active competitive participant in cyber defense drills and hands-on vulnerability challenges. Organized the SafeNet Hack Challenge and an active member of the Cyber Warrior Club." },
];

const CERTS = ["Mastercard Cybersecurity Simulation (Forage)", "Cybersecurity & Ethical Hacking (Internshala)", "Introduction to Cybersecurity (Cisco)", "OSINT Training (My OSINT Training)"];

const BOOT_LINES = [
  "Initializing secure handshake...",
  "Loading modules: net-audit, vapt-core, arsenal...",
  "Verifying identity record...",
  "Mounting operation logs...",
  "Opening secure uplink...",
];

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

function useTypewriter(text, speed = 22) {
  const [result, setResult] = useState({ text, out: "" });
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setResult({ text, out: text.slice(0, i) });
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return result.text === text ? result.out : "";
}

function useReducedMotion() {
  const [r, setR] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const h = (e) => setR(e.matches);
    q.addEventListener("change", h);
    return () => q.removeEventListener("change", h);
  }, []);
  return r;
}

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

function GlitchText({ children, className = "" }) {
  return (
    <span className={`glitch ${className}`} data-text={children}>
      {children}
    </span>
  );
}

function Panel({ id, title, meta, children, className = "" }) {
  return (
    <section id={id} className={`border border-[#2563EB]/30 bg-black/60 backdrop-blur-sm shadow-[0_0_40px_-18px_#A855F7] ${className}`}>
      <header className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-b border-[#2563EB]/30 px-4 py-2 text-xs">
        <span className="break-words text-[#22C55E]">{title}</span>
        <span className="break-words text-[#A855F7]">{meta}</span>
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Canvas matrix stream (dual tone)                                    */
/* ------------------------------------------------------------------ */

function MatrixCanvas() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const glyphs = "01ABCDEF".split("");
    const size = 15;
    const palettes = [["#6B21A8", "#A855F7", "#2563EB", "#3B82F6"], ["#22C55E", "#10B981", "#D946EF", "#EC4899"]];
    let cols, drops, raf, last = 0;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      cols = Math.floor(c.width / size);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (t) => {
      raf = requestAnimationFrame(draw);
      if (t - last < 55) return; // throttle to roughly 18 fps
      last = t;
      ctx.fillStyle = "rgba(3,2,6,0.14)";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.font = `${size}px monospace`;
      for (let i = 0; i < cols; i++) {
        // sparse accent columns (green/magenta) over a blue/purple base
        const accent = i % 11 === 0;
        const p = palettes[accent ? 1 : 0];
        ctx.fillStyle = p[(i + Math.floor(drops[i])) % p.length];
        ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * size, drops[i] * size);
        if (drops[i] * size > c.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };

    if (reduced) {
      ctx.fillStyle = "#030206";
      ctx.fillRect(0, 0, c.width, c.height);
    } else {
      raf = requestAnimationFrame(draw);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 -z-10 h-full w-full opacity-40" />;
}

/* ------------------------------------------------------------------ */
/* Boot sequence                                                       */
/* ------------------------------------------------------------------ */

function BootSequence({ onDone }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const t = setInterval(() => {
      setCount((c) => {
        if (c >= BOOT_LINES.length) {
          clearInterval(t);
          return c;
        }
        return c + 1;
      });
    }, 320);
    return () => clearInterval(t);
  }, []);

  // each line flips from purple (pending) to green (ok) shortly after it appears
  useEffect(() => {
    if (count === 0) return;
    const t = setTimeout(() => setDone((d) => [...d, count - 1]), 240);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    if (done.length === BOOT_LINES.length) {
      const t = setTimeout(onDone, 450);
      return () => clearTimeout(t);
    }
  }, [done, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030206] p-6"
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-xl text-sm">
        {BOOT_LINES.slice(0, count).map((l, i) => {
          const ok = done.includes(i);
          return (
            <motion.div
              key={l}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-between gap-4 py-0.5"
              style={{ color: ok ? "#22C55E" : "#A855F7" }}
            >
              <span>{l}</span>
              <span>{ok ? "[ ok ]" : "[ .. ]"}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Console (shared state: contact form writes into it)                 */
/* ------------------------------------------------------------------ */

function Console({ lines, push, clear }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const logRef = useRef(null);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines]);

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    push({ kind: "in", text: raw });
    if (!cmd) return;
    setHistory((h) => [raw, ...h]);
    setHIdx(-1);
    switch (cmd) {
      case "help":
        push({ text: "commands: help, clear, skills, projects, whoami, contact" });
        break;
      case "clear":
        clear();
        break;
      case "skills":
        ARSENAL.forEach((g) => push({ text: `${g.label}: ${g.items.join(", ")}` }));
        break;
      case "projects":
        OPERATIONS.filter((o) => o.tag === "project").forEach((p) => push({ text: `${p.title} | ${p.org}` }));
        break;
      case "whoami":
        push({ text: `${PROFILE.name} | ${PROFILE.title} | ${PROFILE.location}` });
        break;
      case "contact":
        push({ text: `${PROFILE.email} | ${PROFILE.linkedin}` });
        break;
      default:
        push({ kind: "err", text: `command not found: ${cmd}. type help for the list.` });
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp" && history.length) {
      const n = Math.min(hIdx + 1, history.length - 1);
      setHIdx(n);
      setInput(history[n]);
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      const n = hIdx - 1;
      setHIdx(n);
      setInput(n >= 0 ? history[n] : "");
      e.preventDefault();
    }
  };

  const color = { in: "#EC4899", err: "#D946EF", out: "#22C55E", json: "#3B82F6" };

  return (
    <Panel id="console" title="console@yashu:~" meta="interactive">
      <div ref={logRef} className="h-64 overflow-y-auto text-xs leading-relaxed" role="log" aria-live="polite">
        {lines.map((l, i) => (
          <pre key={i} className="whitespace-pre-wrap break-words font-[inherit]" style={{ color: color[l.kind || "out"] }}>
            {l.kind === "in" ? "$ " : ""}
            {l.text}
          </pre>
        ))}
      </div>
      <label className="mt-3 flex items-center gap-2 border-t border-[#2563EB]/30 pt-3 text-xs">
        <span className="text-[#22C55E]">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          autoComplete="off"
          aria-label="console command input"
          className="w-full bg-transparent text-[#EC4899] caret-[#22C55E] outline-none"
          placeholder="type help"
        />
      </label>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

function Identity() {
  const bio = useTypewriter(PROFILE.bio, 14);
  const rows = [
    ["operator", PROFILE.name],
    ["location", PROFILE.location],
    ["education", "BCA Cyber Security, Uttaranchal University (2027), CGPA 7.8"],
    ["diploma", "Electronics Engineering, Govt. Polytechnic Dehradun (2023)"],
    ["clearance", "Team Lead, SIH-level cyber hackathons"],
  ];
  return (
    <Panel id="identity" title="identity.record" meta="status: active" className="lg:col-span-2">
      <h1 className="text-2xl font-bold leading-tight sm:text-4xl">
        <GlitchText>{PROFILE.title}</GlitchText>
      </h1>
      <dl className="mt-5 grid gap-x-6 gap-y-1 text-xs sm:grid-cols-[110px_1fr]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-[#A855F7]">{k}</dt>
            <dd className="text-zinc-300">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 min-h-[7.5rem] max-w-prose text-sm leading-relaxed text-zinc-300" aria-label={PROFILE.bio}>
        {bio}
        <span className="cursor" />
      </p>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Arsenal                                                             */
/* ------------------------------------------------------------------ */

function Arsenal() {
  return (
    <Panel id="arsenal" title="arsenal.grid" meta={`${ARSENAL.length} modules`} className="lg:col-span-2">
      <div className="grid gap-px bg-[#2563EB]/20 sm:grid-cols-2">
        {ARSENAL.map((g) => (
          <div key={g.id} className="bg-[#030206] p-3">
            <div className="mb-2 text-xs text-[#3B82F6]">{g.label}</div>
            <ul className="space-y-1 text-xs">
              {g.items.map((it) => (
                <li key={it} className="skill flex gap-2 text-zinc-300">
                  <span className="text-[#22C55E]">+</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Operation logs                                                      */
/* ------------------------------------------------------------------ */

function Operations() {
  const [open, setOpen] = useState("dbs");
  return (
    <Panel id="logs" title="operation.logs" meta={`${OPERATIONS.length} entries`} className="lg:col-span-2">
      <ul className="divide-y divide-[#2563EB]/20">
        {OPERATIONS.map((o) => {
          const active = open === o.id;
          return (
            <li key={o.id}>
              <button
                onClick={() => setOpen(active ? null : o.id)}
                aria-expanded={active}
                className="flex w-full items-baseline gap-3 py-2 text-left text-xs hover:text-[#EC4899] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#22C55E]"
              >
                <span className={active ? "text-[#22C55E]" : "text-[#A855F7]"}>{active ? "[-]" : "[+]"}</span>
                <span className="w-24 shrink-0 text-[#3B82F6]">{o.tag}</span>
                <span className="font-medium text-zinc-100">{o.title}</span>
              </button>
              <AnimatePresence initial={false}>
                {active && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-3 pl-[7.5rem] text-xs leading-relaxed">
                      <div className="text-[#10B981]">{o.org}</div>
                      <p className="mt-1 text-zinc-400">{o.body}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 border-t border-[#2563EB]/30 pt-3 text-xs text-zinc-400">
        <span className="text-[#A855F7]">certifications: </span>
        {CERTS.join(" | ")}
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Secure uplink (contact)                                             */
/* ------------------------------------------------------------------ */

function Uplink({ push }) {
  const [form, setForm] = useState({ name: "", email: "", channel: "collaboration", message: "" });
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    push({ kind: "in", text: "uplink --transmit" });
    const payload = {
      id: `tx-${Date.now().toString(36)}`,
      timestamp: new Date().toISOString(),
      destination: PROFILE.email,
      transport: "tls1.3 (simulated)",
      body: form,
    };
    setTimeout(() => {
      push({ kind: "json", text: JSON.stringify(payload, null, 2) });
      push({ text: "transit confirmed: payload queued for delivery (mock endpoint, nothing was sent)." });
      setForm({ name: "", email: "", channel: "collaboration", message: "" });
      setSending(false);
      document.getElementById("console")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 700);
  };

  const field = "w-full border border-[#2563EB]/40 bg-black px-2 py-1.5 text-xs text-zinc-100 outline-none focus:border-[#22C55E] focus:shadow-[0_0_12px_-2px_#22C55E]";
  return (
    <Panel id="uplink" title="secure.uplink --config" meta="tls: simulated">
      <form onSubmit={submit} className="grid gap-3 text-xs">
        <label className="grid gap-1">
          <span className="text-[#A855F7]">source_name</span>
          <input required className={field} value={form.name} onChange={set("name")} />
        </label>
        <label className="grid gap-1">
          <span className="text-[#A855F7]">source_address</span>
          <input required type="email" className={field} value={form.email} onChange={set("email")} />
        </label>
        <label className="grid gap-1">
          <span className="text-[#A855F7]">channel</span>
          <select className={field} value={form.channel} onChange={set("channel")}>
            <option value="collaboration">collaboration</option>
            <option value="hiring">hiring</option>
            <option value="security-review">security-review</option>
          </select>
        </label>
        <label className="grid gap-1">
          <span className="text-[#A855F7]">payload</span>
          <textarea required rows={4} className={field} value={form.message} onChange={set("message")} />
        </label>
        <button
          disabled={sending}
          className="border border-[#22C55E] px-3 py-2 text-[#22C55E] transition hover:border-[#EC4899] hover:bg-[#EC4899]/10 hover:text-[#EC4899] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#EC4899] disabled:opacity-50"
        >
          {sending ? "transmitting..." : "transmit payload"}
        </button>
      </form>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Operator profile                                                    */
/* ------------------------------------------------------------------ */

function OperatorProfile() {
  return (
    <Panel title="operator.profile" meta="access: public">
      <div className="cyber-portrait-frame relative mx-auto aspect-square w-full max-w-56 overflow-hidden border border-white/10 bg-black">
        <Image
          src={`${BASE_PATH}/operator-profile.png`}
          alt="White hooded cyber-operator emblem on a black background"
          width={513}
          height={500}
          priority
          className="cyber-portrait-image absolute inset-0 h-full w-full object-contain"
        />
        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),transparent_60%,rgba(0,0,0,0.16)),linear-gradient(rgba(4,8,12,0.08)_1px,transparent_1px)] bg-[length:auto,100%_5px]" />
        <div className="cyber-portrait-scan pointer-events-none absolute inset-x-0 top-0 z-20 h-1/3" />
        <span className="absolute left-3 top-3 z-30 text-[9px] tracking-[0.18em] text-zinc-300/70">YRS // 01</span>
        <span className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 text-[9px] tracking-wider text-zinc-300/80">
          <span className="h-1.5 w-1.5 motion-safe:animate-pulse rounded-full bg-[#22C55E]" />
          ONLINE
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#22C55E] shadow-[0_0_10px_#22C55E]" />
          <span className="text-sm font-bold text-zinc-100">{PROFILE.name}</span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">{PROFILE.title}</p>
        <p className="mt-2 text-[10px] text-[#A855F7]">{PROFILE.location}</p>
      </div>

      <div className="mt-4 border-y border-[#2563EB]/30 py-3 text-[10px]">
        <div className="flex justify-between">
          <span className="text-zinc-500">specialty</span>
          <span className="text-[#22C55E]">defensive security</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-zinc-500">current mission</span>
          <span className="text-[#3B82F6]">cloud engineering</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Areas of expertise">
        {["VAPT", "NETWORK DEFENSE", "OSINT"].map((skill) => (
          <span key={skill} className="border border-[#2563EB]/35 px-1.5 py-1 text-[9px] text-zinc-300">
            {skill}
          </span>
        ))}
      </div>

      <a
        href={`https://${PROFILE.linkedin}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex items-center justify-between border border-[#22C55E]/50 px-3 py-2 text-[10px] text-[#22C55E] transition hover:border-[#EC4899] hover:text-[#EC4899] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#22C55E]"
      >
        <span>open professional uplink</span>
        <span aria-hidden="true">↗</span>
      </a>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const NAV = [["identity", "identity"], ["arsenal", "arsenal"], ["logs", "operation logs"], ["console", "console"], ["uplink", "uplink"]];

export default function Page() {
  const [booted, setBooted] = useState(false);
  const [lines, setLines] = useState([
    { text: "session opened. type help for available commands." },
  ]);
  const push = useCallback((l) => setLines((p) => [...p, l]), []);
  const clear = useCallback(() => setLines([]), []);
  const finishBoot = useCallback(() => setBooted(true), []);

  return (
    <main className={`${mono.className} min-h-screen bg-[#030206] text-zinc-200`}>
      <style>{`
        html { scroll-behavior: smooth; }
        .cursor { display:inline-block; width:.55ch; height:1em; margin-left:2px; vertical-align:-2px; background:#22C55E; animation: blink 1s steps(1) infinite; }
        @keyframes blink { 50% { opacity: 0; } }
        .glitch { position: relative; display: inline-block; }
        .glitch::before, .glitch::after { content: attr(data-text); position:absolute; inset:0; opacity:0; pointer-events:none; }
        .glitch:hover::before { color:#D946EF; opacity:.9; animation: gl1 .35s steps(2) infinite; }
        .glitch:hover::after { color:#22C55E; opacity:.9; animation: gl2 .35s steps(2) infinite; }
        @keyframes gl1 { 0%{transform:translate(-2px,1px);clip-path:inset(0 0 60% 0)} 100%{transform:translate(2px,-1px);clip-path:inset(40% 0 0 0)} }
        @keyframes gl2 { 0%{transform:translate(2px,-1px);clip-path:inset(50% 0 0 0)} 100%{transform:translate(-2px,1px);clip-path:inset(0 0 50% 0)} }
        .skill:hover { color:#EC4899; }
        @media (prefers-reduced-motion: reduce) { .cursor, .glitch::before, .glitch::after { animation: none !important; } html { scroll-behavior: auto; } }
      `}</style>

      <MatrixCanvas />

      <AnimatePresence>{!booted && <BootSequence onDone={finishBoot} />}</AnimatePresence>

      {booted && (
        <div className="mx-auto grid max-w-7xl gap-4 p-4 xl:grid-cols-[180px_minmax(0,1fr)_250px]">
          <aside className="lg:sticky lg:top-4 lg:self-start">
            <div className="border border-[#2563EB]/30 bg-black/70 p-3 text-xs">
              <div className="text-[#22C55E]">{PROFILE.name}</div>
              <div className="mt-1 text-zinc-500">{PROFILE.location}</div>
              <nav className="mt-4 grid gap-1" aria-label="sections">
                {NAV.map(([id, label]) => (
                  <a key={id} href={`#${id}`} className="text-zinc-300 hover:text-[#EC4899] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#22C55E]">
                    &gt; {label}
                  </a>
                ))}
              </nav>
              <div className="mt-4 border-t border-[#2563EB]/30 pt-3 text-zinc-500">
                <div>
                  uplink: <span className="text-[#22C55E]">online</span>
                </div>
                <div className="break-all">{PROFILE.email}</div>
              </div>
            </div>
          </aside>

          <div className="grid gap-4 lg:grid-cols-2">
            <Identity />
            <Arsenal />
            <Operations />
            <Console lines={lines} push={push} clear={clear} />
            <Uplink push={push} />
          </div>

          <aside aria-label="Operator profile" className="xl:sticky xl:top-4 xl:self-start">
            <OperatorProfile />
          </aside>
        </div>
      )}
    </main>
  );
}
