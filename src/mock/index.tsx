import Fetch from "yet-another-fetch-mock";

const mock = Fetch.configure({});

mock.get("/nav-frontend-ikoner-backend/api/test.svg", "<svg></svg>");
