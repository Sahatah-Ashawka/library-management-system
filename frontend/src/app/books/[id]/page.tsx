import { Header } from "@/components/ui/Header";
import { BookDetails } from "@/components/books/BookDetails";
import { API_URL } from "@/lib/api";
import { Book } from "@/types";

async function getBook(id: string): Promise<Book> {
  const res = await fetch(`${API_URL}/books/${id}`, { cache: "no-store" });
  const json = await res.json();
  return json.data;
}

export default async function BookDetailsPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  return (
    <main className="container">
      <Header />
      <BookDetails book={book} />
    </main>
  );
}
