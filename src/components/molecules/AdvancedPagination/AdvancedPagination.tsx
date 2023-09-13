import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import React from "react";

export const AdvancedPagination = ({
  numberOfPages,
  currentPage,
  limit = 10,
  onPageChange,
  totalCount,
}: {
  numberOfPages: number;
  limit?: number;
  currentPage: number;
  totalCount: number;
  onPageChange: (pageNumber: number) => void;
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      handleChangePage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < numberOfPages) {
      handleChangePage(currentPage + 1);
    }
  };

  const handleChangePage = (page: number) => {
    onPageChange(page);
  };

  const firstItem = (currentPage - 1) * limit + 1;
  const lastItem = Math.min(currentPage * limit, totalCount);

  return (
    <Flex mt={8} gap={[2, 4]} justifyContent="center" alignItems="center" flexWrap={"wrap"}>
      <Flex gap={[2, 4]} justifyContent="center" alignItems="center">
        <Button
          variant={"outline"}
          width={10}
          height={10}
          onClick={handlePrev}
          isDisabled={currentPage <= 1}
        >
          <ChevronLeftIcon fontSize={22} />
        </Button>
        <Box>
          <Text fontWeight={500}>
            Showing results{" "}
            <Text as="span" fontWeight={800}>
              {firstItem}-{lastItem}{" "}
            </Text>
            of
            <Text as="span" fontWeight={800}>
              {" "}
              {totalCount}
            </Text>
          </Text>
        </Box>

        <Button
          width={10}
          height={10}
          variant={"outline"}
          onClick={handleNext}
          isDisabled={currentPage >= numberOfPages}
        >
          <ChevronRightIcon fontSize={22} />
        </Button>
      </Flex>
    </Flex>
  );
};
