import { Book } from "@/types";
import { BookCard } from "./BookCard";

export function BookGrid({ books }: { books: Book[] }) {
  if (books.length === 0) {
    return (
      <section className="glass" style={{ padding: "1.6rem", textAlign: "center" }}>
        <h3 style={{ margin: "0 0 0.4rem" }}>No books found</h3>
        <p style={{ margin: 0, color: "var(--muted)" }}>
          Try a different keyword or genre and uncover another corner of the library.
        </p>
      </section>
    );
  }

  return <section className="grid book-grid">{books.map((b) => <BookCard key={b.id} book={b} />)}</section>;
}
