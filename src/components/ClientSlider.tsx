'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const clients = [
  { name: 'Adtalem', logo: '/logos/adtalem.svg' },
  { name: 'Nuvani', logo: '/logos/nuvani.svg' },
  { name: 'MTM', logo: '/logos/mtm.svg' },
  { name: 'SNHU', logo: '/logos/snhu.svg' },
  { name: 'SLU', logo: '/logos/slu.svg' },
  { name: 'USD', logo: '/logos/usd.svg' },
  { name: 'EC-Council', logo: '/logos/ecc.svg' },
  { name: 'Google', logo: '/logos/google.svg' },
];

export default function ClientsSlider() {
  return (
    <div className="w-full flex justify-center">
    <div className="overflow-x-hidden py-8 bg-gray-50 dark:bg-neutral-900">
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-12 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: 'linear',
          }}
        >
          {[...clients, ...clients].map((client, index) => (
            <Image
              key={index}
              src={client.logo}
              alt={client.name}
              width={100}
              height={40}
              className="h-10 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          ))}
        </motion.div>
      </div>
    </div>
    </div>
  );
}
