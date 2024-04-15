"use client";
import GoogleAddressSearch from "@/app/_components/GoogleAddressSearch";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Loader } from "lucide-react";

function AddNewListing() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const { user } = useUser();
  const [loader, setLoader] = useState(false);

  const nextHandler = async () => {
    //console.log(selectedAddress, coordinates);
    setLoader(true);
    const { data, error } = await supabase
      .from("listing")
      .insert([
        { address: selectedAddress, coordinates: coordinates, createdBy: user?.primaryEmailAddress.emailAddress },
      ])
      .select();

    if (data) {
      setLoader(false);
      console.log("Added succesfully, ", data);
      toast("New Address added for listing");
    }
    if (error) {
      setLoader;
      console.log("Error");
      toast("Server side error");
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
          <Button disabled={!selectedAddress || !coordinates || loader} onClick={nextHandler}>
            {loader ? <Loader className="animate-spin" /> : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewListing;
