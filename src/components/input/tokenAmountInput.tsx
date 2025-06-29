import React from "react";
import { Input } from "../ui/input";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
  placeholder?: string;
};

export default function TokenAmountInput({
  value = "",
  onChange,
  name,
  className,
  placeholder,
}: Props) {
  // Format value for display (with thousands separator)
  const formatDisplay = (val: string) => {
    if (!val) return "";
    // Pisahkan integer dan decimal
    const [int, dec] = val.replace(/,/g, "").split(".");
    const intFormatted = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return dec !== undefined ? `${intFormatted}.${dec}` : intFormatted;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value;

    // Hapus semua koma ribuan untuk value yang dikirim ke parent
    let normalized = raw.replace(/,/g, "");

    // Hanya izinkan angka dan satu titik desimal
    normalized = normalized.replace(/[^0-9.]/g, "");
    const parts = normalized.split(".");
    if (parts.length > 2) {
      // Jika user memasukkan lebih dari satu titik, gabungkan sisanya
      normalized = parts[0] + "." + parts.slice(1).join("");
    }

    onChange?.(normalized);
  };

  return (
    <Input
      name={name}
      className={className}
      placeholder={placeholder}
      value={formatDisplay(value)}
      onChange={handleChange}
      inputMode="decimal"
      autoComplete="off"
    />
  );
}
