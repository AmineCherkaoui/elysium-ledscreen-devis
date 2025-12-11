"use server";
import { cookies } from "next/headers";
import { cache } from "react";

export const deleteToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("__elysium_secure_token");
};

const createToken = async (token: string) => {
  (await cookies()).set("__elysium_secure_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 3600,
  });
};

export async function getAuthToken(): Promise<string | null> {
  const token = (await cookies()).get("__elysium_secure_token")?.value;
  return token || null;
}

export async function login(email: string, password: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await res.json();


  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Connexion Echouee",
    };
  }

  await createToken(data?.data?.token);

  return {
    success: true,
    message: "Connexion réussie.",
  };
}

export async function register(
  email: string,
  password: string,
  password_confirmation: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, password_confirmation }),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Connexion Echouee",
    };
  }

  return {
    success: true,
    message: "Connexion réussie.",
  };
}

export const getCurrentUser = cache(async () => {
  const token = await getAuthToken();
  if (!token) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  const { data } = await res.json();
  return data?.user ?? null;
});

export async function logout() {
  const token = await getAuthToken();

  if (token) {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });
  }

  await deleteToken();

  return {
    success: true,
    message: "Déconnexion réussie.",
  };
}

type UpdateUserType = {
  name?: string;
  email?: string;
  current_password?: string;
  password?: string;
  password_confirmation?: string;
};

export async function updateUser(values: UpdateUserType) {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("Utilisateur non authentifié.");
  }

  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append("_method", "PUT");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me/update`,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message || "Erreur lors de la modification.",
      errors: data.errors || null,
    };
  }

  return {
    success: true,
    message: data.message || "Mise à jour réussie.",
  };
}
