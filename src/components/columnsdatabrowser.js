import { NumberRangeColumnFilter } from "./FilterColumn";
export const COLUMNS = [
  //   {
  //     Header: "DATE STAMP",
  //     accessor: "DATE_STAMP",
  //   },
  {
    Header: "NAME",
    accessor: "NAME",
    disableFilters: true
  },
  {
    Header: "DATE",
    accessor: "DATE_STAMP",
  },
  {
    Header: "C1",
    accessor: "C1",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "C2",
    accessor: "C2",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "C3",
    accessor: "C3",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "C4",
    accessor: "C4",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "C5",
    accessor: "C5",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "C6",
    accessor: "C6",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "C7",
    accessor: "C7",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "C8",
    accessor: "C8",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "C9",
    accessor: "C9",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "N2",
    accessor: "N2",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "C02",
    accessor: "C02",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "H20",
    accessor: "H20",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "GHV",
    accessor: "GHV",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "VOLUME",
    accessor: "VOLUME_RATE",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "ENERGY",
    accessor: "ENERGY_RATE",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "TEMP",
    accessor: "TEMPERATURE",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  {
    Header: "PRESS",
    accessor: "PRESSURE",
    Filter: NumberRangeColumnFilter,
    filter: 'between',
  },
  //   {
  //     Header: "ENERGY RATE",
  //     accessor: "ENERGY_RATE",
  //   },
  //   {
  //     Header: "VOLUME RATE",
  //     accessor: "VOLUME_RATE",
  //   },
];
