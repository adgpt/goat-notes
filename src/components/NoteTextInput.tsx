"use client";

import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";   
import { ChangeEvent, useEffect } from "react";
import { debounceTimeout } from "@/lib/constants";
import useNote from "@/hooks/useNote";
import { updateNoteAction } from "@/actions/notes";

type Props = {
  noteId: string, 
  startingNoteText: string
}

let updateTimeout: NodeJS.Timeout | null = null;
/**
 * Implements debouncing to delay the execution of the `updateNoteAction` function 
 * until a specified time (`debounceTimeout`) has passed since the last input event.
 */


function NoteTextInput( {noteId, startingNoteText} : Props) {
    const nodeIdParam = useSearchParams().get("noteId") || ""
    const {noteText, setNoteText} = useNote();
    
    useEffect(() => {
        if (nodeIdParam === noteId) {
            setNoteText(startingNoteText);
        }        
    } , [startingNoteText, nodeIdParam, noteId, setNoteText]);



    const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text=e.target.value;
        setNoteText(text);
        if (updateTimeout) {
            clearTimeout(updateTimeout);
        }
        updateTimeout = setTimeout(() => {
            updateNoteAction(noteId, text);
        }, debounceTimeout);

    }
    return (
        <Textarea 
            value ={noteText} 
            onChange={handleUpdateNote}
            placeholder="Type your notes here..."
            className="custom-scrollbar mb-4 h-full max-w-4xl resize-none border p-4 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        />
    )
}

export default NoteTextInput