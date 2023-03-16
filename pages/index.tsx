import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  const fetch = async () => {
    const response = await axios.get("/api/fetch");

    console.log(response.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return <div>Home Page</div>;
};

export default Home;
