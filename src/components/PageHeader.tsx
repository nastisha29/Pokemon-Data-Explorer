interface PageHeaderProps {
  totalCount: number;
}

const PageHeader = ({ totalCount }: PageHeaderProps) => {
  return (
    <div className="mb-12 text-center">
      <div className="inline-block">
        <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Pokémon Explorer
        </h1>
        <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"></div>
      </div>
      <p className="text-gray-600 mt-4 text-lg">
        Discover all {totalCount.toLocaleString()} Pokémon
      </p>
    </div>
  );
};

export default PageHeader;
