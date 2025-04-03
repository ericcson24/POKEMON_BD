import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getPokemonByName } from "../../utils/PokemonAPI.ts";
import { Pokemon, PokemonModel } from "../../utils/types.ts";
import initMongodb from "../../utils/database.ts";
import PokemonDetailComponent from "../../components/PokemonDetailComponent.tsx";

type Data = {
  pokemon: Pokemon;
  favorite: boolean;
};

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
    const url = new URL(req.url);
    const favorites = url.searchParams.get("favorites");
    const { name } = ctx.params;
    const pokemon = await getPokemonByName(name);
    if (!pokemon) return ctx.renderNotFound();

    const db = await initMongodb();
    const found = await db.findOne({ name: pokemon.name });

    if (found && favorites === "false") {
      await db.deleteOne({ name: pokemon.name });
      return ctx.render({ pokemon, favorite: true });
    }

    if (!found && favorites === "true") {
      await db.insertOne({
        name: pokemon.name,
        image: pokemon.image,
      } as PokemonModel);
      return ctx.render({ pokemon, favorite: false });
    }

    return ctx.render({ pokemon, favorite: !found });
  },
};

export default function PokemonPage(props: PageProps<Data>) {
  if (!props.data) return <h1>No existe ese Pokémon</h1>;
  return (
    <div class="pokemon-almacen">
      <PokemonDetailComponent {...props.data} />
    </div>
  );
}
