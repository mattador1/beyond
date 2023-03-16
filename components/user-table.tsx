import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { FC } from "react";
import { filterPerCategoryByFollowers, QueryData } from "../models/types";

const isFilterPerCategoryByFollowers = (
  data: QueryData
): data is filterPerCategoryByFollowers[] => {
  return Boolean(
    data &&
      data.length &&
      (data[0] as filterPerCategoryByFollowers).category !== undefined
  );
};

const getColumns = (data: QueryData) => {
  let perColumnName = "category";

  if (!isFilterPerCategoryByFollowers(data)) {
    perColumnName = "country";
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: perColumnName, headerName: perColumnName, width: 130 },
    { field: "instaUser", headerName: "instaUser", width: 130 },
    { field: "instaName", headerName: "instaUser", width: 130 },
    { field: "category1", headerName: "category1", width: 130 },
    { field: "category2", headerName: "category2", width: 130 },
    { field: "followers", headerName: "followers", width: 130 },
    { field: "audienceCountry", headerName: "audienceCountry", width: 130 },
    { field: "engagement", headerName: "engagement", width: 130 },
    { field: "engagementAvg", headerName: "engagementAvg", width: 130 },
  ];

  return columns;
};

const transferForTable = (data: QueryData) => {
  let dataFeed;
  if (isFilterPerCategoryByFollowers(data)) {
    dataFeed = data.map((item, index) => {
      return {
        id: index,
        category: item.category,
        ...item.user,
      };
    });
  } else {
    dataFeed = data.map((item, index) => {
      return {
        id: index,
        country: item.country,
        ...item.user,
      };
    });
  }
  return dataFeed;
};

const DataTable: FC<{ data: QueryData }> = ({ data }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={transferForTable(data)}
        columns={getColumns(data)}
        pageSizeOptions={[5]}
        autoPageSize={true}
      />
    </div>
  );
};

export default DataTable;
