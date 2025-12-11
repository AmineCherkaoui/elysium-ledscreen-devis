import { MessageType } from "@/types";
import { getAuthToken } from "../actions/auth";

export async function getAllContactMessages({
  limit = 10,
  page = 1,
  status,
  search,
}: {
  limit?: number;
  page?: number;
  status?: string;
  search?: string;
} = {}): Promise<{
  message: string;
  contacts: MessageType[];
  totalPages: number;
  total: number;
}> {
  try {
    const token = await getAuthToken();
    const queryParams = new URLSearchParams();

    queryParams.append("limit", limit.toString());
    queryParams.append("page", page.toString());

    if (status !== undefined) {
      queryParams.append("status", status.toString());
    }

    if (search) {
      queryParams.append("search", search);
    }

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/contacts?${queryParams.toString()}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 86400, tags: ["contacts"] },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.message || "Erreur lors de la récupération des contacts."
      );
    }

    return {
      message: data.message,
      contacts: data.data.contacts,
      totalPages: data.data.totalPages,
      total: data.data.total,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des messages de contact :",
      error
    );
    throw error;
  }
}

export async function getContactMessageById(id: string): Promise<{
  message: string;
  contact: MessageType | null;
}> {
  try {
    const token = await getAuthToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contacts/${id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 86400, tags: ["contacts"] },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 404) {
        return {
          message: "Contact message non trouvé.",
          contact: null,
        };
      }
      throw new Error(
        data.message || "Erreur lors de la récupération du contact."
      );
    }

    return {
      message: data.message,
      contact: data.data,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des messages de contact :",
      error
    );
    throw error;
  }
}
