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

import { Button } from "./ui/button"
import { Loader2, Trash2 } from "lucide-react"
import { useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { deleteNoteAction } from "@/actions/notes"

type Props = {
  noteId: string,
  deleteNoteLocally: (noteId: string) => void
}

function DeleteNoteButton( {noteId, deleteNoteLocally}: Props) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const noteIdParam = useSearchParams().get("noteId") || ""

    const handleDeleteNote = async () => {
        startTransition(async () => {
            const result = await deleteNoteAction(noteId);
            const errorMessage = typeof result === "string"
              ? result
              : result?.errorMessage;

            if (!errorMessage) {
                toast("Note deleted", {
                    description: "Your note was deleted successfully."
                });
                deleteNoteLocally(noteId)

                if (noteIdParam === noteId) {
                    router.replace("/")
                }
            } else {
                toast("Error", {
                    description: errorMessage
                });
            }
        })
    }

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button
                className="absolute right-2 top-1/2 -translate-y-1/2 size-7 p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
                variant="ghost"
            >
                <Trash2 />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this note?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your note from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
                onClick={handleDeleteNote}
                className=" w-24 bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive"
            >{isPending ? <Loader2 className="animate-spin"/> : "Delete"}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteNoteButton