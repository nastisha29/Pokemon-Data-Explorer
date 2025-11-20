import { useState, useMemo } from "react";
import { usePokemonTableData } from "../hooks/usePokemonTableData";
import { usePokemonByTypeData } from "../hooks/usePokemonTypes";
import { useSearchPokemon } from "../hooks/usePokemonSearch";
import PokemonTable from "../components/PokemonTable";
import FilterPanel from "../components/FilterPanel";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import PageHeader from "../components/PageHeader";

const ITEMS_PER_PAGE = 20;

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const defaultData = usePokemonTableData(offset, ITEMS_PER_PAGE);
  const typeData = usePokemonByTypeData(typeFilter, currentPage, ITEMS_PER_PAGE);
  const searchData = useSearchPokemon(searchFilter, currentPage, ITEMS_PER_PAGE);

  const activeData = useMemo(() => {
    if (searchFilter && !typeFilter) return searchData;
    if (typeFilter) return typeData;
    return defaultData;
  }, [searchFilter, typeFilter, searchData, typeData, defaultData]);

  const totalPages = useMemo(
    () => Math.ceil(activeData.totalCount / ITEMS_PER_PAGE),
    [activeData.totalCount]
  );

  const data = useMemo(() => {
    if (!activeData.data) return [];

    // If both search and type filter are active, filter the type results by name
    if (searchFilter && typeFilter) {
      return activeData.data.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    return activeData.data;
  }, [activeData.data, searchFilter, typeFilter]);

  const totalCount = defaultData.totalCount;
  const isLoading = activeData.isLoading;
  const isError = activeData.isError;
  const error = defaultData.error;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearchFilter(value);
    setCurrentPage(1);
  };

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchFilter("");
    setTypeFilter("");
    setCurrentPage(1);
  };

  // Only show full-page loading on initial load (no filters active)
  if (isLoading && !searchFilter && !typeFilter) {
    return <LoadingState fullPage />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="container mx-auto px-4 pt-12 max-w-7xl">
        <PageHeader totalCount={totalCount} />

        <FilterPanel
          searchValue={searchFilter}
          typeFilter={typeFilter}
          onSearchChange={handleSearchChange}
          onTypeFilterChange={handleTypeFilterChange}
        />

        {isLoading ? (
          <LoadingState
            message={
              searchFilter ? `Searching for "${searchFilter}"...` : "Loading..."
            }
          />
        ) : data.length === 0 ? (
          <EmptyState onClearFilters={handleClearFilters} />
        ) : (
          <PokemonTable
            data={data}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default PokemonList;
