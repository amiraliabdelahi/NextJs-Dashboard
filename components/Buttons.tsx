"use client"
import Image from "next/image"
import GITHUB from '@/public/github.png'
import { signIn } from "@/auth"
import { deleteProduct, deleteUser } from "@/app/actions/delete"

export const DeleteUserButton = ({ id }: { id: string }) => {
   return (
      <button onClick={
         () => deleteUser(id)
      } className="rounded-md font-semibold bg-red-600 cursor-pointer p-1">Delete</button>
   )
}
export const DeleteProdButton = ({ id }: { id: string }) => {
   return (
      <button onClick={
         () => deleteProduct(id)
      } className="rounded-md font-semibold bg-red-600 cursor-pointer p-1">Delete</button>
   )
}
export default function GithubButton() {
   return <button onClick={
      () => signIn("github", {
         redirect: true,
         redirectTo: "/dashboard"
      })
   }>
      <Image src={GITHUB} alt="" className="size-12" />
   </button>
}