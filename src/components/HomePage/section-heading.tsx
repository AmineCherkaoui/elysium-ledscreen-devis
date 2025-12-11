type PropsType = {
  title: string;
  description?: string;
};

export default function SectionsHeading({ title, description }: PropsType) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <h2 className="text-3xl font-bold text-center uppercase font-oswald">
        {title}
      </h2>
      <p className="text-sm sm:text-base text-gray-600 text-center">
        {description}
      </p>
    </div>
  );
}
