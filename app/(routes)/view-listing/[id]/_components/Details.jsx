import GoogleMapSection from "@/app/_components/GoogleMapSection";
import { Button } from "@/components/ui/button";
import { BedDouble, Drill, Home, MapPin, Share } from "lucide-react";
import React from "react";
import AgentDetail from "./AgentDetail";

function Details({ listingDetail }) {
  return (
    listingDetail && (
      <div className="my-6  flex gap-2 flex-col">
        <div className="flex justify-between items-center">
          <div>
            <h2>${listingDetail?.price}</h2>
            <h2>
              <MapPin /> {listingDetail?.address}
            </h2>
          </div>
          <Button>
            <Share /> Share
          </Button>
        </div>
        <hr></hr>
        <div>
          <h2>Key Features</h2>
          <div>
            <h2
              className="flex gap-2 items-center justify-center bg-purple-100
          rounded-lg p-3 text-primary"
            >
              <Home /> {listingDetail?.propertyType}
            </h2>
            <h2
              className="flex gap-2 items-center justify-center bg-purple-100
          rounded-lg p-3 text-primary"
            >
              <Drill /> Built In {listingDetail?.builtIn}
            </h2>
            <h2
              className="flex gap-2 items-center justify-center bg-purple-100
          rounded-lg p-3 text-primary"
            >
              <BedDouble /> {listingDetail?.bedroom} Bed{" "}
            </h2>
            <h2
              className="flex gap-2 items-center justify-center bg-purple-100
          rounded-lg p-3 text-primary"
            >
              <BedDouble /> {listingDetail?.bedroom} Bed{" "}
            </h2>
            <h2
              className="flex gap-2 items-center justify-center bg-purple-100
          rounded-lg p-3 text-primary"
            >
              <BedDouble /> {listingDetail?.bedroom} Bed{" "}
            </h2>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="font-bold text-2xl">What's Special</h2>
          <p className="text-gray-600">{listingDetail?.description}</p>
        </div>
        <div>
          <h2 className="font-bold text-2xl">Find On Map</h2>
          <GoogleMapSection coordinates={listingDetail.coordinates} listing={[listingDetail]} />
        </div>
        <div>
          <h2 className="font-bold text-2xl">Contact Agent</h2>
          <AgentDetail listingDetail={listingDetail} />
        </div>
      </div>
    )
  );
}

export default Details;
