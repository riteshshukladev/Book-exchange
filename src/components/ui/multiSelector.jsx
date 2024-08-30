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

export function ComboboxDemo({
  content,
  selectedContent,
  setSelectedContent,
  isContentArrived,
  placeholder
}) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (currentValue) => {
    setSelectedContent((prev) => {
      if (prev.includes(currentValue)) {
        return prev.filter((item) => item !== currentValue)
      } else {
        return [...prev, currentValue]
      }
    })
  }

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
            ? selectedContent.map(v => content.find(item => item.value === v)?.label).join(" | ")
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className='w-full'>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            {!isContentArrived ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : (
              <CommandGroup>
                {content.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={() => handleSelect(item.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedContent.includes(item.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}



// const frameworks = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ]