interface LoadingStateProps {
  fullPage?: boolean;
  message?: string;
}

const LoadingState = ({ fullPage = false, message }: LoadingStateProps) => {
  if (fullPage) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-lg font-medium text-base-content/70">
            {message || "Loading Pokémon..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-16 text-center shadow-xl border border-purple-100">
      <div className="flex flex-col items-center gap-3">
        <span className="loading loading-spinner loading-lg text-purple-600"></span>
        <p className="text-sm text-gray-600 font-medium">
          {message || "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default LoadingState;
