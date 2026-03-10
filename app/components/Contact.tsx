"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Github,
  Linkedin,
  Mail,
  CheckCircle,
  AlertCircle,
  Globe,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import { useSiteData, type SocialLink } from "@/app/lib/siteData";
import SectionWrapper from "./SectionWrapper";
import GlassCard from "./GlassCard";

/**
 * Contact — Glassmorphism contact form with admin-editable social links
 */

// Map platform names to Lucide icons
function getPlatformIcon(platform: string) {
  switch (platform) {
    case "github":
      return <Github size={20} />;
    case "linkedin":
      return <Linkedin size={20} />;
    case "email":
      return <Mail size={20} />;
    case "twitter":
      return <Twitter size={20} />;
    case "instagram":
      return <Instagram size={20} />;
    case "youtube":
      return <Youtube size={20} />;
    default:
      return <Globe size={20} />;
  }
}

export default function Contact() {
  const { data } = useSiteData();
  const contact = data.contact;
  const socialLinks = data.social;
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate form submission (replace with actual API endpoint)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };



  return (
    <SectionWrapper id="contact">
      {/* Section Header */}
      <div className="mb-10 text-center sm:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 text-sm font-medium uppercase tracking-widest text-purple-400"
        >
          {contact.subtitle}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
        >
          {contact.title}
        </motion.h2>
      </div>

      <div className="mx-auto max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-xl text-center text-base text-gray-400 sm:mb-12 sm:text-lg"
        >
          {contact.description}
        </motion.p>

        <div className="grid gap-6 md:grid-cols-5 md:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <GlassCard hover={false} className="!p-5 sm:!p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none backdrop-blur-sm transition-all focus:border-purple-500/50 focus:bg-white/10 focus:ring-1 focus:ring-purple-500/20"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none backdrop-blur-sm transition-all focus:border-purple-500/50 focus:bg-white/10 focus:ring-1 focus:ring-purple-500/20"
                  />
                </div>
                <div>
                  <textarea
                    required
                    rows={5}
                    placeholder="Your Message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none backdrop-blur-sm transition-all focus:border-purple-500/50 focus:bg-white/10 focus:ring-1 focus:ring-purple-500/20"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40 disabled:opacity-60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "sending" ? (
                    <>
                      <motion.div
                        className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-green-400"
                  >
                    <CheckCircle size={16} /> Message sent successfully!
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400"
                  >
                    <AlertCircle size={16} /> Something went wrong. Try again.
                  </motion.div>
                )}
              </form>
            </GlassCard>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 md:col-span-2"
          >
            {socialLinks.map((link: SocialLink, i: number) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="flex items-center gap-4 !p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-purple-400">
                    {getPlatformIcon(link.platform)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{link.label}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[180px] sm:max-w-[140px] md:max-w-[180px]">
                      {link.url.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "")}
                    </p>
                  </div>
                </GlassCard>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
