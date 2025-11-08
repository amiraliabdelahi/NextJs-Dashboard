"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { signOut } from "next-auth/react"

export function LogoutButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-sm cursor-pointer">
        Logout
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#0f121b]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently logout of your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-[#0f121b] cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <button className="cursor-pointer" onClick={
              () => signOut()
            }>Logout Anyway</button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
