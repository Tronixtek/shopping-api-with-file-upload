const express = require('express');
const route = express.Router();
const item_controller = require('../controllers/items');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config')


route.post("/", auth, multer, item_controller.postitem);

route.get("/", auth, item_controller.get_items);

route.get("/:id", auth, item_controller.get_one_item);

route.put("/:id", auth, multer, item_controller.update_one_item);

route.delete("/:id", auth, item_controller.delete_one_item);




module.exports = route;