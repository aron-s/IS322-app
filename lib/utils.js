import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { PrismaClient } from "@prisma/client";

 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// let prisma;
// if(process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if(!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   console.log(prisma)
//   prisma = global.prisma;
  
// }

// export default prisma;

