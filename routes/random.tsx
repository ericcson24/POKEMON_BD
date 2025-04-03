import PokemonComponent from "../components/PokemonComponent.tsx";
import { getPokemonByName } from "../utils/PokemonAPI.ts";

export default async function Random() {
  const randomId = Math.floor(Math.random() * 1010) + 1; // Pokedex va aprox hasta 1010
  const pokemon = await getPokemonByName(randomId.toString());

  if (!pokemon) return <h1>No existe ese Pokémon</h1>;

  return (
    <div class="pokemon-almacen">
      <PokemonComponent name={pokemon.name} image={pokemon.image} />
    </div>
  );
}
