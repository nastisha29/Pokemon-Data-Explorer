import { usePokemonTypes } from "../hooks/usePokemonTypes";
import { useState, useEffect } from "react";

interface FilterPanelProps {
  searchValue: string;
  typeFilter: string;
  onSearchChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
}

const FilterPanel = ({
  searchValue,
  typeFilter,
  onSearchChange,
  onTypeFilterChange,
}: FilterPanelProps) => {
  const { data: types, isLoading } = usePokemonTypes();
  const [searchInput, setSearchInput] = useState(searchValue);

  useEffect(() => {
    setSearchInput(searchValue);
  }, [searchValue]);

  const handleSearch = () => {
    onSearchChange(searchInput.trim().toLowerCase());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl mb-8 p-6 shadow-xl border border-purple-100">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="form-control flex-1 min-w-[250px]">
          <label className="label pb-1">
            <span className="label-text text-sm font-semibold text-gray-700">
              🔍 Search
            </span>
          </label>
          <div className="join w-full">
            <input
              type="text"
              className="input input-bordered join-item flex-1 focus:outline-none focus:ring-2 focus:ring-purple-400 border-gray-200"
              placeholder="Try 'pikachu'..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className="btn join-item bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className="form-control flex-1 min-w-[200px]">
          <label className="label pb-1">
            <span className="label-text text-sm font-semibold text-gray-700">
              ⚡ Type
            </span>
          </label>
          <select
            className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-purple-400 border-gray-200"
            value={typeFilter}
            onChange={(e) => onTypeFilterChange(e.target.value)}
            disabled={isLoading}
          >
            <option value="">All types</option>
            {types?.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-ghost btn-sm self-end hover:bg-red-50 hover:text-red-600 disabled:opacity-0 disabled:cursor-default transition-opacity"
          onClick={() => {
            setSearchInput("");
            onSearchChange("");
            onTypeFilterChange("");
          }}
          disabled={!searchValue && !typeFilter}
        >
          ✕ Clear
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
