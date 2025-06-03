import React from 'react';
import { Table } from 'react-bootstrap';
import {Statistics} from "../api/dto/Statistics";

interface StatisticsTableProps {
  statistics: Statistics[];
}

export const StatisticsTable: React.FC<StatisticsTableProps> = ({ statistics }) => {
  return (
      <Table striped="columns">
        <thead className="table-dark">
        <tr>
          <th>Тип оборудования</th>
          <th>Количество выданных единиц</th>
        </tr>
        </thead>
        <tbody>
        {statistics.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.count}</td>
            </tr>
        ))}
        </tbody>
      </Table>
  );
};