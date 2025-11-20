import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type FilterFn,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import type { PokemonTableData } from "../types/pokemon";

const columnHelper = createColumnHelper<PokemonTableData>();

interface PokemonTableProps {
  data: PokemonTableData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const typeColors: Record<string, string> = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

const PokemonTable = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
}: PokemonTableProps) => {
  const navigate = useNavigate();

  const globalFilterFn: FilterFn<PokemonTableData> = (
    row,
    _columnId,
    filterValue
  ) => {
    const searchValue = filterValue.toLowerCase();
    return row.original.name.toLowerCase().includes(searchValue);
  };

  const columns = [
    columnHelper.accessor("id", {
      header: () => <div className="text-center">ID</div>,
      cell: (info) => (
        <div className="text-center">
          <span className="font-bold text-sm">
            {String(info.getValue()).padStart(3, "0")}
          </span>
        </div>
      ),
      meta: {
        className: "text-center",
      },
    }),
    columnHelper.accessor("sprite", {
      header: () => <div className="text-center">Image</div>,
      cell: (info) => (
        <div className="flex justify-center">
          <div className="avatar">
            <div className="w-24 h-24 rounded flex items-center justify-center">
              <img
                src={info.getValue()}
                alt={info.row.original.name}
                className="pixelated w-full h-full object-contain"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>
        </div>
      ),
      enableColumnFilter: false,
      meta: {
        className: "text-center",
      },
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => (
        <span className="font-semibold capitalize text-base">
          {info.getValue()}
        </span>
      ),
      meta: {
        className: "text-left",
      },
    }),
    columnHelper.accessor("types", {
      header: "Type(s)",
      cell: (info) => (
        <div className="flex gap-2">
          {info.getValue().map((type) => (
            <span
              key={type}
              className="badge badge-sm font-semibold uppercase"
              style={{
                backgroundColor: typeColors[type] || "#888",
                color: type === "electric" ? "#333" : "#fff",
                borderColor: typeColors[type] || "#888",
              }}
            >
              {type}
            </span>
          ))}
        </div>
      ),
      meta: {
        className: "text-left",
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
  });

  const handleRowClick = (pokemonId: number) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-primary-content">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`font-bold text-sm uppercase tracking-wide ${
                      (header.column.columnDef.meta as { className?: string })
                        ?.className || ""
                    }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(row.original.id)}
                className="hover:bg-base-200 cursor-pointer transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={
                      (cell.column.columnDef.meta as { className?: string })
                        ?.className || ""
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-8 py-6">
        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-base-200 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <span className="text-base-content/60">«</span>
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-base-200 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <span className="text-base-content/60">‹</span>
        </button>

        <div className="flex items-baseline gap-1 min-w-[80px] justify-center">
          <span className="text-lg font-medium tabular-nums">
            {currentPage}
          </span>
          <span className="text-base-content/30 text-sm">/</span>
          <span className="text-sm text-base-content/50 tabular-nums">
            {totalPages}
          </span>
        </div>

        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-base-200 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <span className="text-base-content/60">›</span>
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center rounded hover:bg-base-200 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <span className="text-base-content/60">»</span>
        </button>
      </div>
    </div>
  );
};

export default PokemonTable;
