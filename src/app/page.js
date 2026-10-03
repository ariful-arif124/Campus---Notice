"use client";

import { useMemo, useState } from "react";
import { notices } from "./data/notices";

const categories = [
  "All notices",
  "Academic",
  "Examination",
  "Events",
  "Career",
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All notices");
  const [search, setSearch] = useState("");

  const filteredNotices = useMemo(() => {
    const query = search.toLowerCase().trim();

    return notices.filter((notice) => {
      const matchesCategory =
        activeCategory === "All notices" ||
        notice.category === activeCategory;

      const matchesSearch =
        !query ||
        notice.title.toLowerCase().includes(query) ||
        notice.description.toLowerCase().includes(query) ||
        notice.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
              C
            </span>
            <span>
              <span className="block text-base font-bold tracking-tight">
                Campus<span className="text-indigo-600">Hub</span>
              </span>
              <span className="block text-xs text-slate-500">Notice board</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex">
            <a className="text-indigo-700" href="#notices">Notices</a>
            <a className="transition hover:text-indigo-700" href="#events">Events</a>
            <a className="transition hover:text-indigo-700" href="#about">About</a>
          </nav>

          <a
            href="#notices"
            className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Explore notices
          </a>
        </div>
      </header>

      <section className="overflow-hidden bg-indigo-700">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">
              Your campus, in the loop
            </p>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Everything happening on campus.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-indigo-100 sm:text-lg">
              Find the latest academic updates, important deadlines, events,
              and opportunities—all in one place.
            </p>

            <a
              href="#notices"
              className="mt-8 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
            >
              Browse latest notices <span className="ml-2">→</span>
            </a>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-indigo-400/30 blur-xl" />
            <img
              src="https://hstu.ac.bd/img/home/slider/up_hstu.jpg"
              alt="Campus grounds at Hajee Mohammad Danesh Science and Technology University"
              className="relative h-64 w-full rounded-2xl border border-white/20 object-cover shadow-2xl sm:h-80 md:h-[420px]"
            />
          </div>
        </div>
      </section>

      <section
        id="notices"
        className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16"
      >
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              STAY UP TO DATE
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">
              Latest notices
            </h2>
            <p className="mt-2 text-slate-500">
              Updates and announcements from across campus.
            </p>
          </div>

          <label className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:max-w-xs">
            <span aria-hidden="true" className="text-slate-400">⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search notices..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              aria-label="Search notices"
            />
          </label>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filteredNotices.map((notice) => (
            <article
              key={notice.id}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {notice.category}
                </span>
                <span className="text-xs text-slate-400">{notice.date}</span>
              </div>

              <h3 className="mt-5 text-lg font-bold leading-snug tracking-tight">
                {notice.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {notice.description}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-medium text-slate-500">
                  {notice.tag}
                </span>

                <a
                  href={`/notices/${notice.id}`}
                  className="inline-flex items-center rounded-lg bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-800 transition hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                >
                  Read notice →
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="font-semibold">No notices found</p>
            <p className="mt-1 text-sm text-slate-500">
              Try another search or choose a different category.
            </p>
          </div>
        )}
      </section>

      <footer id="about" className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            <span className="font-semibold text-slate-700">CampusHub</span>
            {" "}· Campus updates made simple
          </p>
          <p>© 2026 CampusHub</p>
        </div>
      </footer>
    </main>
  );
}