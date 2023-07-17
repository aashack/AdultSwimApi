import express from "express";
import charactersController from "../../controllers/characters-controller.js";

const characterRouter = {
    parentNode: express.Router(),
    leafNode: express.Router({ mergeParams: true })
};

// GET all characters with allowed filters: PAGE, NAME, STATUS
characterRouter.parentNode.get("/", charactersController.getAll);
// GET all chacters profiles displayed
characterRouter.parentNode.get("/view/", charactersController.viewList);
// GET a character profile by ID
characterRouter.parentNode.get("/view/:characterId", charactersController.viewProfile);

characterRouter.parentNode.get("/excel/", charactersController.downloadExcelSheet);

// GET a character by ID
characterRouter.parentNode.get("/:characterId", charactersController.getCharacterById);


export default characterRouter;
