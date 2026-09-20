"use client";

import { useEffect, useId, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

interface SelectDropdownProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  options: SelectOption[];
  onChange: (name: string, value: string) => void;
}

export default function SelectDropdown({
  id,
  name,
  value,
  placeholder,
  options,
  onChange,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }

    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1 ${
          isOpen
            ? "border-blue-500 bg-blue-50/40"
            : "border-slate-300 bg-white hover:border-slate-400"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          {selectedOption?.icon && (
            <span className="material-symbols-outlined text-[20px] text-blue-600">
              {selectedOption.icon}
            </span>
          )}
          <span
            className={selectedOption ? "text-slate-900" : "text-slate-400"}
          >
            {selectedOption?.label || placeholder}
          </span>
        </span>
        <span
          className={`material-symbols-outlined text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={placeholder}
          className="absolute left-0 right-0 z-40 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_16px_35px_rgba(15,23,42,0.16)]"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(name, option.value);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  isSelected
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                }`}
              >
                {option.icon && (
                  <span className="material-symbols-outlined text-[19px] text-slate-400">
                    {option.icon}
                  </span>
                )}
                <span className="flex-1">{option.label}</span>
                {isSelected && (
                  <span className="material-symbols-outlined text-[18px] text-blue-600">
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
