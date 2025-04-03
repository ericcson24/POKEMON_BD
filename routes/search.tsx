import { Handlers, PageProps } from "$fresh/server.ts";
import { FreshContext } from "$fresh/src/server/mod.ts";
import PokemonComponent from "../components/PokemonComponent.tsx";
import { getPokemonByName } from "../utils/PokemonAPI.ts";
import { Pokemon } from "../utils/types.ts";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, Pokemon | null>) => {
    const url = new URL(req.url);
    const name = url.searchParams.get("name");
    if (!name) return ctx.render(null);
    const pokemon = await getPokemonByName(name);
    return ctx.render(pokemon);
  },
};

export default (props: PageProps<Pokemon | null>) => {
  return (
    <div class="search">
      <form action="/search" method="GET">
        <input type="text" name="name" placeholder="Pokémon name" required />
        <button type="submit">Find</button>
      </form>
      <div class="list-pokemon">
        {props.data ? (
          <PokemonComponent name={props.data.name} image={props.data.image} />
        ) : props.data !== null ? (
          <h1>There is no Pokémon with that name</h1>
        ) : null}
      </div>
    </div>
  );
};
