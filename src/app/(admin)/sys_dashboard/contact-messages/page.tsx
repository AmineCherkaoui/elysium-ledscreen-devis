import { SetHeaderTitle } from "@/components/dashboard/set-header-title";

import { getAllContactMessages } from "@/lib/api/contacts";
import { Metadata } from "next";
import ContactTable from "./ContactTable/contact-table";

export const metadata: Metadata = {
  title: "Dashboard: Contacts | Elysium",
};

type PageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    status?: string;
  }>;
};

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const search = params?.search || "";
  const status = params?.status || undefined;

  const { contacts, totalPages } = await getAllContactMessages({
    page,
    limit,
    search,
    status,
  });

  return (
    <>
      <SetHeaderTitle title="Contacts" />
      <ContactTable contacts={contacts} pageCount={totalPages} />
    </>
  );
}
