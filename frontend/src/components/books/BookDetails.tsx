import { Book } from "@/types";
import Image from "next/image";
import { BorrowButton } from "./BorrowButton";

export function BookDetails({ book }: { book: Book }) {
  const out = book.availableCopies <= 0;

  return (
    <article className="glass details-layout" style={{ padding: "1.2rem", display: "grid", gap: "1rem", gridTemplateColumns: "1fr 1.35fr" }}>
      <div style={{ position: "relative", minHeight: 420 }}>
        <Image src={book.coverImage} alt={book.title} fill sizes="(max-width: 900px) 95vw, 40vw" style={{ objectFit: "cover", borderRadius: 16 }} />
      </div>

      <div>
        <div className="chip" style={{ display: "inline-block" }}>{book.genre}</div>
        <h1 style={{ margin: "0.5rem 0 0.3rem" }}>{book.title}</h1>
        <p style={{ color: "var(--muted)", marginTop: 0 }}>by {book.author}</p>

        <p style={{ lineHeight: 1.75 }}>{book.description}</p>

        <div className="glass" style={{ padding: "0.85rem", marginBottom: "0.9rem" }}>
          <p style={{ margin: "0.2rem 0" }}>Total copies: <b>{book.totalCopies}</b></p>
          <p style={{ margin: "0.2rem 0" }}>Available copies: <b>{book.availableCopies}</b></p>
          <p style={{ margin: "0.2rem 0", color: out ? "var(--danger)" : "var(--success)" }}>
            Availability status: <b>{out ? "Out of stock" : "Available"}</b>
          </p>
        </div>

        <BorrowButton bookId={book.id} available={book.availableCopies} />
      </div>
    </article>
  );
}
