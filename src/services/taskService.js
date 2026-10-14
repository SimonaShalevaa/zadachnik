import { supabase } from "../supabase";

const TASK_FIELDS = "*, author:profiles(id, full_name, grade)";

export async function getTasks() {
  const { data, error } = await supabase
    .from("tasks")
    .select(TASK_FIELDS)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Задачите не можаха да се заредят.");
  }
  return data;
}

export async function getLatestTasks(count) {
  const { data, error } = await supabase
    .from("tasks")
    .select(TASK_FIELDS)
    .order("created_at", { ascending: false })
    .limit(count);

  if (error) {
    throw new Error("Задачите не можаха да се заредят.");
  }
  return data;
}

export async function getTaskById(id) {
  const { data, error } = await supabase.from("tasks").select(TASK_FIELDS).eq("id", id).maybeSingle();

  if (error) {
    throw new Error("Задачата не можа да се зареди.");
  }
  return data;
}

export async function getSimilarTasks(task) {
  const { data, error } = await supabase
    .from("tasks")
    .select("id, title, grade")
    .eq("subject", task.subject)
    .neq("id", task.id)
    .limit(3);

  if (error) {
    return [];
  }
  return data;
}

export async function getTasksByAuthor(authorId) {
  const { data, error } = await supabase
    .from("tasks")
    .select(TASK_FIELDS)
    .eq("author_id", authorId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Задачите не можаха да се заредят.");
  }
  return data;
}

export async function uploadImage(file, userId) {
  const extension = file.name.split(".").pop();
  const path = userId + "/" + Date.now() + "." + extension;

  const { error } = await supabase.storage.from("task-images").upload(path, file);
  if (error) {
    throw new Error("Снимката не можа да се качи.");
  }

  const { data } = supabase.storage.from("task-images").getPublicUrl(path);
  return data.publicUrl;
}

export async function createTask(task, file, userId) {
  const imageUrl = await uploadImage(file, userId);

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: task.title,
      subject: task.subject,
      grade: Number(task.grade),
      note: task.note,
      tags: task.tags,
      image_url: imageUrl,
      author_id: userId,
    })
    .select()
    .single();

  if (error) {
    throw new Error("Задачата не можа да се запише.");
  }
  return data;
}

function getImagePath(imageUrl) {
  return imageUrl.split("/task-images/")[1];
}

export async function deleteImage(imageUrl) {
  if (!imageUrl) {
    return;
  }
  await supabase.storage.from("task-images").remove([getImagePath(imageUrl)]);
}

export async function updateTask(task, values, file, userId) {
  let imageUrl = task.image_url;
  if (file) {
    imageUrl = await uploadImage(file, userId);
  }

  const { data, error } = await supabase
    .from("tasks")
    .update({
      title: values.title,
      subject: values.subject,
      grade: Number(values.grade),
      note: values.note,
      tags: values.tags,
      image_url: imageUrl,
    })
    .eq("id", task.id)
    .select()
    .single();

  if (error) {
    throw new Error("Промените не можаха да се запишат.");
  }

  if (file) {
    await deleteImage(task.image_url);
  }
  return data;
}

export async function deleteTask(task) {
  const { error } = await supabase.from("tasks").delete().eq("id", task.id);

  if (error) {
    throw new Error("Задачата не можа да се изтрие.");
  }

  await deleteImage(task.image_url);
}
