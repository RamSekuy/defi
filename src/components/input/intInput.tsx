"use client";
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";

type props = {
  value?: number;
  name?: string;
  onChange?: (value: number) => void;
  className?: string;
};
export default function IntInput({ value, name, onChange, className }: props) {
  const [inputValue, setInputValue] = useState(value || 0);
  const _onChange = (v: ChangeEvent<HTMLInputElement>) => {
    const raw = v.target.value.replace(/[^\d]/g, "");
    const value = Number(raw);
    if (Number.isNaN(value)) return;
    setInputValue(value);
    onChange?.(value);
  };
  return (
    <>
      <Input name={name} type="number" className="hidden" value={inputValue} />
      <Input
        min={1000}
        className={className}
        value={inputValue.toLocaleString("id-ID", {
          currency: "IDR",
          style: "currency",
          maximumFractionDigits: 0,
        })}
        onChange={_onChange}
      />
    </>
  );
}
