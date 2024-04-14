"use client";
import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";

function AddNewListing() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const { user } = useUser();

  const nextHandler = async () => {
    //console.log(selectedAddress, coordinates);
    const { data, error } = await supabase
      .from("listing")
      .insert([
        { address: selectedAddress, coordinates: coordinates, createdBy: user?.primaryEmailAddress.emailAddress },
      ])
      .select();

    if (data) {
      console.log("Added succesfully, ", data);
    }
    if (error) {
      console.log("Error");
    }
  };

  return (
    <div className="mt-10 md:mx-56 lg:mx-80">
      <div className="flex flex-col items-center justify-center p-10 gap-5">
        <h2 className="font-bold text-2xl">Add New Listing</h2>

        <div className="flex flex-col p-10 rounded-lg border w-full shadow-md gap-5">
          <h2 className="text-gray-500">Enter Address which you want to list</h2>
          <GoogleAddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          <Button disabled={!selectedAddress || !coordinates} onClick={nextHandler}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewListing;
