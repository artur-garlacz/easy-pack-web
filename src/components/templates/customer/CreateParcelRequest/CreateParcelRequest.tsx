import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";
import AddPackageSection, {
  INITIAL_PACKAGE,
} from "@/components/organisms/AddPackageSection/AddPackageSection";
import { FormProvider, useForm } from "react-hook-form";
import { ShipmentSection } from "@/components/organisms/ShipmentSection/ShipmentSection";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { requestRepository } from "@/repositories/request-repository";
import { useQuery } from "@tanstack/react-query";

export default function CreateParcelRequest() {
  const methods = useForm<any>({
    defaultValues: {
      pickupAddress: {},
      deliveryAddress: {},
      pickupContact: {},
      deliveryContact: {},
      packages: [INITIAL_PACKAGE],
    },
  });

  const api = requestRepository({});
  const {
    status,
    data,
    refetch: refetchList,
  } = useQuery([api.getEstimation.name, {}], () =>
    api.getEstimation({
      packagesCount: 2,
      pickUpAddress: "Leńcze 73A, 34-142 Leńcze",
      shipmentUpAddress: "Radocza, Piastowska 140, 34-100 Radocza",
      type: "OTHER",
    })
  );

  console.log("data", data);
  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <Card className="mx-auto container bg-white p-2 mb-8">
        <CardHeader>
          <CardTitle>Request parcel delivery</CardTitle>
          <CardDescription>
            Fill form below to request parcel delivery
          </CardDescription>
        </CardHeader>
        <form className="" onSubmit={methods.handleSubmit(onSubmit)}>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    1. Packages
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <AddPackageSection />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    2. Address data
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <ShipmentSection />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    3. Summary
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}></AccordionPanel>
            </AccordionItem>
          </Accordion>
          {/* <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-50 px-4 py-2 text-left text-sm font-semibold text-gray-600 hover:bg-black-700 focus:outline-none focus-visible:ring focus-visible:ring-black-400 focus-visible:ring-opacity-75">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center rounded-full text-white font-medium bg-black h-7 w-7">
                      1
                    </div>
                    <span>Parcel data</span>
                  </div>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-600`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
                  <AddPackageSection />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure> */}
          {/* <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-50 px-4 py-2 text-left text-sm font-semibold text-gray-600 hover:bg-black-700 focus:outline-none focus-visible:ring focus-visible:ring-black-400 focus-visible:ring-opacity-75">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center rounded-full text-white font-medium bg-black h-7 w-7">
                      2
                    </div>
                    <span>Address data</span>
                  </div>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-600`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 py-6 text-sm">
                  <ShipmentSection />
                </Disclosure.Panel>
              </>
            )}
          </Disclosure> */}
          {/* <Disclosure as="div" className="mt-2">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-slate-50 px-4 py-2 text-left text-sm font-semibold text-gray-600 hover:bg-black-700 focus:outline-none focus-visible:ring focus-visible:ring-black-400 focus-visible:ring-opacity-75">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center rounded-full text-white font-medium bg-black h-7 w-7">
                      3
                    </div>
                    <span>Summary</span>
                  </div>
                  <ChevronUpIcon
                    className={`${
                      open ? "rotate-180 transform" : ""
                    } h-5 w-5 text-gray-600`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
                  No.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure> */}
        </form>
      </Card>
    </FormProvider>
  );
}
