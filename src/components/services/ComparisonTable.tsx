type Columns = { service: string; who: string; get: string; bring: string };

/**
 * Four-column comparison. From md up it is a regular table; below md each row
 * stacks into a labelled block, so there is no horizontal scroll on phones.
 */
export default function ComparisonTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: Columns;
  rows: Columns[];
}) {
  const cell =
    "block py-1 text-ui text-muted md:table-cell md:border-t md:border-rule md:px-4 md:py-5 md:align-top first:md:pl-0 last:md:pr-0";
  const label =
    "mb-0.5 block text-meta font-medium text-ink md:hidden";

  return (
    <table className="block w-full border-collapse text-left md:table">
      <caption className="sr-only">{caption}</caption>
      <thead className="sr-only md:not-sr-only md:table-header-group">
        <tr className="md:table-row">
          {(Object.keys(columns) as (keyof Columns)[]).map((key) => (
            <th
              key={key}
              scope="col"
              className="px-4 pb-3 text-meta font-medium text-accent first:pl-0 last:pr-0"
            >
              {columns[key]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="block md:table-row-group">
        {rows.map((row) => (
          <tr key={row.service} className="block border-t border-rule py-5 md:table-row md:py-0">
            <th scope="row" className="block pb-2 text-left font-sans text-[1.1875rem] font-semibold text-ink md:table-cell md:border-t md:border-rule md:px-4 md:py-5 md:align-top md:pl-0 md:text-ui md:text-ink">
              {row.service}
            </th>
            <td className={cell}>
              <span className={label}>{columns.who}</span>
              {row.who}
            </td>
            <td className={cell}>
              <span className={label}>{columns.get}</span>
              {row.get}
            </td>
            <td className={cell}>
              <span className={label}>{columns.bring}</span>
              {row.bring}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
