export type ProductType = {
  id: string;
  nom: string;
  slug: string;
  fabricant: string;
  description: string;
  imageUrl: string | null;
  resolutionX: number | null;
  resolutionY: number | null;
  taillePouces: number | null;
  luminositeNits: number | null;
  tauxRafraichissementHz: number | null;
  puissanceWatts: number | null;
  // prixLocation: number | null;
  // prixVente: number | null;
  category: "INTERIEUR" | "EXTERIEUR" | "FLEXIBLE" | "VITRINE" | "MOBILE";
  createdAt: Date;
  updatedAt: Date;
};

export type MessageType = {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  message: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
};

export type DemandeDevisStatusType =
  | "en_attente"
  | "confirme"
  | "traite"
  | "annule";

export type DemandeDevisType = {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  message: string;
  type: "achat" | "location";
  quantite: number;
  date_debut: Date;
  date_fin: Date;
  status: DemandeDevisStatusType;
  produit_id: string;
  created_at: Date;
  updated_at: Date;
  produit: ProductType;
};
