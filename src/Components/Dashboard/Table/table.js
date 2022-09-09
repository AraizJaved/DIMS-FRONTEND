import React, { useEffect } from "react";
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import object from '../../Services/getMedData'

const tableHead = {
  Name: "Name",
  BatchNo: "Batch",
  ExpDate: "ExpDate",
  PricePerItem: "PricePerItem",
  Qty: "Qty"
};

let medData = null;

window.onload = () => {
  console.log("jhdjshjkshdjkhdjksa")
  object.getMedData().then((res) => {
    medData = res.data.recordset;
  }).catch((err) => {
    console.log(err.message);
  })
}

const Table = () => {


  // React.useEffect(() => {
  //   const timerId = setInterval(() => {


  //   }, 5000);
  //   return () => {
  //     clearInterval(timerId); // don't forget to clear the interval
  //     // mounted = false
  //   }
  // }, [])



  if (medData != null) {
    console.log(medData)
  }
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
          .filter(item => item?.Name.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data);
    }, 400)
  );

  React.useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(medData?.slice(from, to)));
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
      <div class="search">
        <input
          placeholder="Search Campaign"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <table>
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
    </>
  );
};
export default Table;
