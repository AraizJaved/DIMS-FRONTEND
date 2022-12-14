import React, { useEffect, useState, useRef } from "react";
import cloneDeep from "lodash/cloneDeep";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import object from "../../Services/getMedData";
import { DownloadTableExcel } from 'react-export-table-to-excel';

const tableHead = {
  MainCategory: "MainCategory",
  Subcategory1: "Subcategory1",
  Subcategory2: "Subcategory2",
  Subcategory3: "Subcategory3",
  Subcategory4: "Subcategory4",
  Drug: "Drug"

  // name:"name",
  // parentId:"parentId",
  // campaignType:"campaignType",
  // status:"status",
  // channel:"channel",
  // action:"action"
};
const Table = () => {
  const tableRef = useRef(null);
  const [medData, setMedData] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const countPerPage = 10;
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(medData?.slice(0, countPerPage))
  );
  useEffect(() => {
    object.getMedData().then((res) => {
      setMedData(res.data.recordset);
      setCurrentPage(1);
      const to = countPerPage * 1;
      const from = to - countPerPage;
      setCollection(cloneDeep(res.data.recordset.slice(from, to)));
      setExcelData(res.data.recordset);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])
  function updatePage(p) {
    debugger
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(medData.slice(from, to)));
  };

  const tableRows = rowData => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection?.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };

  return (
    <>
      <div className="container">
        <DownloadTableExcel
          filename="Essential Drug List"
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

        <table >
          <thead>
            <tr>{headRow()}</tr>
          </thead>
          <tbody className="trhover">{tableData()}</tbody>
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
