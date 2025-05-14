"use client"
import { Note } from "@prisma/client";
import { createContext, useState } from "react";

type NoteProviderContextType = {
    noteText: string;
    setNoteText: (noteText: string) => void;
}

export const NoteProviderContext = createContext<NoteProviderContextType>({
    noteText: "", 
    setNoteText: () => {}, 
})

function NoteProvider({ children }: { children: React.ReactNode; note: Note }) {
    const [noteText, setNoteText] = useState("");

    return(
        <NoteProviderContext.Provider value={{ noteText, setNoteText }}>
            {children}
        </NoteProviderContext.Provider>
    )
}

export default NoteProvider;