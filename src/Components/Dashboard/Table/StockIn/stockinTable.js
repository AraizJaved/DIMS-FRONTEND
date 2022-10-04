import React, { useEffect, useState, useRef } from "react";
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import object from "../../../Services/getMedData";
import { DownloadTableExcel } from 'react-export-table-to-excel';

const Table = ({ stock }) => {
  const tableRef = useRef(null);
  const [medData, setMedData] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const countPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filename] = useState(`${stock} history`)
  const [collection, setCollection] = React.useState(
    cloneDeep(medData?.slice(0, countPerPage))
  );

  const tableHead = {
    ProductName: "Medicine",
    Batch: "Batch",
    Expiry: "Expiry",
    MRP: "MRP",
    Quantity: "Quantity",
    QuantityInUnits: "QuantityInUnits"
  };

  useEffect(() => {
    // debugger
    if (stock === "stockin") {
      object.getStockin().then((res) => {
        setMedData(res.data.recordset);
        setCurrentPage(1);
        const to = countPerPage * 1;
        const from = to - countPerPage;
        setCollection(cloneDeep(res.data.recordset.slice(from, to)));
        setExcelData(res.data.recordset);
      }).catch((err) => {
        console.log(err.message);
      })
    } else if (stock === "stockout") {
      object.getStockout().then((res) => {
        setMedData(res.data.recordset);
        setCurrentPage(1);
        const to = countPerPage * 1;
        const from = to - countPerPage;
        setCollection(cloneDeep(res.data.recordset.slice(from, to)));
        setExcelData(res.data.recordset);
      }).catch((err) => {
        console.log(err.message);
      })
    }
  }, [])

  console.log('----------------------------------', medData);

  function updatePage(p) {
    // debugger
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(medData.slice(from, to)));
  };

  const tableRows = (rowData) => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      debugger
      if (keyD === "Expiry") {
        key[keyD] = key["Expiry"].split("T")[0]
      }
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  }
  function tableData(collection) {
    debugger
    return collection?.map((key, index) => tableRows({ key, index }));
  }

  function headRow() {
    debugger
    return Object.values(tableHead)?.map((title, index) => (
      <td key={index}>{title}</td>
    ));
  }
  return (
    <>
      <div className="container">
        <DownloadTableExcel
          filename={`${stock} history`}
          sheet="users"
          currentTableRef={tableRef.current}

        >

          <div className="row">
            <div className="col-md-3">
              <button className='mx-auto'
                style={{
                  width: '200px',
                  background: '#8fb339',
                  height: '40px',
                  borderRadius: '10px',
                  justifyContent: 'center',
                  boxShadow: '0 0 0px #8fb339',
                  position: "relative",
                  top: "10px"
                }}

                size='md'>
                Export to excel
              </button>
            </div>
          </div>

        </DownloadTableExcel>
        <table ref={tableRef}>
          <thead hidden>
            <tr hidden>{headRow()}</tr>
          </thead>
          <tbody hidden className="trhover">{excelData?.map((key, index) => tableRows({ key, index }))}</tbody>
        </table>

        <table className="table" >
          <thead>
            <tr>
              <th scope="row">Product Name</th>
              <th scope="row">Batch</th>
              <th scope="row">Expiry</th>
              <th scope="row">MRP </th>
              <th scope="row">Quantity</th>
              <th scope="row">Quantity In Units</th>
            </tr>
          </thead>
          <tbody >{tableData(collection)}</tbody>
        </table>
        <Pagination
          pageSize={countPerPage}
          onChange={updatePage}
          current={currentPage}
          total={medData?.length}
        />
      </div>
    </>
  );
};
export default Table;