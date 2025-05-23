"use client"
import { Note } from "@prisma/client"
import { useSearchParams } from "next/navigation"
import useNote from "@/hooks/useNote"
import { useEffect, useState } from "react"
import { SidebarMenuButton } from "./ui/sidebar"
import Link from "next/link"

type Props = {
    note: Note,

}

function SelectNoteButton( {note}: Props) {
    const noteId = useSearchParams().get("noteId") || ""
    const {noteText: selectedNoteText} = useNote();
    const [localNoteText, setLocalNoteText] = useState(note.text);
    const [shouldUseGlobalNoteText, setShouldUseGlobalNoteText] = useState(false);


    useEffect( () => {
        if (noteId === note.id) {
            setShouldUseGlobalNoteText(true);
        } else {
            setShouldUseGlobalNoteText(false);
        }
    } , [noteId, note.id]);

    useEffect(() => {
        if (shouldUseGlobalNoteText) {
            setLocalNoteText(selectedNoteText);
        }
    } , [selectedNoteText, shouldUseGlobalNoteText]);
    // This is a temporary fix to prevent the text from being empty when the note is not selected


    const blankNoteText = "EMPTY NOTE"
    let noteText = localNoteText || blankNoteText
    if (shouldUseGlobalNoteText){
        noteText = selectedNoteText || blankNoteText
    }


  return (
    <SidebarMenuButton asChild className={`items-start gap-0 pr-12 ${note.id === noteId && "bg-sidebar-accent/50"}`}>
        <Link 
            href={`/?noteId=${note.id}`}
            className="flex w-full h-fit flex-col"
        >
            <p className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap">
                {noteText}
            </p>
            <p className="text-xs text-muted-foreground">{note.updatedAt.toLocaleDateString()}</p>
        </Link>
    </SidebarMenuButton>
  )
}

export default SelectNoteButton