//



"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export function ComboboxDemo({content, selectedContent, isContentArrived,placeholder }) {
  const [open, setOpen] = React.useState(false)
  // const [value, setValue] = React.useState([])
    

  return (
    <Popover open={open} onOpenChange={setOpen} className='w-full'>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedContent.length > 0
            ? selectedContent.map(v => frameworks.find(framework => content.value === v)?.label).join(" | ")
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className='w-full'>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>Empty</CommandEmpty>
          <CommandList>
            {!isContentArrived ? 
              <CommandEmpty>Loading...</CommandEmpty>
              :
              <CommandGroup>
              {content.map((cont) => (
                <CommandItem
                  key={cont.value}
                  value={cont.value}
                  // onSelect={() => handleSetValue(cont.value)}
                  onSelect={() => selectedContent(cont.value)} 
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedContent.includes(cont.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {cont.label}
                </CommandItem>
              ))}
            </CommandGroup>
            }
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}