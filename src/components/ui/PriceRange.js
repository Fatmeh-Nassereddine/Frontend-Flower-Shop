import * as React from "react";
import { Slider } from "./Slider";

export function PriceRange({ min, max, onChange }) {
  const [value, setValue] = React.useState([min, max]);

  const handleChange = (newValue) => {
    const range = newValue; // Already a 2-element array from Radix
    setValue(range);
    onChange?.(range);
  };

  return (
    <div className="mb-5">
      <span>Price Range</span>
      <div className="w-full h-3 bg-[#593825] mx-0 my-2.5 rounded-lg">
        <Slider
          defaultValue={[min, max]}
          max={max}
          min={min}
          step={1}
          value={value}
          onValueChange={handleChange}
          className="mt-2"
        />
      </div>
      <div className="flex justify-between">
        <span>$ {value[0]}</span>
        <span>$ {value[1]}</span>
      </div>
    </div>
  );
}
