import { useEffect, useState } from "react";
import { getBookmarks, saveBookmarks } from "./utils/storage";

function App() {
  const [bookmarks, setBookmarks] = useState(() => getBookmarks());

  useEffect(() => {
    saveBookmarks(bookmarks);
  }, [bookmarks]);

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">DevStash</h1>

        <p className="mt-2 text-slate-400">
          Developer Resource Hub
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {bookmarks.map((bookmark) => (
            <article
              key={bookmark.id}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              <h2 className="text-xl font-semibold">
                {bookmark.title}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {bookmark.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {bookmark.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  {bookmark.category}
                </span>

                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-400 hover:text-blue-300"
                >
                  Open
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;