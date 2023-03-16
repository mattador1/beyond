import axios from "axios";
import { useEffect, useState } from "react";
import { GetResponse, GetUserResponse } from "../models/types";
import {
  topInfluencerPerCategoryByFollowers,
  topInfluencerPerCountryByEngagementAvg,
} from "../queries/user";

const Home = () => {
  const [error, setError] = useState("");
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

      console.log(topByCountry);
    } else {
      throw new Error("Invalid data");
    }
  };

  useEffect(() => {
    loadData()
      .then(() => {
        // loaded into state
      })
      .catch((err) => {
        // error handle
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Home Page</div>;
};

export default Home;
