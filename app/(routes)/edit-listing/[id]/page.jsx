"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Formik } from "formik";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import FileUpload from "./_components/FileUpload";

function EditListing({ params }) {
  //const params = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const [listing, setListing] = useState([]);

  useEffect(() => {
    //console.log(params.split("/")[2]);
    user && verifyUserRecord();
  }, [user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);

    if (data) {
      setListing(data[0]);
    }

    if (data?.length <= 0) {
      router.replace("/");
    }
  };

  const onSubmitHandler = async (formValue) => {
    const { data, error } = await supabase.from("listing").update(formValue).eq("id", params.id).select();

    if (data) {
      console.log(data);
      toast("Listing updated and Published");
    }
    for (const image of images) {
      const file = image;
      const fileName = Date.now().toString();
      const fileExt = fileName.split(".").pop();
      const { data, error } = await supabase.storage.from(listingImages).upload(`${fileName}`, file, {
        contentType: `image/${fileExt}`,
        upsert: false,
      });

      if (error) {
        toast("Error while uploading images");
      }
    }
  };

  return (
    <div className="px-10 py-5 md:px-36 my-10">
      <h2 className="font-bold text-2xl">Enter more details about your listing</h2>
      <Formik
        initialValues={{
          type: "",
          propertyType: "",
          profileImage: user?.imageUrl,
          fullName: user?.fullName,
        }}
        onSubmit={(values) => {
          console.log(values);
          onSubmitHandler(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="p-8 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col gap-2">
                    <h2 className=" text-slate-500">Rent or Sell?</h2>
                    <RadioGroup defaultValue={listing?.type} onValueChange={(v) => (values.type = v)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Rent" id="Rent" />
                        <Label htmlFor="Rent" className="text-lg">
                          Rent
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Sell" id="Sell" />
                        <Label htmlFor="Sell" className="text-lg">
                          Sell
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-slate-500">Property Type</h2>
                    <Select
                      onValueChange={(e) => (values.propertyType = e)}
                      defaultValue={listing?.propertyType}
                      name="propertyType"
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue
                          placeholder={listing?.propertyType ? listing?.propertyType : "Select Property Type"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single House">Single House</SelectItem>
                        <SelectItem value="Town House">Town House</SelectItem>
                        <SelectItem value="Condo">Condo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* INPUT FIELDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Bedroom</h2>
                    <Input
                      type="number"
                      placeholder="Ex.2"
                      defaultValue={listing?.bedroom}
                      name="bedroom"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Bathroom</h2>
                    <Input
                      type="number"
                      placeholder="Ex.2"
                      defaultValue={listing?.bathroom}
                      name="bathroom"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Built In</h2>
                    <Input
                      type="number"
                      placeholder="Ex.1900 Sq.ft"
                      defaultValue={listing?.buildIn}
                      name="builtIn"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Parking</h2>
                    <Input
                      type="number"
                      placeholder="Ex.2"
                      defaultValue={listing?.parking}
                      name="parking"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Lot Size (Sq.Ft)</h2>
                    <Input
                      type="number"
                      placeholder="Ex.1900 Sq.ft"
                      defaultValue={listing?.lotSize}
                      name="lotSize"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Area (Sq.Ft)</h2>
                    <Input
                      type="number"
                      placeholder="Ex.1900 Sq.ft"
                      defaultValue={listing?.area}
                      name="area"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Selling Price</h2>
                    <Input
                      type="number"
                      placeholder="400000 Sq.ft"
                      defaultValue={listing?.price}
                      name="price"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">HOA ($ Per Month)</h2>
                    <Input
                      type="number"
                      placeholder="100"
                      defaultValue={listing?.hoa}
                      name="hoa"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-10">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-gray-500">Description</h2>
                    <Textarea
                      type="number"
                      placeholder=""
                      defaultValue={listing?.description}
                      name="description"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <h2 className="font-lg text-gray-500 my-2">Upload Property Images</h2>
                  <FileUpload setImages={(value) => setImages(value)} />
                </div>
                <div className="flex gap-4 justify-end mt-4">
                  <Button variant="outline" className="text-primary border-primary">
                    Save
                  </Button>
                  <Button className="">Save & Publish</Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditListing;
