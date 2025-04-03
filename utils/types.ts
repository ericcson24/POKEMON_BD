import { OptionalId } from "mongodb";

export type Pokemon = {
    name: string;
    image: string;
    types: string[];
    abilities: string[];
  };
  
  export type PokemonModel = {
    name: string;
    image: string;
  };
  