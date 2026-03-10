"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink, GitFork } from "lucide-react";
import { useSiteData } from "@/app/lib/siteData";
import SectionWrapper from "./SectionWrapper";
import GlassCard from "./GlassCard";
import { type GitHubRepo, languageColors } from "@/app/lib/github";

/**
 * Projects — Fetches and displays GitHub repositories in glassmorphism cards
 */
export default function Projects() {
  const { data } = useSiteData();
  const proj = data.projects;
  const githubUsername = proj.githubUsername;
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=12&type=owner`,
          { headers: { Accept: "application/vnd.github.v3+json" } }
        );
        if (!res.ok) throw new Error("Failed");
        const data: GitHubRepo[] = await res.json();
        const filtered = data
          .filter((r) => !r.name.includes(".github.io"))
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(filtered);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadRepos();
  }, [githubUsername]);

  return (
    <SectionWrapper id="projects">
      {/* Section Header */}
      <div className="mb-10 text-center sm:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 text-sm font-medium uppercase tracking-widest text-purple-400"
        >
          {proj.subtitle}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
        >
          {proj.title}
        </motion.h2>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="flex items-center gap-3 text-gray-400">
            <motion.div
              className="h-5 w-5 rounded-full border-2 border-purple-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Loading projects...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="py-20 text-center text-gray-500">Failed to load projects</div>
      )}

      {/* Repository cards */}
      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <GlassCard className="flex h-full flex-col justify-between">
                  <div>
                    {/* Repo name */}
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-white line-clamp-1">
                        {repo.name}
                      </h3>
                      <ExternalLink size={16} className="mt-1 shrink-0 text-gray-500" />
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-sm leading-relaxed text-gray-400 line-clamp-2">
                      {repo.description || "No description provided"}
                    </p>
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {/* Language */}
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor:
                              languageColors[repo.language] || "#888",
                          }}
                        />
                        <span>{repo.language}</span>
                      </div>
                    )}

                    {/* Stars */}
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1">
                        <Star size={12} />
                        <span>{repo.stargazers_count}</span>
                      </div>
                    )}

                    {/* Forks */}
                    {repo.forks_count > 0 && (
                      <div className="flex items-center gap-1">
                        <GitFork size={12} />
                        <span>{repo.forks_count}</span>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </a>
            </motion.div>
          ))}
        </div>
      )}

      {/* View all link */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-gray-300 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10 hover:text-white"
          >
            View on GitHub
            <ExternalLink size={14} />
          </a>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
