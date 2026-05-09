"use client";

export function GenreFilter({
  genres,
  selected,
  onChange,
}: {
  genres: string[];
  selected: string;
  onChange: (genre: string) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      <button className={selected === "" ? "genre-pill active" : "genre-pill"} onClick={() => onChange("")}>All</button>
      {genres.map((genre) => (
        <button
          key={genre}
          className={selected.toLowerCase() === genre.toLowerCase() ? "genre-pill active" : "genre-pill"}
          onClick={() => onChange(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
