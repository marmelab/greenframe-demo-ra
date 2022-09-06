import { fetchUtils, Options } from "react-admin";
import postgrestRestProvider from "@promitheus/ra-data-postgrest";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoid2ViX2Fub24ifQ.hvke4pCbLXzfEX1DMTroQ-g9TK5no_yN3OfQJuSjBT0";
const httpClient = (url: string, options: Options = {}) => {
  options.user = {
    authenticated: true,
    token: `Bearer ${TOKEN}`,
  };
  return fetchUtils.fetchJson(url, options);
};

const restProvider = postgrestRestProvider("http://localhost:8000", httpClient);

export default restProvider;
