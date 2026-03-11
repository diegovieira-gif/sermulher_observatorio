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
  availablePeriods: string[];
  onPeriodChange: (period: string) => void;
};

export function PeriodFilter({
  value,
  availablePeriods,
  onPeriodChange,
}: PeriodFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-[0.3em] text-purple-200">
        Período
      </span>
      <Select value={value} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          {availablePeriods.map((period) => (
            <SelectItem key={period} value={period}>
              {period}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
