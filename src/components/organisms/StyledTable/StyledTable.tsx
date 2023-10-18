import {
  Text,
  TableContainer,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Table,
  Flex,
  TableColumnHeaderProps,
  TableContainerProps,
} from "@chakra-ui/react";
import {
  ColumnDef,
  SortingState,
  TableOptions,
  type Table as TableType,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { SorterArrowIcon } from "@/components/atoms/Icons/SorterArrowIcon";
import { useRouter } from "next/router";
import { CSSProperties, Dispatch, SetStateAction, useState } from "react";

interface TableWithProps<T> {
  data: Array<T>;
  columns: ColumnDef<T, string>[];
  noDataInfoElement?: JSX.Element;
  paginationElement?: React.ReactNode;
  isSortable?: Boolean;
  setSelectedId?: Dispatch<SetStateAction<string | null>>;
  setSelectedElement?: Dispatch<SetStateAction<any>>;
  onOpen?: (data: T) => void;
  setSelectedIds?: Dispatch<SetStateAction<string[]>>;
  headerProps?: TableColumnHeaderProps;
  containerProps?: TableContainerProps;
  onRowHover?: (index: number | null) => void;
  rowStyles?: (data: T) => CSSProperties | undefined;
  hoverElement?: number | null;
  staticRowsCount: number;
}

export function StyledTable<
  T extends Record<string, unknown> & { id?: string; route?: string }
>({
  data,
  columns,
  noDataInfoElement,
  paginationElement,
  isSortable = false,
  setSelectedId,
  setSelectedIds,
  onOpen,
  headerProps,
  containerProps,
  rowStyles,
  onRowHover,
  hoverElement = null,
  setSelectedElement,
  staticRowsCount,
}: TableWithProps<T>) {
  const table = useWrappedReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    isSortable,
  });

  const router = useRouter();

  if (!data?.length) {
    return noDataInfoElement || <Text>No data to display</Text>;
  }

  const emptyRowsCount = staticRowsCount - table.getRowModel().rows.length;
  return (
    <>
      <TableContainer
        {...containerProps}
        mb={emptyRowsCount > 0 ? emptyRowsCount * 73 : 0}
      >
        <Table onMouseLeave={() => onRowHover?.(null)}>
          <Thead>
            <Tr>
              {table.getLeafHeaders().map((header) => (
                <Th
                  key={header.id}
                  fontWeight={700}
                  fontSize={16}
                  color={"black"}
                  textTransform={"none"}
                  py={5}
                  pl={0}
                  borderTop={"1px"}
                  borderTopColor={"black"}
                  borderColor={"gray.300"}
                  {...headerProps}
                >
                  {header.column.getCanSort() ? (
                    <Flex
                      userSelect={"none"}
                      alignContent={"center"}
                      cursor={"pointer"}
                      onClick={header.column.getToggleSortingHandler()}
                      gap={1}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header?.getContext()
                      )}
                      <SorterArrowIcon
                        color={
                          header.column.getIsSorted() ? "black.100" : "gray.300"
                        }
                        direction={
                          header.column.getIsSorted() === "asc" ? "up" : "down"
                        }
                      />
                    </Flex>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header?.getContext()
                    )
                  )}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr
                onMouseEnter={() => onRowHover?.(row.index)}
                _hover={{ cursor: "pointer", backgroundColor: "gray.50" }}
                style={rowStyles?.(row.original as T)}
                key={row.id}
                onClick={() => {
                  const id = row.original.id as string;
                  setSelectedElement?.(row.original);
                  setSelectedId && id && setSelectedId(id);
                  onOpen && onOpen(row.original);

                  if (setSelectedIds) {
                    setSelectedIds((prev) => {
                      if (prev.find((p) => p === id)) {
                        return prev.filter((p) => p !== id);
                      } else {
                        return [...prev, id];
                      }
                    });
                  }
                  row.original?.route && router.push(row.original.route);
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  const isHoverElement = hoverElement !== null;
                  return (
                    <Td
                      opacity={
                        !isHoverElement
                          ? 1
                          : hoverElement === row.index
                          ? 1
                          : 0.5
                      }
                      zIndex={1}
                      key={cell.id}
                      borderBottomColor={"gray.300"}
                      pl={0}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
            {/* {emptyRowsCount > 0 &&
              new Array(emptyRowsCount).fill(0).map((s, idx) => (
                <Tr key={idx} h={73}>
                  {table.getAllColumns().map((cell) => {
                    return (
                      <Td
                        zIndex={1}
                        key={cell.id}
                        borderBottomColor={"gray.300"}
                        pl={0}
                      ></Td>
                    );
                  })}
                </Tr>
              ))} */}
          </Tbody>
        </Table>
      </TableContainer>
      {paginationElement}
    </>
  );
}

const getDefaultSorting = (columns: ColumnDef<any, string>[]): SortingState => {
  const firstColumnId = columns[0]?.id;
  if (!firstColumnId) {
    return [];
  }

  return [
    {
      id: firstColumnId,
      desc: false,
    },
  ];
};

const useWrappedReactTable: <T>(
  options: TableOptions<T> & { isSortable: Boolean }
) => TableType<T> = ({ isSortable, ...options }) => {
  const [sorting, setSorting] = useState(getDefaultSorting(options.columns));

  const sortProps = isSortable
    ? {
        state: { sorting },
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
      }
    : { enableSorting: false };

  return useReactTable({
    ...options,
    ...sortProps,
  });
};
