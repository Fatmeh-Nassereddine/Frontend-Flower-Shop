import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchInput } from "../../components/ui/SearchInput";  
import { PriceRange } from "../../components/ui/PriceRange";
import { CheckboxGroup } from "../../components/ui/CheckboxGroup";

const categories = [
  { id: "bouquets", label: "Bouquets" },
  { id: "plants", label: "Plants" },
  { id: "arrangements", label: "Arrangements" },
  { id: "gifts", label: "Gifts" },
  { id: "Ikebana", label: "Ikebana" },
];

const seasons = [
  { id: "all", label: "All Seasons" },
  { id: "spring", label: "Spring" },
  { id: "summer", label: "Summer" },
  { id: "autumn", label: "Autumn" },
  { id: "winter", label: "Winter" },
  { id: "valentines", label: "Valentine's Day" },
];

export function Sidebar2({ selectedCategories, selectedSeasons, setSelectedCategories, setSelectedSeasons }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [localCategories, setLocalCategories] = useState(selectedCategories);
  const [localSeasons, setLocalSeasons] = useState(selectedSeasons);

  // Sync filter selections with the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const urlCategories = urlParams.getAll('category');
    const urlSeasons = urlParams.getAll('season');

    setLocalCategories(urlCategories);
    setLocalSeasons(urlSeasons);
  }, [location.search]);

  const handleCategoryChange = (newSelected) => {
    setLocalCategories(newSelected);
    setSelectedCategories(newSelected);
  };

  const handleSeasonChange = (newSelected) => {
    setLocalSeasons(newSelected);
    setSelectedSeasons(newSelected);
  };

  // Update URL when filters change
  useEffect(() => {
    const urlParams = new URLSearchParams();
  
    localCategories
      .filter(Boolean) // filters out undefined, null, "", etc.
      .forEach((cat) => urlParams.append("category", cat));
  
    localSeasons
      .filter(Boolean)
      .forEach((season) => urlParams.append("season", season));
  
    navigate(`?${urlParams.toString()}`);
  }, [localCategories, localSeasons, navigate]);
  

  return (
    <aside className="w-[300px] pr-5 max-sm:w-full">
      <SearchInput />
      <PriceRange min={0} max={200} />
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Categories</h3>
        <CheckboxGroup
          options={categories}
          selectedValues={localCategories}
          onChange={handleCategoryChange}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Seasons</h3>
        <CheckboxGroup
          options={seasons}
          selectedValues={localSeasons}
          onChange={handleSeasonChange}
        />
      </div>
    </aside>
  );
}
