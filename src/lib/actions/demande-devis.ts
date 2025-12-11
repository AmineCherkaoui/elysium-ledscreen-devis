"use server";
import { DemandeDevisStatusType } from "@/types";
import { revalidateTag } from "next/cache";
import { getAuthToken } from "./auth";

export async function addDemandeDevis(values: Record<string, any>) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demande-devis`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Erreur",
      };
    }

    revalidateTag("devis");
    return {
      success: true,
      message:
        data.message || "Votre demande de devis a été envoyée avec succès.",
    };
  } catch (error) {
    console.error("Erreur  :", error);
    return {
      success: false,
      message: "Erreur serveur lors de la commande.",
    };
  }
}

export async function updateDemandeDevisStatus(
  id: string,
  status: DemandeDevisStatusType
) {
  try {
    const token = await getAuthToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demande-devis/${id}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Erreur lors de la mise à jour du status.",
      };
    }

    revalidateTag("devis");
    return {
      success: true,
      message: data.message || "Status mis à jour avec succès.",
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du status:", error);
    return {
      success: false,
      message: "Erreur serveur lors de la mise à jour du statut.",
    };
  }
}

export async function deleteDemandeDevis(id: string) {
  try {
    const token = await getAuthToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demande-devis/${id}`,
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
        message: data.message || "Erreur lors de la suppression du demande.",
      };
    }

    revalidateTag("devis");
    return {
      success: true,
      message: data.message || "Demande supprimé avec succès.",
    };
  } catch (error) {
    console.error("Erreur lors de la suppression du demande:", error);
    return {
      success: false,
      message: "Erreur serveur lors de la suppression du demande",
    };
  }
}
