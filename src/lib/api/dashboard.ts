import { DemandeDevisType, MessageType } from "@/types";
import { getAuthToken } from "../actions/auth";

export async function getDashboardSummary(): Promise<{
  total_demandes_devis: number;
  total_produits: number;
  total_demandes_devis_en_attente: number;
  total_messages_non_lu: number;
  demandes_devis_en_attente: DemandeDevisType[];
  messages_non_lu: MessageType[];
}> {
  try {
    const token = await getAuthToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/dashboard`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: {
          revalidate: 86400,
          tags: ["devis", "products", "contacts"],
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Erreur lors de la récupération des commandes."
      );
    }

    return {
      ...data.data,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    throw error;
  }
}
