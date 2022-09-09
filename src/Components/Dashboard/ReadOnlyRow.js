import { color } from "@mui/system";
import React from "react";
import { Button } from "reactstrap";

const ReadOnlyRow = ({ drugInfo, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      {console.log('000000000000000000000000000000',drugInfo)}
      <td>{drugInfo?.productName}</td>
      <td>{drugInfo?.openingBlnc}</td>
      <td>{drugInfo?.batch}</td>
      <td>{drugInfo?.expDate}</td>
      <td>{drugInfo?.mrp}</td>
      <td>{drugInfo?.qty}</td>
      <td>
        <Button
          style={{
            width:'60px',
            background: '#8fb339',
            height: '40px',
            borderRadius: '10px',
            justifyContent: 'center',
            boxShadow: '0 0 0px #8fb339',
            // color: 'white'
          }}
          onClick={(event) => handleEditClick(event, drugInfo)}

          size='sm'>
          Edit
        </Button>
        {' '}
      </td>
      <td>
        <Button
          style={{
            background: '#8fb339',
            height: '40px',
            borderRadius: '10px',
            justifyContent: 'center',
            boxShadow: '0 0 0px #8fb339',
            // color: 'white'
          }}
          onClick={() => handleDeleteClick(drugInfo.id)}

          size='sm'>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
