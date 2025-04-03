import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import PokemonComponent from "../components/PokemonComponent.tsx";
import initMongodb from "../utils/database.ts";
import { PokemonModel } from "../utils/types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, PokemonModel[]>) => {
    const db = await initMongodb();
    const result: PokemonModel[] = await db.find().toArray();
    return ctx.render(result);
  },
};

export default function Home(props: PageProps<PokemonModel[]>) {
  return (
    <div class="pokemon-almacen">
      <h1>Favorites</h1>
      <div class="list-pokemon">
        {props.data.length > 0 ? (
          props.data.map((e) => <PokemonComponent key={e.name} {...e} />)
        ) : (
          <h3>Add your first Pokémon to favorites</h3>
        )}
      </div>
    </div>
  );
}
