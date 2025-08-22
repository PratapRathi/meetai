import { ReactNode, useState } from "react";
import { CommandEmpty, CommandInput, CommandItem, CommandResponsiveDialog } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronsUpDownIcon } from "lucide-react";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  onSelect,
  options,
  value,
  className,
  onSearch,
  placeholder = "Selct an option",
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  const handleOpenChange = (open: boolean) => {
    onSearch?.("");
    setOpen(open);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className={cn("h-9 justify-between font-normal px-2", !selectedOption && "text-muted-foreground", className)}
      >
        {selectedOption?.children ?? placeholder}
        <ChevronsUpDownIcon/>
      </Button>
      <CommandResponsiveDialog open={open} onOpenChange={handleOpenChange} shouldFilter={!onSearch}>
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandEmpty>
          <span className="text-muted-foreground text-sm">No options found</span>
        </CommandEmpty>
        {options.map((option) => (
          <CommandItem
            key={option.id}
            onSelect={() => {
              onSelect(option.value);
              setOpen(false);
            }}
          >
            {option.children}
          </CommandItem>
        ))}
      </CommandResponsiveDialog>
    </>
  );
};
