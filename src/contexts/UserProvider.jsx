import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { supabase } from "../supabase";

function makeUser(authUser, profile) {
  if (!profile) {
    profile = authUser.user_metadata;
  }
  const fullName = profile.full_name || authUser.email;
  const parts = fullName.split(" ");
  const initials = parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const shortName = parts.length > 1 ? parts[0] + " " + parts[1][0] + "." : parts[0];

  return {
    id: authUser.id,
    email: authUser.email,
    fullName: fullName,
    name: shortName,
    initials: initials,
    role: profile.role || "student",
    grade: profile.grade || null,
    school: profile.school || "",
    points: profile.points || 0,
  };
}

async function loadProfile(authUser) {
  const { data } = await supabase.from("profiles").select("*").eq("id", authUser.id).single();
  return makeUser(authUser, data);
}

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session) {
        setUser(await loadProfile(data.session.user));
      }
      setIsLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        setUser(null);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      if (error.message === "Invalid login credentials") {
        throw new Error("Грешен имейл или парола.");
      }
      throw new Error("Няма връзка със сървъра. Опитай отново по-късно.");
    }
    setUser(await loadProfile(data.user));
  }

  async function register(form) {
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.fullName,
          role: form.role,
          grade: form.role === "student" ? Number(form.grade) : null,
          school: form.school,
        },
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        throw new Error("Вече има профил с този имейл.");
      }
      throw new Error("Регистрацията не беше успешна. Опитай отново.");
    }

    if (!data.session) {
      throw new Error("Профилът е създаден, но трябва първо да потвърдиш имейла си.");
    }

    setUser(await loadProfile(data.user));
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
