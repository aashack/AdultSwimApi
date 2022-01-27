import express from "express";
import httpStatusCodes from "http-status-codes";

const router = express.Router();

router.all("*", async (req, res, next) => {
      return res.status(httpStatusCodes.NOT_FOUND).send({ message: "404 Not Found" });
});


export default router;
