"use client";

import { useState, useRef, type FormEvent } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import emailjs from "@emailjs/browser";
import {
  Github,
  Linkedin,
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
} from "lucide-react";
import { LeetCodeIcon } from "./icons";

type Status = "idle" | "loading" | "success" | "error";

const ease = [0.22, 1, 0.36, 1] as const;

// EmailJS credentials must be supplied via NEXT_PUBLIC_EMAILJS_* env vars.
// No hardcoded fallbacks — if they are missing the form shows an error with a
// direct mailto link so the user can still reach you.

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/CodeWhizPuneet",
    icon: Github,
    handle: "@CodeWhizPuneet",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/puneetshankar",
    icon: Linkedin,
    handle: "/puneetshankar",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/CodeWhizPuneet",
    icon: LeetCodeIcon,
    handle: "@CodeWhizPuneet",
  },
  {
    label: "Email",
    href: "mailto:puneetshankar2021@gmail.com",
    icon: Mail,
    handle: "puneetshankar2021@gmail.com",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const numberY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
  const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
  const emailJsOwnerTemplateId =
    process.env.NEXT_PUBLIC_EMAILJS_OWNER_TEMPLATE_ID || emailJsTemplateId;
  const emailJsAutoReplyTemplateId =
    process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID || emailJsTemplateId;
  const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
  const contactReceiverEmail =
    process.env.NEXT_PUBLIC_CONTACT_RECEIVER_EMAIL ?? "";

  function getEmailJsErrorDetails(error: unknown) {
    if (!error || typeof error !== "object") return null;

    const maybeError = error as {
      status?: number;
      text?: string;
      message?: string;
      name?: string;
    };

    const parts: string[] = [];
    if (typeof maybeError.status === "number") {
      parts.push(`status ${maybeError.status}`);
    }
    if (typeof maybeError.text === "string" && maybeError.text.trim()) {
      parts.push(maybeError.text.trim());
    } else if (
      typeof maybeError.message === "string" &&
      maybeError.message.trim()
    ) {
      parts.push(maybeError.message.trim());
    } else if (typeof maybeError.name === "string" && maybeError.name.trim()) {
      parts.push(maybeError.name.trim());
    }

    return parts.length ? parts.join(" - ") : null;
  }

  function buildMailtoLink(fromName: string, fromEmail: string, body: string) {
    const subject = encodeURIComponent(`Portfolio Contact - ${fromName}`);
    const content = encodeURIComponent(
      `Name: ${fromName}\nEmail: ${fromEmail}\n\n${body}`
    );
    return `mailto:${contactReceiverEmail || "puneetshankar2021@gmail.com"}?subject=${subject}&body=${content}`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus("error");
      setFeedbackMessage("Please fill in all fields before sending.");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    setStatus("loading");
    setFeedbackMessage("");

    if (
      !emailJsServiceId ||
      !emailJsOwnerTemplateId ||
      !emailJsAutoReplyTemplateId ||
      !emailJsPublicKey
    ) {
      console.error("EmailJS config is missing. Check NEXT_PUBLIC_EMAILJS_* variables.");
      setStatus("error");
      setFeedbackMessage(
        "Contact form is temporarily unavailable. Please email directly using the link below."
      );
      setTimeout(() => setStatus("idle"), 7000);
      return;
    }

    try {
      const commonParams = {
        from_name: trimmedName,
        name: trimmedName,
        message: trimmedMessage,
        title: trimmedMessage,
        visitor_email: trimmedEmail,
      };

      // 1) Owner notification: always route this to your inbox.
      await emailjs.send(
        emailJsServiceId,
        emailJsOwnerTemplateId,
        {
          ...commonParams,
          from_email: trimmedEmail,
          to_name: "Puneet",
          email: contactReceiverEmail,
          to_email: contactReceiverEmail,
          owner_email: contactReceiverEmail,
          sender_email: trimmedEmail,
          user_email: trimmedEmail,
          recipient_email: contactReceiverEmail,
          to: contactReceiverEmail,
          contact_email: trimmedEmail,
          contact_message: trimmedMessage,
          reply_to: trimmedEmail,
        },
        emailJsPublicKey
      );

      // 2) Visitor auto-reply: route this to sender email.
      let autoReplyFailed = false;
      try {
        await emailjs.send(
          emailJsServiceId,
          emailJsAutoReplyTemplateId,
          {
            ...commonParams,
            from_email: contactReceiverEmail,
            to_name: trimmedName,
            email: trimmedEmail,
            to_email: trimmedEmail,
            owner_email: contactReceiverEmail,
            sender_email: trimmedEmail,
            user_email: trimmedEmail,
            recipient_email: trimmedEmail,
            to: trimmedEmail,
            contact_email: trimmedEmail,
            contact_message: trimmedMessage,
            reply_to: contactReceiverEmail,
          },
          emailJsPublicKey
        );
      } catch (autoReplyError) {
        autoReplyFailed = true;
        console.error(
          "EmailJS auto-reply failed:",
          getEmailJsErrorDetails(autoReplyError) ?? autoReplyError
        );
      }

      setStatus("success");
      setFeedbackMessage(
        autoReplyFailed
          ? "Message sent to Puneet successfully. Auto-reply could not be sent right now."
          : "Message sent successfully. I'll get back to you soon."
      );
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      const errorDetails = getEmailJsErrorDetails(error);
      console.error("EmailJS send failed:", errorDetails ?? error);
      setStatus("error");
      setFeedbackMessage(
        errorDetails
          ? `Could not send via form (${errorDetails}). Please use direct email below.`
          : "Could not send via form right now. Please use direct email below."
      );
      setTimeout(() => setStatus("idle"), 7000);
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6 md:px-12"
    >
      {/* Ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-[0.04] pointer-events-none">
        <div
          className="w-full h-full rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, #F59E0B, transparent 70%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Giant background number */}
        <motion.span
          style={{ y: numberY }}
          className="absolute -top-16 -left-4 text-[12rem] md:text-[18rem] font-black leading-none text-white/[0.02] select-none pointer-events-none"
        >
          05
        </motion.span>

        {/* Section header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="h-[1px] w-12 bg-gradient-to-r from-accent to-transparent" />
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent">
              &#x2F;&#x2F; contact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-primary"
          >
            Let&apos;s Talk
          </motion.h2>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="lg:col-span-2 flex flex-col"
          >
            {/* Tagline */}
            <div className="mb-10">
              <p className="text-2xl md:text-3xl font-bold text-primary leading-snug mb-4">
                Got a project or idea?{" "}
                <span className="gradient-text">Let&apos;s build it.</span>
              </p>
              <p className="text-secondary leading-relaxed">
                I&apos;m always open to discussing new opportunities,
                interesting engineering challenges, or potential collaborations.
              </p>
            </div>

            {/* Info cards */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border/30 bg-surface/20">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm text-secondary">India</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border/30 bg-surface/20">
                <Clock className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-sm text-secondary">
                  Usually responds within 24 hours
                </span>
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-2">
                Connect
              </p>
              {socials.map(({ label, href, icon: Icon, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-lg border border-border/30 bg-surface/20 hover:border-accent/20 hover:bg-accent/[0.03] transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-primary group-hover:text-accent transition-colors duration-200">
                      {label}
                    </p>
                    <p className="text-[11px] font-mono text-tertiary">
                      {handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 md:p-10 space-y-8"
            >
              {/* Name */}
              <div className="relative">
                <label
                  htmlFor="name"
                  className={`block text-[10px] font-mono uppercase tracking-[0.3em] mb-3 transition-colors duration-300 ${focusedField === "name" ? "text-accent" : "text-secondary"
                    }`}
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your name"
                  className="w-full bg-transparent border-b-2 border-border/50 py-3 text-primary placeholder:text-tertiary/40 outline-none focus:border-accent transition-colors duration-400"
                />
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-accent"
                  initial={{ width: "0%" }}
                  animate={{
                    width: focusedField === "name" ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3, ease }}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="email"
                  className={`block text-[10px] font-mono uppercase tracking-[0.3em] mb-3 transition-colors duration-300 ${focusedField === "email" ? "text-accent" : "text-secondary"
                    }`}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent border-b-2 border-border/50 py-3 text-primary placeholder:text-tertiary/40 outline-none focus:border-accent transition-colors duration-400"
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-accent"
                  initial={{ width: "0%" }}
                  animate={{
                    width: focusedField === "email" ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3, ease }}
                />
              </div>

              {/* Message */}
              <div className="relative">
                <label
                  htmlFor="message"
                  className={`block text-[10px] font-mono uppercase tracking-[0.3em] mb-3 transition-colors duration-300 ${focusedField === "message" ? "text-accent" : "text-secondary"
                    }`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project, idea, or just say hello..."
                  className="w-full bg-transparent border-b-2 border-border/50 py-3 text-primary placeholder:text-tertiary/40 outline-none focus:border-accent transition-colors duration-400 resize-none"
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-accent"
                  initial={{ width: "0%" }}
                  animate={{
                    width: focusedField === "message" ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.3, ease }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="glow-button w-full py-4 rounded-xl bg-accent text-background font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Feedback */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-green-400/30 bg-green-400/[0.06]"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-sm text-green-400 font-medium">
                    {feedbackMessage ||
                      "Message sent! I&apos;ll get back to you within 24 hours."}
                  </p>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-red-400/30 bg-red-400/[0.06]"
                >
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div className="text-sm text-red-400 font-medium">
                    <p>{feedbackMessage || "Something went wrong. Please try again."}</p>
                    <a
                      href={buildMailtoLink(name.trim(), email.trim(), message.trim())}
                      className="inline-flex mt-2 underline underline-offset-4 hover:text-red-300 transition-colors duration-200"
                    >
                      Email me directly
                    </a>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
