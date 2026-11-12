import type { Cabin } from "../types";
import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

/** Cabin data coming from the form: `image` is either a new file or the existing image URL */
export type NewCabin = Omit<Cabin, "id" | "created_at" | "image"> & {
  image: File | string;
};

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .returns<Cabin[]>();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function insertCabin(newCabin: NewCabin, id?: number) {
  const { image } = newCabin;
  const hasImagePath =
    typeof image === "string" && image.startsWith(supabaseUrl);
  const imageName = `${Math.random()}-${
    typeof image === "string" ? "" : image.name
  }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
  //1.create/edit cabin
  const cabinRow = { ...newCabin, image: imagePath };
  const query = id
    ? //b)edit
      supabase.from("cabins").update(cabinRow).eq("id", id)
    : //a)create
      supabase.from("cabins").insert([cabinRow]);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be inserted");
  }

  // upload image to storage
  if (hasImagePath) return data;
  const { error: uploadError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, image);

  //delete the cabin if image upload fails, to avoid having cabins without images in the database
  if (uploadError) {
    if (!id) await supabase.from("cabins").delete().eq("id", data.id);
    console.error(uploadError);
    throw new Error("there was a storage error, cabin could not be created");
  }
  return data;
}
export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}
