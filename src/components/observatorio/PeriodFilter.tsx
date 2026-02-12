"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type PeriodFilterProps = {
  value: string;
};

export function PeriodFilter({ value }: PeriodFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-[0.3em] text-purple-200">
        Período
      </span>
      <Select value={value} disabled>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={value}>{value}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
