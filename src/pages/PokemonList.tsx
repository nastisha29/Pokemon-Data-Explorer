import { useState } from "react";
import { usePokemonTableData } from "../hooks/usePokemon";
import PokemonTable from "../components/PokemonTable";

const ITEMS_PER_PAGE = 20;

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data, totalCount, isLoading, isError, error } = usePokemonTableData(
    offset,
    ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-lg font-medium text-base-content/70">
            Loading Pokémon...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card bg-base-100 shadow-xl min-h-[60vh] flex flex-col items-center justify-center p-8">
          <div className="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="font-bold">Error Loading Pokémon</h3>
              <div className="text-sm">
                {error instanceof Error
                  ? error.message
                  : "An unexpected error occurred"}
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-primary"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Pokémon Data Explorer
          </h1>
        </div>
        <p className="text-xl text-base-content/70">
          Explore and discover all {totalCount.toLocaleString()} Pokémon
        </p>
      </div>

      <PokemonTable
        data={data}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PokemonList;
