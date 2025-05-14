"use client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Fragment, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Textarea } from "./ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { askAIAboutNotesAction } from "@/actions/notes";
import "@/styles/ai-response.css"

type Props = {
    user: User | null
}

function AskAIButton({user} : Props) {
  
  const [open, setOpen] = useState(false)
  const [questionText, setQuestionText] = useState("")
  const [questions, setQuestions] = useState<string[]>([])
  const [responses, setResponses] = useState<string[]>([])

  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleOnOpenChange= (isOpen: boolean) => {
    if (!user){
      router.push("/login")
    }
    else{
      if(isOpen){
        setQuestionText("")
        setQuestions([])
        setResponses([])
      }
      setOpen(isOpen)
    }
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleInput = () => {
    const textarea = textareaRef.current
    if (!textarea) return 

    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleClickInput = () => {
    textareaRef.current?.focus()
  }

  const handleSubmit = () => {
     if (!questionText.trim()) return;

    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions);
    setQuestionText("");
    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      const response = await askAIAboutNotesAction(newQuestions, responses);
      setResponses((prev) => [...prev, response]);

      setTimeout(scrollToBottom, 100);
    });
  }

  const scrollToBottom = () => {
    contentRef.current?.scrollTo(
      {
        top: contentRef.current.scrollHeight,
        behavior: "smooth"
      }
    )
  }


  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey){
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Dialog open={open} onOpenChange = {handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">Ask AI</Button>
      </DialogTrigger>
      <DialogContent className="custom-scrollbar flex h-[85vh] max-w-4xl flex-col overflow-y-auto" ref={contentRef}>
        <DialogHeader>
          <DialogTitle>Ask AI About Your Notes</DialogTitle>
          <DialogDescription>
            Our AI can answer almost any question about your notes. Type your question below and press Enter to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-8">
          {questions.map((question, index) => (
            <Fragment key={index}>
              <p className="ml-auto max-w-[60%] rounded-md bg-muted px-2 py-1 text-sm text-muted-foreground"> {question}</p>
              {responses[index] && (
                <div
                  className="bot-response text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: responses[index] }}
                />
              )}
            </Fragment>
          ))} 
          {isPending && <p className="animate-pulse text-sm">Thinking...</p>}
        </div>
        <div
          className="mt-auto flex items-end gap-2 rounded-lg border p-4 cursor-text"
          onClick={handleClickInput}
        >
          <Textarea
            ref={textareaRef}
            placeholder="Ask me anything about your notes..."
            className="placeholder:text-muted-foreground resize-none rounded-none border-none bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 size-6"
            style={{
              minHeight: "0",
              lineHeight: "normal",
            }}
            rows={1}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <Button className="size-6 rounded-full flex-shrink-0">
            <ArrowUpIcon className="text-background" />
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default AskAIButton