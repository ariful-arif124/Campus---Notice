import { notFound } from "next/navigation";
import { notices } from "../../data/notices";

export default async function NoticeDetail({ params }) {
  const { id } = await params;
  const notice = notices.find((item) => item.id === id);

  if (!notice) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f8fc] px-5 py-12 text-slate-900">
      <article className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        <a
          href="/"
          className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
        >
          ← Back to notices
        </a>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {notice.category}
          </span>
          <span className="text-sm text-slate-500">{notice.date}</span>
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          {notice.title}
        </h1>

        <p className="mt-3 text-sm font-semibold text-indigo-600">
          {notice.tag}
        </p>

        <p className="mt-6 leading-7 text-slate-600">
          {notice.fullDetails}
        </p>
      </article>
    </main>
  );
}