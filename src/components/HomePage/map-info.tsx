import { addressLocation, contactInfo } from "@/constants";
import * as motion from "motion/react-client";

export default function MapInfo() {
  return (
    <div className="relative  grid grid-col-1 lg:grid-cols-2 gap-6 xl:block ">
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        whileInView={{ y: 0, opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.8, 0.25, 1],
        }}
        className="z-10 p-6 md:p-12  flex flex-col rounded-3xl bg-primary-500 gap-12 w-full xl:absolute xl:p-6 xl:flex-row xl:shadow-xl  xl:items-center xl:justify-between xl:gap-4 xl:bottom-3 xl:left-1/2 xl:-translate-x-1/2 xl:w-[90%]  xl:bg-black/40 xl:backdrop-blur-lg xl:border-2 xl:border-white/40  xl:rounded-full "
      >
        {contactInfo.map((info) => {
          const Icon = info.icon;
          return (
            <div
              key={info.title}
              className="flex items-center gap-6 xl:gap-2 text-white xl:max-w-2/8"
            >
              <span className="bg-white backdrop-blur-2xl rounded-full p-4 xl:p-2 text-primary-500 saturate-150">
                <Icon size={24} />
              </span>

              <div className="flex flex-col">
                <h3 className="text-lg xl:text-sm font-bold font-text">
                  {info.title}
                </h3>
                {info.href ? (
                  <a
                    target="_blank"
                    className="font-text text-basis xl:text-xs underline underline-offset-4"
                    href={info.href}
                  >
                    {info.info}
                  </a>
                ) : (
                  <p className="font-text text-basis xl:text-xs">{info.info}</p>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.8, 0.25, 1],
        }}
        className=" bg-primary-50 rounded-3xl overflow-hidden"
      >
        <iframe
          className="min-h-[400px] xl:min-h-[500px]"
          src={addressLocation}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </motion.div>
    </div>
  );
}
