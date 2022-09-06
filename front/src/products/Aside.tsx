import * as React from "react";
import inflection from "inflection";
import { Card, CardContent } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOfferOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  SavedQueriesList,
  useGetList,
} from "react-admin";

import { Category } from "../types";

const Aside = () => {
  const { data } = useGetList<Category>("categories", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "name", order: "ASC" },
  });

  return (
    <Card
      sx={{
        display: { xs: "none", md: "block" },
        order: -1,
        width: "15em",
        mr: 2,
        alignSelf: "flex-start",
      }}
    >
      <CardContent sx={{ pt: 1 }}>
        <FilterLiveSearch />

        <SavedQueriesList />

        <FilterList
          label="resources.products.filters.sales"
          icon={<AttachMoneyIcon />}
        >
          <FilterListItem
            label="resources.products.filters.best_sellers"
            value={{
              "sales@lte": undefined,
              "sales@gt": 25,
              sales: undefined,
            }}
          />
          <FilterListItem
            label="resources.products.filters.average_sellers"
            value={{
              "sales@lte": 25,
              "sales@gt": 10,
              sales: undefined,
            }}
          />
          <FilterListItem
            label="resources.products.filters.low_sellers"
            value={{
              "sales@lte": 10,
              "sales@gt": 0,
              sales: undefined,
            }}
          />
          <FilterListItem
            label="resources.products.filters.never_sold"
            value={{
              "sales@lte": undefined,
              "sales@gt": undefined,
              sales: 0,
            }}
          />
        </FilterList>

        <FilterList
          label="resources.products.filters.stock"
          icon={<BarChartIcon />}
        >
          <FilterListItem
            label="resources.products.filters.no_stock"
            value={{
              "stock@lt": undefined,
              "stock@gt": undefined,
              stock: 0,
            }}
          />
          <FilterListItem
            label="resources.products.filters.low_stock"
            value={{
              "stock@lt": 10,
              "stock@gt": 0,
              stock: undefined,
            }}
          />
          <FilterListItem
            label="resources.products.filters.average_stock"
            value={{
              "stock@lt": 50,
              "stock@gt": 9,
              stock: undefined,
            }}
          />
          <FilterListItem
            label="resources.products.filters.enough_stock"
            value={{
              "stock@lt": undefined,
              "stock@gt": 49,
              stock: undefined,
            }}
          />
        </FilterList>

        <FilterList
          label="resources.products.filters.categories"
          icon={<LocalOfferIcon />}
        >
          {data &&
            data.map((record: any) => (
              <FilterListItem
                label={inflection.humanize(record.name)}
                key={record.id}
                value={{ category_id: record.id }}
              />
            ))}
        </FilterList>
      </CardContent>
    </Card>
  );
};

export default Aside;
