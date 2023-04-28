import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { useEffect, useState } from "react";
import billApi from "../../../../api/billApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import Bill from "../../../../models/bill.model";
import { Typography } from "@mui/material";

interface TableRow {
  stt: number;
  content: string;
  amount: number;
  electricityIndex: number;
  _id: string;
}

function createData(
  _id: string,
  content: string,
  electricityIndex: number,
  amountMoney: number,
  isPaid: boolean,
  userCode: string
): Bill {
  return {
    _id,
    content,
    electricityIndex,
    amountMoney,
    isPaid,
    userCode,
  };
}

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

// function stableSort<T>(
//   array: readonly T[],
//   comparator: (a: T, b: T) => number
// ) {
//   const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

interface HeadCell {
  disablePadding: boolean;
  id: keyof TableRow;
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
    id: "electricityIndex",
    numeric: true,
    disablePadding: false,
    label: "Số điện",
  },
  {
    id: "amount",
    numeric: true,
    disablePadding: false,
    label: "Tổng tiền",
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

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
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

interface PaymentTableProps {
  addBill: (bill: Bill[]) => void;
}

export default function PaymentTable({ addBill }: PaymentTableProps) {
  const [selected, setSelected] = React.useState<Bill[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const [unpaidBills, setUnpaidBills] = useState<Bill[]>([]);
  const [rows, setRows] = useState<Bill[]>([]);

  const getUnpaidBill = async () => {
    try {
      const res = await billApi.getUnpaid({ userCode: user?.userCode } as any);
      setUnpaidBills(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getUnpaidBill();
  }, []);

  useEffect(() => {
    if (unpaidBills) {
      const _rows = unpaidBills.map((bill, index) => {
        return createData(
          bill._id,
          bill.content,
          bill.electricityIndex,
          bill.electricityIndex * 2500,
          bill.isPaid,
          bill.userCode
        );
      });
      setRows(_rows);
    }
  }, [unpaidBills]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n);
      addBill(newSelected);
      setSelected(newSelected);
      return;
    }
    addBill([]);
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, row: Bill) => {
    const selectedIndex = selected.indexOf(row);
    let newSelected: Bill[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row);
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
    addBill(newSelected);
  };

  const isSelected = (row: Bill) => {
    return selected.indexOf(row) !== -1;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={DEFAULT_ORDER}
              orderBy={DEFAULT_ORDER_BY}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.length > 0
                ? rows.map((row, index) => {
                    const isItemSelected = isSelected(row);

                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
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
                        <TableCell align="center">
                          {row.electricityIndex}
                        </TableCell>
                        <TableCell align="center">
                          {row.amountMoney.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
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
