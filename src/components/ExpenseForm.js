import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  charge,
  handleCharge,
  amount,
  handleAmount,
  handleSubmit,
  edit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="ex. rent"
            value={charge}
            onChange={handleCharge}
          ></input>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="ex. $800"
            value={amount}
            onChange={handleAmount}
          ></input>
        </div>
      </div>

      <button type="submit" className="btn">
        {edit ? 'Edit' : 'Submit'}
        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};
export default ExpenseForm;
