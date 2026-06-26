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
    href: "https://github.com/Harmanp456",
    icon: Github,
    handle: "@Harmanp456",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/harmanpreetkaur014",
    icon: Linkedin,
    handle: "/harmanpreetkaur014",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/HarmanpreetKaur",
    icon: LeetCodeIcon,
    handle: "@HarmanpreetKaur",
  },
  {
    label: "Email",
    href: "mailto:iharmansaini51@gmail.com",
    icon: Mail,
    handle: "iharmansaini51@gmail.com",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messa
<truncated 18033 bytes>
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
