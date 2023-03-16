import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import DataTable from "../components/user-table";
import {
  filterPerCategoryByFollowers,
  filterPerCountryByFollowers,
  GetResponse,
  GetUserResponse,
} from "../models/types";
import {
  topInfluencerPerCategoryByFollowers,
  topInfluencerPerCountryByEngagementAvg,
} from "../queries/user";

const Home = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [topPerCategoryByFollowers, setTopPerCategoryByFollowers] = useState<
    filterPerCategoryByFollowers[]
  >([]);
  const [topPerCountryByEngagementAvg, setTopPerCountryByEngagementAvg] =
    useState<filterPerCountryByFollowers[]>([]);

  const fetch = async <Data extends Record<string, any>>(): Promise<
    GetResponse<Data>
  > => {
    try {
      const response = await axios.get("/api/fetch");
      return {
        error: undefined,
        data: response.data,
      };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return {
          error: err.message,
          data: undefined,
        };
      } else {
        return {
          error: "Client Error",
          data: undefined,
        };
      }
    }
  };

  const loadData = async () => {
    const response = await fetch<GetUserResponse>();
    if (response.error !== undefined) {
      setError(response.error);
    } else if (response.data.users !== null) {
      // do processing
      const topByCat = topInfluencerPerCategoryByFollowers(response.data.users);
      const topByCountry = topInfluencerPerCountryByEngagementAvg(
        response.data.users
      );
      setTopPerCategoryByFollowers(topByCat);
      setTopPerCountryByEngagementAvg(topByCountry);
    } else {
      throw new Error("Invalid data");
    }
  };

  useEffect(() => {
    loadData()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: "70%", margin: "auto auto" }}>
      {isLoading && <h3>Loading!!!</h3>}
      {!isLoading && !error && (
        <Fragment>
          <h1>Users per Category by Followers</h1>
          <DataTable data={topPerCategoryByFollowers} />
          <h1>Users per Country by Engagement Average</h1>
          <DataTable data={topPerCountryByEngagementAvg} />
        </Fragment>
      )}

      <h3>{error}</h3>
    </div>
  );
};

export default Home;
