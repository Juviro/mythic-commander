const baseUrl = process.env.BASE_URL_DATABASE;
const IS_DEV = process.env.NODE_ENV === "dev";

const database = IS_DEV ? "tasklist-dev" : "tasklist-prod";

export default {
  uri: `${baseUrl}/${database}?retryWrites=true`,
};
