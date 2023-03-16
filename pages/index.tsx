import axios from "axios";
import { useEffect } from "react";
import { parseKeys } from "../models/user";

const Home = () => {
  const fetch = async () => {
    const response = await axios.get("/api/fetch");
  };

  useEffect(() => {
    fetch();
  }, []);

  return <div>Home Page</div>;
};

export default Home;
