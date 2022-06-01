import axios from "axios";

const client = axios.create({
	baseURL: "https://api.nasa.gov/neo/rest/v1/neo/",
});

export const randomCall = axios.create({
	baseURL: "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY",
});

export default client;
