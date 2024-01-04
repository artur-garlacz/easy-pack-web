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
import { zodResolver } from "@hookform/resolvers/zod";
import { requestRepository } from "@/repositories/request-repository";
import { useMutation } from "@tanstack/react-query";
import TitleNavbar from "@/components/atoms/TitleNavbar";
import Header from "@/components/molecules/Header/Header";
import { useSuccessToast } from "@/hooks/useToast/useSuccessToast";
import { useErrorToast } from "@/hooks/useToast/useErrorToast";
import { RequestFormSchema, requestFormSchema } from "@/typings/requests";
import { ParcelRequestSummarySection } from "@/components/molecules/ParcelRequestSummarySection/ParcelRequestSummarySection";
import { parcelRepository } from "@/repositories/parcel-repository";

export default function CreateParcelRequest() {
  const form = useForm<RequestFormSchema>({
    defaultValues: {
      pickupAddress: {
        country: "PL",
      },
      deliveryAddress: {
        country: "PL",
      },
      packages: [INITIAL_PACKAGE],
    },
    resolver: zodResolver(requestFormSchema),
  });
  const showError = useErrorToast();
  const showSuccess = useSuccessToast();
  const api = parcelRepository({});
  // const {
  //   status,
  //   data,
  //   refetch: refetchList,
  // } = useQuery([api.getEstimation.name, {}], () =>
  //   api.getEstimation({
  //     packagesCount: 2,
  //     pickUpAddress: "Leńcze 73A, 34-142 Leńcze",
  //     shipmentUpAddress: "Radocza, Piastowska 140, 34-100 Radocza",
  //     type: "OTHER",
  //   })
  // );
  const { mutateAsync } = useMutation(
    (payload: RequestFormSchema) => api.createParcelDelivery(payload),
    {
      onSuccess: async () => {
        showSuccess({ message: "Request has been sent" });
      },
      onError: () => {
        showError({ message: "Cannot sent request" });
      },
    }
  );

  const { handleSubmit, reset } = form;

  const onSubmit = handleSubmit(async (data) => {
    console.log("WW");
    await mutateAsync(data);
    reset();
  });
  console.log(form);
  return (
    <>
      <Header />
      <TitleNavbar title="Create parcel request" />
      <div className="w-full min-h-screen px-4 pt-16">
        <FormProvider {...form}>
          <Card className="mx-auto container bg-white p-2 mb-8">
            <CardHeader
              style={{
                borderTopRightRadius: 6,
                borderTopLeftRadius: 6,
                backgroundColor: "rgba(168, 196, 154, 0.3)",
              }}
            >
              <CardTitle>Request parcel delivery</CardTitle>
              <CardDescription>
                Fill form below to request parcel delivery
              </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem borderTop="none">
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      1. Packages
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <AddPackageSection />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      2. Address data
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <ShipmentSection />
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      3. Summary
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <ParcelRequestSummarySection />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </form>
          </Card>
        </FormProvider>
      </div>
    </>
  );
}
