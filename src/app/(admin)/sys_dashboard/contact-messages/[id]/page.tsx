import BackButton from "@/components/back-button";
import { SetHeaderTitle } from "@/components/dashboard/set-header-title";
import { getContactMessageById } from "@/lib/api/contacts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactActions } from "./contact-actions";
import ContactCard from "./contact-card";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Message de contact | Elysium",
  description: "Détails du message de contact",
};

export default async function page({ params }: PageProps) {
  const { id } = await params;
  const { contact } = await getContactMessageById(id);
  if (!contact) notFound();

  return (
    <>
      <SetHeaderTitle title={`Messages de ${contact.nom}`} />
      <div className="flex items-start flex-col sm:flex-row sm:items-center sm:justify-between">
        <BackButton />
        <ContactActions contactId={contact.id} status={contact.status} />
      </div>
      <ContactCard contact={contact} />
    </>
  );
}
