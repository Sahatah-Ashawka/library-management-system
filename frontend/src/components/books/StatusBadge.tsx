export function StatusBadge({ out }: { out: boolean }) {
  return <span className={out ? "badge out" : "badge in"}>{out ? "Out of stock" : "Available"}</span>;
}
