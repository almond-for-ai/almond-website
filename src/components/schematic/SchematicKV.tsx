export function SchematicKV({
  rows,
  className = "",
}: {
  rows: { key: string; value: string }[];
  className?: string;
}) {
  return (
    <dl className={`space-y-[4px] ${className}`}>
      {rows.map((row) => (
        <div key={row.key} className="flex gap-[6px] font-mono text-[10px] leading-[14px]">
          <dt className="text-black/45">{row.key}</dt>
          <dd className="text-walnut-500">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
