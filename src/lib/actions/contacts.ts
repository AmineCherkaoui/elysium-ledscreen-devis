"use server";
import { revalidateTag } from "next/cache";
import { getAuthToken } from "./auth";

export async function addContactMessage(values: Record<string, any>) {
  try {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contacts`,
      {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Erreur lors de l'envoye du message.",
      };
    }

    revalidateTag("contacts");
    return {
      success: true,
      message: data.message || "Votre message a été envoyé avec succès.",
    };
  } catch (error) {
    console.error("Erreur lors de l'envoye du message :", error);
    return {
      success: false,
      message: "Erreur serveur lors de l'envoye du message.",
    };
  }
}

export async function deleteContact(id: string) {
  try {
    const token = await getAuthToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contacts/${id}`,
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
        message: data.message || "Erreur lors de la suppression du message.",
      };
    }

    revalidateTag("contacts");
    return {
      success: true,
      message: data.message || "Message supprimé avec succès.",
    };
  } catch (error) {
    console.error("Erreur lors de la suppression du message :", error);
    return {
      success: false,
      message: "Erreur serveur lors de la suppression du message.",
    };
  }
}

export async function markAsRead(id: string) {
  try {
    const token = await getAuthToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contacts/${id}/read`,
      {
        method: "PATCH",
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
        message: data.message || "Erreur lors du marquage comme lu.",
      };
    }

    revalidateTag("contacts");

    return {
      success: true,
      message: data.message || "Message marqué comme lu avec succès.",
    };
  } catch (error) {
    console.error("Erreur lors du marquage comme lu :", error);
    return {
      success: false,
      message: "Erreur serveur lors du marquage comme lu.",
    };
  }
}
