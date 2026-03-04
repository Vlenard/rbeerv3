import cors from "cors";

const corsMiddleware = cors(process.env.NODE_ENV === "development" ?
    {
        origin: `http://localhost:${process.env.FRONTEND_PORT}`, // frontend
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
    :
    {
        origin: false
    }
);

export default corsMiddleware;
