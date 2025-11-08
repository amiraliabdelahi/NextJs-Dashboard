import prisma from '@/app/config/db';
import Image from "next/image";
import second from '@/public/111.jpg'

export default async function LatestTransactions() {
   const users = await prisma.users.findMany()
   console.log(users)
   return (
      <div className="flex flex-col gap-4 p-4 bg-[#151c2c] rounded-lg">
         <h1 className="text-2xl opacity-60">Latest Transactions</h1>
         <table>
            <thead>
               <tr>
                  <td>Name</td>
                  <td>Status</td>
                  <td>Date</td>
                  <td>Phone Number</td>
               </tr>
            </thead>
            <tbody>
               {
                  users.map((item,index) => (
                     <tr key={index}>
                        <td>
                           <div className="flex gap-2 items-center p-2">
                              <Image alt="" width={100} height={100} className="h-12 w-12 rounded-full object-cover" src={second} />
                              <h1 className='text-lg font-semibold'>{item.username}</h1>
                           </div>
                        </td>
                        <td>
                           <button style={{ backgroundColor: item.color!, color: 'black' }} className="rounded p-1">{item.status}</button>
                        </td>
                        <td>{item.createdAt}</td>
                        <td>{item.phonenumber}</td>
                     </tr>
                  ))
               }
            </tbody>
         </table >
      </div>
   );
}
