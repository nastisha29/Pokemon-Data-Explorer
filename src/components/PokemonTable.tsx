import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import type { PokemonTableData } from "../types/pokemon";
import { getTypeColor, getTypeTextColor } from "../utils/pokemonColors";

const columnHelper = createColumnHelper<PokemonTableData>();

interface PokemonTableProps {
  data: PokemonTableData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PokemonTable = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
}: PokemonTableProps) => {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: () => <div className="text-center">ID</div>,
        cell: (info) => (
          <div className="text-center">
            <span className="font-bold text-sm">{String(info.getValue())}</span>
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
                  backgroundColor: getTypeColor(type),
                  color: getTypeTextColor(type),
                  borderColor: getTypeColor(type),
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
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (pokemonId: number) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100">
        <table className="table w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b-2 border-purple-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`font-bold text-xs uppercase tracking-wide text-purple-700 bg-gradient-to-r from-purple-50 to-pink-50 ${
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
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                onClick={() => handleRowClick(row.original.id)}
                className={`border-b border-purple-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  index % 2 === 0 ? "bg-white" : "bg-purple-50/30"
                }`}
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

      <div className="flex justify-center items-center gap-4 py-6">
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg disabled:hover:bg-white"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <span className="font-bold">«</span>
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg disabled:hover:bg-white"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <span className="font-bold">‹</span>
        </button>

        <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold tabular-nums text-lg">
              {currentPage}
            </span>
            <span className="text-white/70">/</span>
            <span className="text-white/90 tabular-nums">{totalPages}</span>
          </div>
        </div>

        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg disabled:hover:bg-white"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <span className="font-bold">›</span>
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg disabled:hover:bg-white"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <span className="font-bold">»</span>
        </button>
      </div>
    </div>
  );
};

export default PokemonTable;
