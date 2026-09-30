import { dummyBookmarks } from "../data/dummyBookmarks";

const STORAGE_KEY = "devstash_bookmarks";

export function getBookmarks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return dummyBookmarks;
    }

    const bookmarks = JSON.parse(stored);

    if (!Array.isArray(bookmarks)) {
      return dummyBookmarks;
    }

    return bookmarks;
  } catch (error) {
    console.error("Failed to load bookmarks:", error);
    return dummyBookmarks;
  }
}

export function saveBookmarks(bookmarks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error("Failed to save bookmarks:", error);
  }
}

export function addBookmark(bookmark) {
  const bookmarks = getBookmarks();
  const updatedBookmarks = [...bookmarks, bookmark];

  saveBookmarks(updatedBookmarks);

  return updatedBookmarks;
}

export function updateBookmark(id, data) {
  const bookmarks = getBookmarks();

  const updatedBookmarks = bookmarks.map((bookmark) =>
    bookmark.id === id
      ? {
          ...bookmark,
          ...data,
          updatedAt: new Date().toISOString(),
        }
      : bookmark
  );

  saveBookmarks(updatedBookmarks);

  return updatedBookmarks;
}

export function deleteBookmark(id) {
  const bookmarks = getBookmarks();

  const updatedBookmarks = bookmarks.filter(
    (bookmark) => bookmark.id !== id
  );

  saveBookmarks(updatedBookmarks);

  return updatedBookmarks;
}