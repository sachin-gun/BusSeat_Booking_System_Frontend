import { Table } from "flowbite-react";
import React from "react";

const SeatTable = ({ availableSeats, selectedSeat, setSelectedSeat }) => {
  // Group seats into rows of 4
  const groupedSeats = [];
  for (let i = 0; i < availableSeats.length; i += 4) {
    groupedSeats.push(availableSeats.slice(i, i + 4));
  }

  return (
    <Table>
      <Table.Body>
        {groupedSeats.map((row, rowIndex) => (
          <Table.Row key={rowIndex}>
            {row.map((seat) => (
              <Table.Cell
                key={seat}
                className={
                  selectedSeat === seat
                    ? "bg-green-200 cursor-pointer text-center"
                    : "cursor-pointer text-center"
                }
                onClick={() => setSelectedSeat(seat)}
              >
                Seat {seat}
              </Table.Cell>
            ))}
            {/* Fill empty cells if the row has less than 4 seats */}
            {row.length < 4 &&
              Array.from({ length: 4 - row.length }).map((_, index) => (
                <Table.Cell key={`empty-${rowIndex}-${index}`} />
              ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default SeatTable;
