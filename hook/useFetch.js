import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { RAPID_API_KEY } from "@env";

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const rapidapikey = RAPID_API_KEY;
  // const axios = require('axios');

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/search/${(endpoint, query)}`,
    headers: {
      "X-RapidAPI-Key": rapidapikey,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchdata = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // just to refresh the data if necessary
  const refetch = () => {
    setIsLoading(true);
    fetchdata();
  };

  return "data", "isLoading", "error", refetch;
};

export default useFetch;
