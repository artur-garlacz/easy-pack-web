import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { WidgetBorderBox } from "@/components/atoms/WidgetBorderBox/WidgetBorderBox";
import { StyledTable } from "@/components/organisms/StyledTable/StyledTable";
import {
  Flex,
  Box,
  Spinner,
  Text,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { AdvancedPagination } from "@/components/molecules/AdvancedPagination/AdvancedPagination";
import { ColumnDef } from "@tanstack/react-table";
import { courierRepository } from "@/repositories/courier-repository";
import { Courier } from "@/typings/user";
import { CreateCourierModal } from "@/components/organisms/CreateCourierModal/CreateCourierModal";

export function CouriersTable() {
  const api = courierRepository({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [page, setPage] = useState<number>(1);
  const {
    status,
    data,
    refetch: refetchList,
  } = useQuery([api.getCouriers.name, { page }], () =>
    api.getCouriers({
      page,
      filters: {},
    })
  );
  const columns: ColumnDef<Courier>[] = [
    {
      accessorKey: "fullName",
      header: "Full name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
  ];

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      w="full"
      h="auto"
      gap={8}
    >
      <WidgetBorderBox bg="white" height={100} />

      <WidgetBorderBox
        w="full"
        bg="white"
        title="Couriers"
        headerButtons={
          <Button ml={4} onClick={onOpen}>
            Add new
          </Button>
        }
      >
        {status === "error" && (
          <Text>An error occurred while loading couriers.</Text>
        )}
        {status === "loading" && (
          <Box textAlign={"center"} p={6}>
            <Spinner />
          </Box>
        )}
        {status === "success" && (
          <>
            <StyledTable
              columns={columns}
              data={data.data}
              paginationElement={
                <AdvancedPagination
                  numberOfPages={data.numberOfPages}
                  currentPage={data.currentPage}
                  onPageChange={setPage}
                  limit={10}
                  totalCount={data.itemsCount}
                />
              }
              headerProps={{
                borderTop: "none",
              }}
            />
            <CreateCourierModal
              isOpen={isOpen}
              onClose={onClose}
              onSuccess={refetchList}
            />
          </>
        )}
      </WidgetBorderBox>
    </Flex>
  );
}
