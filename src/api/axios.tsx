import axios from "axios";
import { baseURL } from "./url";

export const http = axios.create({
    baseURL
});