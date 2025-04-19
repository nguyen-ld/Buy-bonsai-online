const express = require("express");
const router = express.Router();
const uploads = require("../middlewares/uploads");

// middlewares
const { verifyToken } = require("../middlewares/auth");

//api account
const {
	createAccount,
	login,
	sendOTP,
	updatePassword,
	refreshAccessToken,
	customerInformation,
	updateCustomer,
} = require("../controllers/CustomerControlles");

// api products
const {
	addProduct,
	productLists,
	detailsProducts,
	productLimitLists,
	newPlantList,
	plantList,
	searchProducts,
} = require("../controllers/ProductsControllers");

// api category
const {
	addCategories,
	listOfCategory,
} = require("../controllers/CategoriesControllers");

// api plant
const { addPlant } = require("../controllers/PlantControllers");

// api potted plant
const { addPottedPlant } = require("../controllers/PottedPlantControllers");

// api accessory
const { addAccessory } = require("../controllers/AccessoryControllers");

// api ware-house
const { addQuantity } = require("../controllers/WareHouseControllers");

// api cart
const {
	addToCart,
	cartList,
	// updateQuantity,
	deleteItemCart,
	deleteAllItemInCart,
} = require("../controllers/CartControllers");

// api pay method
const {
	addPayMethod,
	payMethodInfo,
} = require("../controllers/PayMethodControllers");

// api shipping method
const {
	addShippingMethod,
	shippingMethodInfo,
} = require("../controllers/ShippingMethodControllers");

// api order
const { checkOut } = require("../controllers/OrderControllers");

// call api account
router.post("/create-account", createAccount);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.patch("/update-password/:id_khach_hang", updatePassword);
router.post("/refresh-access-token", refreshAccessToken);
router.get("/customer-information/:id_khach_hang", customerInformation);
router.patch("/update-customer/:id_khach_hang", updateCustomer);

// call api products
router.post("/add-products", uploads.single("hinh_anh"), addProduct);
router.get("/list-products/:id_danh_muc", productLists);
router.get("/detail-product/:id_san_pham", detailsProducts);
router.get("/product-limit-lists/:id_danh_muc", productLimitLists);
router.get("/new-plant-list", newPlantList);
router.get("/plant-list/:dac_diem", plantList);
router.post("/search-products/:ten_san_pham", searchProducts);

// call api category
router.post("/add-categories", addCategories);
router.get("/list-of-category", listOfCategory);

// call api plant
router.post("/add-plant", addPlant);

// call api ware-house
router.post("/add-quantity", addQuantity);

// call api potted-plant
router.post("/add-potted-plant", addPottedPlant);
// call api cart
router.post("/addToCart", addToCart);
router.get("/cart-list/:id_khach_hang", cartList);
// router.patch(
// 	"/update-quantity/:id_khach_hang/san_pham/:id_san_pham",
// 	updateQuantity
// );
router.delete(
	"/delete-item-cart/khach_hang/:id_khach_hang/san_pham/:id_san_pham",

	deleteItemCart
);
router.delete("/delete-all-item-cart/:id_khach_hang", deleteAllItemInCart);

// call api paymethod
router.post("/add-pay-method", addPayMethod);
router.get("/pay-method-info", payMethodInfo);

// call api shipping method
router.post("/add-shipping-method", addShippingMethod);
router.get("/shipping-method-info", shippingMethodInfo);

// call api order
router.post("/add-order", checkOut);

// call api accessory
router.post("/add-accessory", addAccessory);

module.exports = router;
