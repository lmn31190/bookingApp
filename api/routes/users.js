import express from "express";
import {deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js";

const router = express.Router();

// VERIFY_TOKEN
// router.get("/verifytoken", verifyToken, (req, res, next) => {
//     res.send("Vous êtes bien connecté !")
// })

// router.get("/verifyuser/:id", verifyUser, (req, res, next) => {
//     res.send("Vous êtes bien connecté et vous pouvez supprimer votre compte!")
// })

// router.get("/verifyadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Vous êtes bien administrateur et vous pouvez supprimer tout les comptes!")
// })

// UPDATE
router.put("/:id", updateUser)

// DELETE
router.delete("/:id", deleteUser)

//GET
router.get("/:id", getUser)

//GET_ALL
router.get("/", getAllUser)

export default router;
