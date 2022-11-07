import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Table = (props) => {
  //#region - RENDER
  const renderHeader = (data) => {
    return (
      <>
        {data.map((key, index) => (
          <React.Fragment key={index}>
            <th key={index}>{key}</th>
          </React.Fragment>
        ))}
        {props.onEdit && props.onDelete && <th></th>}
        {props.onRemove && <th>Action</th>}
      </>
    );
  };

  const renderBody = (data) => {
    const keys = props.keys;

    const table = data.map((row, index) => {
      return (
        <tr key={index}>
          {keys.map((key, index) => {
            return (
              <React.Fragment key={index}>
                {customCell({ row, key, index })}
              </React.Fragment>
            );
          })}

          {/* CUSTOM FUNCTIONALITIES */}
          {(props.onEdit ||
            props.onDelete ||
            props.onShare ||
            props.onRemove) && (
            <td key={`edit-${index}`}>
              {props.onEdit && (
                <button
                  className="table-options"
                  onClick={() =>
                    props.onEdit(
                      props.functionKey ? row[props.functionKey] : row
                    )
                  }
                >
                  Edit
                </button>
              )}
              {props.onDelete && (
                <button
                  className={customDisable(row)} //! custom
                  onClick={() =>
                    props.onDelete(
                      props.functionKey ? row[props.functionKey] : row
                    )
                  }
                >
                  &nbsp;|&nbsp;Delete
                </button>
              )}
              {props.onShare && (
                <button
                  className="table-options"
                  onClick={() =>
                    props.onShare(
                      props.functionKey ? row[props.functionKey] : row
                    )
                  }
                >
                  &nbsp;|&nbsp;Share
                </button>
              )}
              {props.onRemove && (
                <button
                  className="table-options"
                  onClick={() =>
                    props.onRemove(
                      props.functionKey ? row[props.functionKey] : row
                    )
                  }
                >
                  Remove
                </button>
              )}
            </td>
          )}
        </tr>
      );
    });
    return table;
  };
  //#endregion

  //#region - CUSTOM
  const customDisable = (row) => {
    let days = 0;
    if (props.custom?.disableDelete?.date) {
      const day = 1000 * 60 * 60 * 24;

      const present = props.custom?.disableDelete?.date;
      const movieRelease = new Date(row.yearRelease);
      const time = present.getTime() - movieRelease.getTime();
      days = Math.round(time / day);

      return props.custom?.disableDelete?.date && days <= 365
        ? "table-options disabled"
        : "table-options";
    }

    if (props.custom?.disableDelete?.movie) {
      return row.movies.length ? "table-options disabled" : "table-options";
    }

    if (props.custom?.disableDelete?.root) {
      return row?.permissions?.includes("root") ||
        props.custom?.disableDelete?.user.id === row.id
        ? "table-options disabled"
        : "table-options";
    }

    return "table-options";
  };

  const customCell = ({ row, key, index }) => {
    if (props.custom?.usersEmail && key === "id") {
      return <td key={index}>{props.custom.usersEmail(row)}</td>;
    } else if (key === "cost" || key === "permissions") {
      return (
        <td key={index} className="text-center">
          {row[key]}
        </td>
      );
    } else if (key === "approved") {
      return (
        <td key={index} className="text-left">
          {`${row[key]}`}
          {!row[key] && props.onApproval && (
            <button
              className="table-options"
              onClick={() =>
                props.onApproval(
                  props.functionKey ? row[props.functionKey] : row
                )
              }
            >
              &nbsp;- <span className="link">Approve?</span>
            </button>
          )}
        </td>
      );
    } else if (key === "movieId") {
      return (
        <td key={index}>
          <Link to={`/reviews/${row[key]}`} className="link">
            {row[key]}
          </Link>
        </td>
      );
    } else if (key === "message") {
      return (
        <td key={index}>
          <div className="control-message">{row[key]}</div>
        </td>
      );
    } else if (key === "yearRelease") {
      return <td key={index}>{row[key]}</td>;
    } else {
      //default
      return <td key={index}>{row[key]}</td>;
    }
  };
  //#endregion

  return (
    <>
      <table id="employee">
        <thead>
          <tr>{renderHeader(props.header)}</tr>
        </thead>
        <tbody>
          {renderBody(props.data)}
          {props.customRender}
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string).isRequired,
  keys: PropTypes.arrayOf(PropTypes.string).isRequired,
  functionKey: PropTypes.string, //For functionality (ex. onEdit(functionKey))
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onApproval: PropTypes.func,
  custom: PropTypes.object,
  customRender: PropTypes.array,
};
export default Table;

//#region - Sample
// {/* <Table
// header={["Code", "Name", "Category", "Amount"]}
// keys={["pCode", "pName", "category", "pAmount"]}
// functionKey="pCode"
// data={flatItems}
// onEdit={redirectEdit}
// onDelete={showDelete}
// /> */}
//#endregion
