import * as React from "react";
import { Input } from "./Input";

export function SearchInput({ placeholder = "Search products...", onChange }) {
  return (
    <div className="mb-5">
      <span>Search</span>
      <div className="border p-2.5 rounded-lg border-solid border-black">
        <Input
          type="text"
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className="border-none p-0 focus-visible:ring-0"
        />
      </div>
    </div>
  );
}
