import z from "zod";

const optionalNumbers = z
  .string()
  .transform((val) => (val === "" ? undefined : Number(val)))
  .refine((val) => val === undefined || (Number(val) && val > 0), {
    message: "Doit être un entier positif",
  })
  .optional();

export const formSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  fabricant: z.string().min(1, "Fabricant requis"),
  description: z.string().min(1, "Description requise"),
  image: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      { message: "Le fichier doit être une image" }
    ),
  resolutionX: optionalNumbers,
  resolutionY: optionalNumbers,
  taillePouces: optionalNumbers,
  luminositeNits: optionalNumbers,
  tauxRafraichissementHz: optionalNumbers,
  puissanceWatts: optionalNumbers,
  prixLocation: optionalNumbers,
  prixVente: optionalNumbers,
  category: z.enum(
    ["INTERIEUR", "EXTERIEUR", "MOBILE", "VITRINE", "FLEXIBLE"],
    "Catégorie requise"
  ),
});
