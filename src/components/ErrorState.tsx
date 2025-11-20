interface ErrorStateProps {
  error?: Error | unknown;
}

const ErrorState = ({ error }: ErrorStateProps) => {
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
};

export default ErrorState;
