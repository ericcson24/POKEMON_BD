import { FunctionalComponent } from "preact";
import { PokemonModel } from "../utils/types.ts";

const PokemonComponent: FunctionalComponent<PokemonModel> = ({ name, image }) => {
  return (
    <div class="pokemon-component">
      <h2>{name}</h2>
      <a href={`/pokemon/${name}`}>
        <img src={image} alt={name} />
      </a>
    </div>
  );
};

export default PokemonComponent;
