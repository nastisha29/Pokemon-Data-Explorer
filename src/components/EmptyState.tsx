interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState = ({ onClearFilters }: EmptyStateProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center shadow-xl border border-purple-100">
      <p className="text-gray-700 mb-6 text-lg">No Pokémon found</p>
      <button
        className="btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default EmptyState;
