"use client";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { MapPin } from "lucide-react";

function GoogleAddressSearch() {
  return (
    <div className="flex items-center w-full">
      <MapPin className="h-10 w-10 p=2 rounded-l-lg text-primary bg-purple-200" />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: "Search Property Address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            console.log(place);
          },
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
