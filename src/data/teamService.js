import { supabase } from "../lib/supabase";

export async function fetchMembers() {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("name");

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchMemberById(memberId) {
  const { data, error } = await supabase
    .from("members")
    .select(`
      *,
      certificates (*)
    `)
    .eq("id", memberId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function addMember(member) {
  const { data, error } = await supabase
    .from("members")
    .insert([member])
    .select();

  if (error) {
    throw error;
  }

  return data;
}