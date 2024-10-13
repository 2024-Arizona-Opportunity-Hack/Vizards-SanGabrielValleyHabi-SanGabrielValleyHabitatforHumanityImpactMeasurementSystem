
// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import {
  columnsDataColumns,
} from "views/admin/dataTables/variables/columnsData";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import React from "react";
import { useMemo } from "react";

export default function Settings() {
  // Chakra Color Mode

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Country',
        accessor: 'country',
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      { name: 'John Doe', age: 30, country: 'USA' },
      { name: 'Jane Smith', age: 25, country: 'Canada' },
      { name: 'Bob Johnson', age: 45, country: 'UK' },
    ],
    []
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
      </SimpleGrid>
    </Box>
  );
}
