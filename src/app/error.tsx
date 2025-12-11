"use client";
import Link from "next/link";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-12 min-h-screen">
      <h1 className="text-4xl sm:text-6xl font-bold text-center text-red-500">
        Erreur Interne – 500
      </h1>
      <div>
        <h2 className="text-2xl text-center font-medium mb-4">
          Oups… quelque chose s’est mal passé.
        </h2>
        <p className="font-text text-center text-gray-600">
          Notre système a rencontré une erreur inattendue. Pas d’inquiétude —
          nos équipes LED sont déjà sur le coup pour tout remettre en lumière
          💡.
        </p>
      </div>

      {process.env.NODE_ENV === "development" && (
        <pre className="p-4 rounded-2xl bg-neutral-900 text-sm text-orange-400 max-w-xl overflow-auto">
          {error?.message}
        </pre>
      )}

      <div className="flex gap-4 justify-center items-center">
        <Link
          href="/"
          className="px-4 py-1 rounded-full border hover:bg-red-400 transition-all"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
