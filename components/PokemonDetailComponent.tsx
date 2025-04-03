import { FunctionalComponent } from "preact";
import { Pokemon } from "../utils/types.ts";

type Props = {
  pokemon: Pokemon;
  favorite: boolean;
};

const PokemonDetailComponent: FunctionalComponent<Props> = ({ pokemon, favorite }) => {
  return (
    <div class="pokemon-component">
      <h1>{pokemon.name}</h1>
      <div class="detail">
        <img src={pokemon.image} alt={pokemon.name} />
        <div>
          <p><strong>Types:</strong> {pokemon.types.join(", ")}</p>
          <p><strong>Abilities:</strong> {pokemon.abilities.join(", ")}</p>
        </div>
      </div>
      <form action={`/pokemon/${pokemon.name}`}>
        <input type="hidden" name="favorites" value={favorite.toString()} />
        {favorite ? (
          <button type="submit">Add to favorites</button>
        ) : (
          <button type="submit">Eliminate favorites</button>
        )}
      </form>
    </div>
  );
};

export default PokemonDetailComponent;
