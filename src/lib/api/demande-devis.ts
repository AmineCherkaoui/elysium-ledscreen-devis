import { DemandeDevisStatusType, DemandeDevisType } from "@/types";
import { getAuthToken } from "../actions/auth";
import { redirect } from "next/navigation";


export async function getDemandesDevis({
  status,
  search,
  limit = 10,
  page = 1,
}: {
  status?: DemandeDevisStatusType;
  search?: string;
  limit?: number;
  page?: number;
} = {}): Promise<{
  demandes: DemandeDevisType[];
  totalPages: number;
  total: number;
}> {
  try {
    const token = await getAuthToken();
    const queryParams = new URLSearchParams();

    if (status) queryParams.append("status", status);
    if (search) queryParams.append("search", search);
    queryParams.append("limit", limit.toString());
    queryParams.append("page", page.toString());

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/demande-devis?${queryParams.toString()}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 86400, tags: ["devis"] },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Erreur lors de la récupération des demandes."
      );
    }

    return {
      demandes: data.data.demandes,
      totalPages: data.data.totalPages,
      total: data.data.total,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes :", error);
    throw error;
  }
}

export async function getDemandeDevisById(id: string): Promise<{
  message: string;
  demande: DemandeDevisType | null;
}> {
  try {
    const token = await getAuthToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/demande-devis/${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 86400, tags: ["devis"] },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 404) {
        return {
          message: "Contact message non trouvé.",
          demande: null,
        };
      }
      throw new Error(
        data.message || "Erreur lors de la récupération du demande de devis."
      );
    }

    return {
      message: data.message,
      demande: data.data,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du demande de devis :",
      error
    );
    throw error;
  }
}
