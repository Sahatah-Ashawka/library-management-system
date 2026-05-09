"use client";
import { Book } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { StatusBadge } from "./StatusBadge";
export function BookCard({ book }: { book: Book }) {
  const out = book.availableCopies <= 0;
  const preview = book.description.length > 92 ? `${book.description.slice(0, 92)}...` : book.description;
  return <Link href={`/books/${book.id}`} className={`book-card ${out ? "out-of-stock" : ""}`}><div style={{ position: "relative", height: 250 }}><Image src={book.coverImage} alt={book.title} fill sizes="(max-width: 900px) 95vw, 360px" style={{ objectFit: "cover" }} /></div><div style={{ padding: "1rem" }}><div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", alignItems: "center" }}><span className="chip">{book.genre}</span><StatusBadge out={out} /></div><h3 style={{ margin: "0.5rem 0 0.2rem", fontSize: "1.1rem" }}>{book.title}</h3><p style={{ margin: 0, color: "var(--cream)", opacity: 0.82, fontSize: "0.92rem" }}>by {book.author}</p><p style={{ margin: "0.65rem 0 0", color: "var(--muted)", fontSize: "0.92rem", lineHeight: 1.5 }}>{preview}</p><div style={{ marginTop: "0.75rem", color: out ? "var(--danger)" : "var(--gold)", fontWeight: 700 }}>{book.availableCopies} copies left</div></div></Link>;
}
