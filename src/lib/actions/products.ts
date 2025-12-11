"use server";

import { revalidateTag } from "next/cache";
import { getAuthToken } from "./auth";

export async function createProductWithImage(
  values: Record<string, any>
): Promise<{ success: boolean; message: string }> {
  const token = await getAuthToken();
  if (!token) {
    return {
      success: false,
      message: "Utilisateur non authentifié.",
    };
  }

  try {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "image" && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    if (values.image) {
      formData.append("image", values.image);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Erreur lors de la création du produit.",
      };
    }

    revalidateTag("products");

    return {
      success: true,
      message: data.message || "Produit ajouté avec succès",
    };
  } catch (error) {
    console.error("Erreur lors de la création du produit :", error);
    return {
      success: false,
      message: "Erreur serveur lors de la création du produit.",
    };
  }
}

export async function updateProductWithImage(
  slug: string,
  values: Record<string, any>
): Promise<{ success: boolean; message: string }> {
  const token = await getAuthToken();
  if (!token) {
    return {
      success: false,
      message: "Utilisateur non authentifié.",
    };
  }

  try {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key !== "image" && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    if (values.image) {
      formData.append("image", values.image);
    }

    formData.append("_method", "PUT");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${slug}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Erreur lors de la modification du produit.",
      };
    }

    revalidateTag("products");
    revalidateTag("devis");

    return {
      success: true,
      message: data.message || "Produit modifié avec succès",
    };
  } catch (error) {
    console.error("Erreur lors de la modification du produit :", error);
    return {
      success: false,
      message: "Erreur serveur lors de la modification du produit.",
    };
  }
}

export async function deleteProduct(slug: string) {
  const token = await getAuthToken();
  if (!token) {
    return {
      success: false,
      message: "Utilisateur non authentifié.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${slug}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          data.message || "Erreur serveur lors de la création du produit.",
      };
    }

    revalidateTag("products");
    revalidateTag("devis");

    return { success: true, message: data.message };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message || "Erreur serveur lors de la création du produit.",
    };
  }
}
