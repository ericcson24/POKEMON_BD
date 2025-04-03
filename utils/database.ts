import { Collection, MongoClient } from "mongodb";
import { PokemonModel } from "./types.ts";

let PokemonCollection: Collection<PokemonModel>;

const initMongodb = async () => {
  if (PokemonCollection) return PokemonCollection;

  const url = Deno.env.get("MONGO_URL");
  if (!url) throw new Error("Error con MONGO_URL");

  const client = new MongoClient(url);
  await client.connect();
  console.log("Conectado a mongodb");

  const db = client.db("pokemon");
  PokemonCollection = db.collection<PokemonModel>("favorites");

  return PokemonCollection;
};

export default initMongodb;
