import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  getRoom,
  updateRoom,
  updateRoomAvailibility,
} from "../controllers/room.js";

const router = express.Router();

// CREATE
router.post("/:hotelid", createRoom);

// UPDATE
router.put("/availability/:id", updateRoomAvailibility);
router.put("/:id", updateRoom);

// DELETE
router.delete("/:id/:hotelid", deleteRoom);

//GET
router.get("/:id", getRoom);

//GET_ALL
router.get("/", getAllRoom);

export default router;
