import React, { useEffect, useState, useRef } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import { allData } from "./constants";
import object from "../../Services/getMedData";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import axios from 'axios'

// import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
// import { ExcelExport } from "@progress/kendo-react-excel-export";


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
let temp = true;
const Table = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [medData, setMedData] = useState([]);
  const [excelData, setExcelData] = useState([]);
  useEffect(() => {
    axios.post('http://localhost:3001/api/essentailDrugList').then((res) => {
      setMedData(res.data.recordset);
      setExcelData(res.data.recordset);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])

  console.log('fjlkdsfjklsdfjklsdjsfldskjlkjf', medData);

  const _export = React.useRef(null);

  const countPerPage = 10;
  const [value, setValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(medData?.slice(0, countPerPage))
  );
  const searchData = React.useRef(
    throttle(val => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data = cloneDeep(
        medData
          ?.filter(item => item.MainCategory.toLowerCase().indexOf(query) > -1)
          ?.slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  // React.useEffect(() => {
  //   console.log('///////////////////////', value)
  //   // 
  //   if (!value) {
  //     updatePage(1);
  //   } else {
  //     searchData.current(value);
  //   }
  // }, [value]);

  // const updatePage = p => {
  //   setCurrentPage(p);
  //   const to = countPerPage * p;
  //   const from = to - countPerPage;

  //   setCollection(cloneDeep(medData?.slice(from, to)));
  // };

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
  const getData = () => {
    // debugger
    // object.getMedData().then((res) => {
    //   setExcelData(res.data.recordsets[0]);
    // },[]).catch((err) => {
    //   console.log(err.message);
    // })
  }

  return (
    <>
      {/* <div class="search">
        <input
          placeholder="Search Campaign"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div> */}
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
          <tbody className="trhover">{medData?.map((key, index) => tableRows({ key, index }))}</tbody>
        </table>
        {/* <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={medData?.length}
      /> */}
      </div>



    </>
  );
};
export default Table;
