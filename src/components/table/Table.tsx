import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { customButtons } from "./table-custom";

const Table = (props: any) => {
  //#region - RENDER
  const renderHeader = (data: any) => {
    return (
      <>
        {data.map((key: string, index: number) => (
          <React.Fragment key={index}>
            <th key={index}>{key}</th>
          </React.Fragment>
        ))}
        {(props.onEdit || props.onDelete) && <th></th>}
      </>
    );
  };

  const renderBody = (data: any) => {
    const keys = props.keys;

    return data?.map((row: string, index: number) => {
      return (
        <tr key={index}>
          {keys?.map((key: string, iKeys: number) => {
            return (
              <React.Fragment key={iKeys}>
                {customCell({ row, key, index: iKeys })}
              </React.Fragment>
            );
          })}
          {customButtons(row, index, props)}
        </tr>
      );
    });
  };
  //#endregion

  //#region - CUSTOM
  const customCell = ({
    row,
    key,
    index,
  }: {
    row: any;
    key: string;
    index: number;
  }) => {
    if (key === "approved") {
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
            {row["movieTitle"]}
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
      return <td key={index}>{row[key].split("T")[0]}</td>;
    } else {
      return <td key={index}>{row[key]}</td>;
    }
  };
  //#endregion

  return (
    <div>
      <table
        className={props?.custom?.display === "large" ? "table-large" : ""}
      >
        <thead>
          <tr>{renderHeader(props.header)}</tr>
        </thead>
        <tbody>
          {renderBody(props.data)}
          {props.customRender}
        </tbody>
      </table>
    </div>
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
