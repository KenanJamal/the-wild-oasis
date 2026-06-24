import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
//https://jhievpobbtcffgbfwuou.supabase.co/storage/v1/object/public/cabins-images/cabin-001.jpg
export async function insertCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;
  //1.create/edit cabin
  let query = supabase.from("cabins");
  //a)create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  //b)edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be inserted");
  }

  // upload image to storage
  if (hasImagePath) return data;
  const { error: uploadError } = await supabase.storage
    .from("cabins-images")
    .upload(imageName, newCabin.image);

  //delete the cabin if image upload fails, to avoid having cabins without images in the database
  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", newCabin.id);
    console.error(uploadError);
    throw new Error("there was a storage error, cabin could not be created");
  }
  return data;
}
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
}
