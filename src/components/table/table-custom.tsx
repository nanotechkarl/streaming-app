export const customDisable = (row: any, props: any) => {
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
    return row.movies?.length ? "table-options disabled" : "table-options";
  }

  if (props.custom?.disableDelete?.root) {
    return row?.permissions?.includes("root") ||
      props.custom?.disableDelete?.user?.id === row?.id
      ? "table-options disabled"
      : "table-options";
  }

  return "table-options";
};

export const customDisableEdit = (row: any, props: any) => {
  if (props.custom?.disableDelete?.root) {
    return row?.permissions?.includes("root") ||
      props.custom?.disableDelete?.user?.id === row?.id
      ? "table-options disabled"
      : "table-options";
  }

  return "table-options";
};

export const customButtons = (row: string, index: number, props: any) => {
  return (
    (props.onEdit || props.onDelete) && (
      <td key={`edit-${index}`}>
        {props.onEdit && (
          <button
            className={customDisableEdit(row, props)}
            onClick={() =>
              props.onEdit(props.functionKey ? row[props.functionKey] : row)
            }
          >
            Edit
          </button>
        )}
        {props.onDelete && (
          <button
            className={customDisable(row, props)}
            onClick={() =>
              props.onDelete(props.functionKey ? row[props.functionKey] : row)
            }
          >
            &nbsp;|&nbsp;Delete
          </button>
        )}
      </td>
    )
  );
};
