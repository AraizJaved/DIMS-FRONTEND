import React from "react";
import { Button } from "reactstrap";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
     
      <td>
        <input
          type="text"
          placeholder="Enter a Product Name"
          name="productName"
          value={editFormData.productName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter Opening Balance"
          name="openingBlnc"
          value={editFormData.openingBlnc}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="number"
          placeholder="Enter Batch No"
          name="batch"
          value={editFormData.batch}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="date"
          placeholder="Enter Exp Date"
          name="expDate"
          value={editFormData.expDate}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter MRP"
          name="mrp"
          value={editFormData.mrp}
          onChange={handleEditFormChange}
          disabled
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Enter Quantity"
          name="qty"
          disabled
          value={editFormData.qty}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>

        <Button
          type="submit"
          style={{
            width: '100px',
            background: '#8fb339',
            height: '40px',
            borderRadius: '10px',
            justifyContent: 'center',
            boxShadow: '0 0 0px #8fb339'
          }}

          size='sm'>
          Save
        </Button>
      </td>
      <td>
        <Button
          style={{
            width: '100px',
            background: '#8fb339',
            height: '40px',
            borderRadius: '10px',
            justifyContent: 'center',
            boxShadow: '0 0 0px #8fb339'
          }}
          onClick={handleCancelClick}

          size='sm'>
          Cancel
        </Button>
      </td>
    </tr>
  );
};

export default EditableRow;
