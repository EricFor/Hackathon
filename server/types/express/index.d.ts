declare namespace Express {
  interface Request {
    userId?: number;
    authToken?: string;
  }
}
