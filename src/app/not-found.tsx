import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-12 min-h-screen">
      <h1 className="text-4xl sm:text-6xl font-bold text-center text-primary-500">
        Page Introuvable – 404!
      </h1>
      <div>
        <h2 className="text-2xl text-center font-medium mb-4">
          Oups… cette page n’existe pas.
        </h2>
        <p className="font-text text-center text-gray-600">
          Il semble que vous ayez suivi un lien qui ne mène nulle part. Mais pas
          de panique — notre univers LED est toujours à portée de clic !
        </p>
      </div>
      <div>
        <h2 className="text-2xl text-center font-medium mb-4">
          Voici quelques options utiles :
        </h2>
        <ul className="flex gap-4 justify-center items-center">
          <li>
            <Link
              href="/"
              className="flex gap-2 px-4 py-1 rounded-full   border hover:bg-primary-300 transition-all"
            >
              Retour à l’accueil
            </Link>
          </li>
          <li>
            <Link
              href="/produits"
              className="flex gap-2 px-4 py-1 rounded-full   border hover:bg-primary-300 transition-all"
            >
              Voir nos produits
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
