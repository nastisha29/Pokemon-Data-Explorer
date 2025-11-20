import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { usePokemonDetails } from "../hooks/usePokemonDetails";
import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import { getTypeColor, getTypeTextColor } from "../utils/pokemonColors";

const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = usePokemonDetails(Number(id));

  if (isLoading) {
    return <LoadingState fullPage />;
  }

  if (isError || !pokemon) {
    return <ErrorState error={error} />;
  }

  const primaryType = pokemon.types[0].type.name;
  const primaryColor = getTypeColor(primaryType);

  return (
    <div className="flex items-center overflow-hidden">
      <div className="container mx-auto px-2 max-w-6xl w-full m-12">
        <button
          onClick={() => navigate(`/?${searchParams.toString()}`)}
          className="btn btn-ghost btn-sm mb-3 hover:bg-white/50"
        >
          ← Back
        </button>

        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
            <div
              className="p-4 text-center"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}20 0%, ${primaryColor}40 100%)`,
              }}
            >
              <h1 className="text-3xl font-black capitalize mb-2 text-gray-800">
                {pokemon.name}
              </h1>
              <div className="flex gap-2 justify-center">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="px-3 py-1 rounded-full font-bold uppercase text-xs shadow-lg"
                    style={{
                      backgroundColor: getTypeColor(type.type.name),
                      color: getTypeTextColor(type.type.name),
                    }}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-center py-4 bg-gradient-to-b from-transparent to-purple-50/30">
              <img
                src={
                  pokemon.sprites.other["official-artwork"].front_default ||
                  pokemon.sprites.front_default
                }
                alt={pokemon.name}
                className="w-56 h-56 object-contain drop-shadow-2xl"
              />
            </div>

            <div className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-purple-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Height
                  </p>
                  <p className="text-2xl font-black text-gray-800">
                    {pokemon.height / 10}
                    <span className="text-sm text-gray-600">m</span>
                  </p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Weight
                  </p>
                  <p className="text-2xl font-black text-gray-800">
                    {pokemon.weight / 10}
                    <span className="text-sm text-gray-600">kg</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 p-4">
              <h2 className="text-lg font-black mb-3 text-gray-800">
                Base Stats
              </h2>
              <div className="space-y-2.5">
                {pokemon.stats.map((stat) => {
                  const percentage = Math.min(
                    (stat.base_stat / 255) * 100,
                    100
                  );
                  return (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-xs font-semibold text-gray-700 capitalize">
                          {stat.stat.name.replace("-", " ")}
                        </span>
                        <span className="text-xs font-black text-gray-900">
                          {stat.base_stat}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                <span className="font-bold text-sm text-gray-700">Total</span>
                <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                </span>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 p-4">
              <h2 className="text-lg font-black mb-3 text-gray-800">
                Abilities
              </h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <div
                    key={ability.ability.name}
                    className="px-4 py-2 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200"
                  >
                    <span className="capitalize font-semibold text-sm text-gray-800">
                      {ability.ability.name.replace(/-/g, " ")}
                    </span>
                    {ability.is_hidden && (
                      <span className="ml-2 text-xs font-bold text-purple-600">
                        (Hidden)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
