import { EmailForm } from "@/app/(admin)/sys_dashboard/account/email-change";
import { PasswordForm } from "@/app/(admin)/sys_dashboard/account/password-change";
import { SetHeaderTitle } from "@/components/dashboard/set-header-title";

import { NameForm } from "@/app/(admin)/sys_dashboard/account/name-change";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard: Compte | Elysium",
};

export default async function Page() {
  return (
    <div>
      <SetHeaderTitle title={"Compte"} />
      <h2 className="text-xl font-bold mb-6">Paramètres du compte</h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <EmailForm className={"md:col-span-6"} />
        <NameForm className={"md:col-span-6"} />
        <PasswordForm className={"md:col-span-12"} />
      </div>
    </div>
  );
}
