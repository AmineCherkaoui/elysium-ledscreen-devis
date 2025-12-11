// contact-table.tsx
import { MessageType } from "@/types";
import { columns } from "./contact-columns";
import { DataTable } from "./contact-data-table";

export default function ContactTable({
  contacts,
  pageCount,
}: {
  contacts: MessageType[];
  pageCount: number;
}) {
  return <DataTable columns={columns} data={contacts} pageCount={pageCount} />;
}
