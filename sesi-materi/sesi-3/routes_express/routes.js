import express from "express";

// const router = express.Router();

// router.get('/', (req, res) => {
//     res.send(' Halaman Rumah ');
// });
// router.get('/route1', (req, res) => {
//     res.send(' Halaman 1 ');
// });
// router.get('/route2', (req, res) => {
//     res.send(' Halaman 2 ');
// });
// // export default router
// export default router;

import { Home, Route1, Route2 } from "../controller/controller_express.js";
 
const router = express.Router();
 
router.get('/', Home); 
router.get('/route1', Route1);
router.get('/route2', Route2);
 
export default router;
