import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
} from "@mui/material";
import MyDocument from "./PDF";
import ReactPDF from "@react-pdf/renderer";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";

interface Data {
  stt: number;
  content: string;
  amount: number;
  note: string;
  action: string;
}

function createData(
  stt: number,
  content: string,
  amount: number,
  note: string,
  action: string
): Data {
  return {
    stt,
    content,
    amount,
    note,
    action,
  };
}

const rows = [
  createData(1, "Tiền điện tháng 1", 200000, "Đã thanh toán", "dowload"),
  createData(2, "Tiền điện tháng 2", 200000, "Đã thanh toán", "dowload"),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "stt",
    numeric: false,
    disablePadding: true,
    label: "STT",
  },
  {
    id: "content",
    numeric: true,
    disablePadding: false,
    label: "Nội dung",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Số tiền",
  },
  {
    id: "note",
    numeric: true,
    disablePadding: false,
    label: "Ghi chú",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Hoá đơn",
  },
];

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "amount";
const DEFAULT_ROWS_PER_PAGE = 5;

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount } = props;
  const createSortHandler =
    (newOrderBy: keyof Data) => (event: React.MouseEvent<unknown>) => {};

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface Bill {}
interface PaymentTableProps {
  addBill: (bill: Bill[]) => void;
}

export default function PaymentHistory() {
  const [order, setOrder] = React.useState<Order>(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = React.useState<keyof Data>(DEFAULT_ORDER_BY);
  const [selected, setSelected] = React.useState<Data[]>([]);
  const [visibleRows, setVisibleRows] = React.useState<Data[] | null>(null);

  React.useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );
    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
  }, []);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, data: Data) => {
    const selectedIndex = selected.indexOf(data);
    let newSelected: Data[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, data);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (row: Data) => {
    return selected.indexOf(row) !== -1;
  };


  return (
    <Box mt={2} sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            // sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows
                ? visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row);
                    // console.log(isItemSelected);

                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.content}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">{row.content}</TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                        <TableCell align="center">{row.note}</TableCell>
                        <TableCell align="center">
                          <PDFDownloadLink
                            document={<MyDocument {...row} />}
                            fileName="somename.pdf"
                          >
                            {({ blob, url, loading, error }) =>
                              loading ? (
                                "Loading document..."
                              ) : (
                                <Button
                                  // onClick={() => xuatHoaDon(row)}
                                  // // startIcon={
                                  // //   <SummarizeIcon sx={{ color: "white" }} />
                                  // // }
                                  sx={{
                                    height: "25px",
                                    width: "100px",
                                    backgroundColor: "#223771",
                                    color: "white",
                                    fontWeight: "bold",
                                    ":hover": {
                                      backgroundColor: "#3C5398",
                                    },
                                    marginBottom: 1,
                                    fontSize: 10,
                                  }}
                                >
                                  Xuất hoá đơn
                                </Button>
                              )
                            }
                          </PDFDownloadLink>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
