import { Header } from "@/components/ui/Header";
import { BookFilters } from "@/components/books/BookFilters";
import { BookGrid } from "@/components/books/BookGrid";
import { API_URL } from "@/lib/api";
import { Book } from "@/types";

async function getBooks(search?: string, genre?: string) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (genre) params.set("genre", genre);
  const res = await fetch(`${API_URL}/books?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) return { books: [], genres: [] } as { books: Book[]; genres: string[] };
  const json = await res.json();
  return (json?.data || { books: [], genres: [] }) as { books: Book[]; genres: string[] };
}

export default async function HomePage({ searchParams }: { searchParams: { search?: string; genre?: string } }) {
  const data = await getBooks(searchParams.search, searchParams.genre);

  return (
    <main className="container">
      <Header />
      <section style={{ marginBottom: "1rem" }}>
        <h1 className="hero-title">Enter the Stacks of Aurelia</h1>
        <p className="hero-sub">
          A premium digital library where every shelf feels curated. Browse, search, and discover stories with elegant depth and focus.
        </p>
      </section>
      <BookFilters genres={data.genres} />
      <BookGrid books={data.books} />
    </main>
  );
}
