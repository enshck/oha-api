import { RateLimit, Stores } from "koa2-ratelimit";

const limit = RateLimit.middleware({
  interval: { min: 1 }, // 1 minute
  delayAfter: 30, // begin slowing down responses after the first request
  max: 50, // limit each IP to 50 requests per interval
  message: "Too many requests, please try again later.",
  statusCode: 429, // 429 status = Too Many Requests (RFC 6585)
  store: new Stores.Memory(),
  timeWait: 1000 * 60 * 5,
});

export default limit;
