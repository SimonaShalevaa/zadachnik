import { supabase } from "../supabase";
import { uploadImage, deleteImage } from "./taskService";

const SOLUTION_FIELDS = "*, author:profiles!author_id(id, full_name, points), likes:solution_likes(user_id)";

export async function getSolutions(taskId) {
  const { data, error } = await supabase
    .from("solutions")
    .select(SOLUTION_FIELDS)
    .eq("task_id", taskId)
    .order("is_best", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Решенията не можаха да се заредят.");
  }
  return data;
}

export async function createSolution(values, file, taskId, userId) {
  let imageUrl = null;
  if (file) {
    imageUrl = await uploadImage(file, userId);
  }

  const { data, error } = await supabase
    .from("solutions")
    .insert({
      task_id: taskId,
      author_id: userId,
      hint: values.hint,
      text: values.text,
      image_url: imageUrl,
    })
    .select(SOLUTION_FIELDS)
    .single();

  if (error) {
    throw new Error("Решението не можа да се запише.");
  }
  return data;
}

export async function deleteSolution(solution) {
  const { error } = await supabase.from("solutions").delete().eq("id", solution.id);

  if (error) {
    throw new Error("Решението не можа да се изтрие.");
  }

  await deleteImage(solution.image_url);
}

export async function likeSolution(solutionId, userId) {
  const { error } = await supabase.from("solution_likes").insert({ solution_id: solutionId, user_id: userId });

  if (error) {
    throw new Error("Харесването не можа да се запише.");
  }
}

export async function unlikeSolution(solutionId, userId) {
  const { error } = await supabase
    .from("solution_likes")
    .delete()
    .eq("solution_id", solutionId)
    .eq("user_id", userId);

  if (error) {
    throw new Error("Харесването не можа да се махне.");
  }
}
