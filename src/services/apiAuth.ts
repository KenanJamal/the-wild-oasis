import type { UserAttributes } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  fullName?: string;
  avatar?: File | null;
  password?: string;
}

export async function login({ email, password }: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}
export async function getCurrenUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  // console.log(data);
  if (error) throw new Error(error.message);

  return data?.user;
}
export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
export async function signUp({ fullName, email, password }: SignUpData) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return data;
}
export async function updateCurrentUser({
  fullName,
  avatar,
  password,
}: UpdateUserData) {
  //1. Update password OR fullName
  let update: UserAttributes;
  if (password) {
    update = { password: password };
  } else {
    update = {
      data: {
        full_name: fullName,
      },
    };
  }
  const { data, error } = await supabase.auth.updateUser(update);
  if (error) {
    console.log(error);
    throw new Error(error.message);
  }
  if (!avatar) return data;
  //2 upload avatar to storage
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (uploadError) {
    console.log(uploadError);
    throw new Error(uploadError.message);
  }
  //3 update avatar in the user
  const { data: updatedData, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateError) {
    console.log(updateError);
    throw new Error(updateError.message);
  }
  return updatedData;
}
