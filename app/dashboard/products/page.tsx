import prisma from '@/app/config/db';
import { auth } from '@/auth';
import { DeleteProdButton } from '@/components/Buttons';
import Search from '@/components/Serach';
import { UserRole } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import second from '@/public/999.jpg'
import { Params } from 'next/dist/server/request/params';
export default async function ProductsPage({ searchParams }: { searchParams: Params }) {
   const query = searchParams?.q
   const products = await prisma.products.findMany({
      where: {
         title: {
            contains: query?.toString()
         }
      }
      ,
      include: {
         user: true
      }
   })
   const session = await auth()
   return (
      <div className="w-full flex flex-col gap-6 bg-[#151c2c] p-4 rounded-lg">
         <main className="flex justify-between">
            <Search />
            <Link href="/dashboard/products/addProduct" className="bg-purple-600 p-1 rounded-md font-semibold">Add New</Link>
         </main>
         <table>
            <thead >
               <tr>
                  <td className="font-semibold text-lg">Title</td>
                  <td className="font-semibold text-lg text-center">Price</td>
                  <td className="font-semibold text-lg text-center">Description</td>
                  <td className="font-semibold text-lg text-center">Stock</td>
                  <td className="font-semibold text-lg text-center">Action</td>
               </tr>
            </thead>
            <tbody className='text-center'>
               {
                  products.map((item,index) => (
                     <tr key={index}>
                        <td>
                           <div className="flex gap-2 items-center p-2">
                              <Image alt="" width={100} height={100} className="h-12 w-12 rounded-full object-cover" src={second} />
                              <h1>{item.title}</h1>
                           </div>
                        </td>
                        <td className='font-bold'>{item.price}</td>
                        <td className="text-sm font-light">{item.description}</td>
                        <td className='font-bold'>{item.stock}</td>
                        <td>
                           {
                              session?.user.role === UserRole.user ?
                                 (item.user.id == session?.user.id ?
                                    <div className="flex gap-1">
                                       <Link href={{ pathname: `/dashboard/products/${item.id}`, query: { description: item.description, price: item.price } }} className="rounded-md font-semibold bg-green-600 cursor-pointer p-1">View</Link>
                                       <DeleteProdButton id={item.id} />
                                    </div>
                                    :
                                    <p className='text-xs'>You're not owner</p>)
                                 :
                                 <div className="flex gap-1">
                                    <Link href={{ pathname: `/dashboard/products/${item.id}`, query: { description: item.description, price: item.price } }} className="rounded-md font-semibold bg-green-600 cursor-pointer p-1">View</Link>
                                    <DeleteProdButton id={item.id} />
                                 </div>
                           }
                        </td>
                     </tr>
                  ))
               }
            </tbody>
         </table>
      </div>
   )
}