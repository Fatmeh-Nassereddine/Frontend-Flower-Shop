import React from "react";
import { Checkbox } from "./checkbox";

export function CheckboxGroup({ options, title, onChange }) {
  const [selected, setSelected] = React.useState([]);

  const handleChange = (checked, id) => {
    const newSelected = checked
      ? [...selected, id]
      : selected.filter((item) => item !== id);

    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className="mb-5">
      <span className="block mb-2.5">{title}</span>
      <div className="mt-2.5">
        {options.map((option) => (
          <div key={option.id} className="flex items-center mb-2.5">
            <Checkbox
              id={option.id}
              checked={selected.includes(option.id)}
              onCheckedChange={(checked) =>
                handleChange(Boolean(checked), option.id)
              }
            />
            <label
              htmlFor={option.id}
              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
