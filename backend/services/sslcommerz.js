/**
 * Secure SSLCommerz Payment Gateway Service
 * Rongon Luxury E-Commerce
 *
 * Implements SSLCommerz V4 API with Server-to-Server Validation and IPN verification.
 */

const getSSLCommerzConfig = () => {
  const storeId = process.env.SSLCOMMERZ_STORE_ID || "testbox";
  const storePassword = process.env.SSLCOMMERZ_STORE_PASSWORD || "qwerty";
  const isSandbox = process.env.SSLCOMMERZ_IS_SANDBOX !== "false";

  const baseUrl = isSandbox
    ? "https://sandbox.sslcommerz.com"
    : "https://securepay.sslcommerz.com";

  const backendUrl = process.env.BACKEND_URL || "http://localhost:5000";
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

  return {
    storeId,
    storePassword,
    isSandbox,
    baseUrl,
    backendUrl,
    clientUrl,
  };
};

/**
 * Initialize SSLCommerz Payment Session
 *
 * @param {Object} order - The pending order document from MongoDB
 * @returns {Promise<{success: boolean, gatewayUrl?: string, sessionKey?: string, message?: string}>}
 */
const initSSLCommerzPayment = async (order) => {
  const config = getSSLCommerzConfig();
  const initEndpoint = `${config.baseUrl}/gwprocess/v4/api.php`;

  const customer = order.customer || {};
  const postalCode = customer.postalCode || "1207";
  const city = customer.city || "Dhaka";
  const address = customer.address || "Delivery Address";

  // Build form parameters according to SSLCommerz V4 specification
  const params = new URLSearchParams();

  // Store Credentials
  params.append("store_id", config.storeId);
  params.append("store_passwd", config.storePassword);

  // Transaction & Order Details
  // Strictly enforce two decimal float string formatting
  const totalAmount = Number(order.totalAmount).toFixed(2);
  params.append("total_amount", totalAmount);
  params.append("currency", order.currency || "BDT");
  params.append("tran_id", order.orderNumber);

  // Callback & Webhook URLs
  params.append("success_url", `${config.backendUrl}/api/payment/sslcommerz/success`);
  params.append("fail_url", `${config.backendUrl}/api/payment/sslcommerz/fail`);
  params.append("cancel_url", `${config.backendUrl}/api/payment/sslcommerz/cancel`);
  params.append("ipn_url", `${config.backendUrl}/api/payment/sslcommerz/ipn`);

  // Customer Information
  params.append("cus_name", customer.name || "Valued Customer");
  params.append("cus_email", customer.email || "orders@rongon.com");
  params.append("cus_add1", address);
  params.append("cus_add2", "");
  params.append("cus_city", city);
  params.append("cus_state", city);
  params.append("cus_postcode", postalCode);
  params.append("cus_country", "Bangladesh");
  params.append("cus_phone", customer.phone || "01700000000");

  // Shipping Information
  params.append("shipping_method", "Courier");
  params.append("num_of_item", String(order.items?.length || 1));
  params.append("ship_name", customer.name || "Valued Customer");
  params.append("ship_add1", address);
  params.append("ship_city", city);
  params.append("ship_state", city);
  params.append("ship_postcode", postalCode);
  params.append("ship_country", "Bangladesh");

  // Product Information
  const productNames = (order.items || []).map((i) => i.name).slice(0, 3).join(", ") || "Luxury Apparel";
  params.append("product_name", productNames.slice(0, 150));
  params.append("product_category", "Clothing & Fashion");
  params.append("product_profile", "general");

  try {
    const response = await fetch(initEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.status === "SUCCESS" && data.GatewayPageURL) {
      return {
        success: true,
        gatewayUrl: data.GatewayPageURL,
        sessionKey: data.sessionkey,
      };
    }

    console.error("SSLCommerz Init Error Response:", data);
    return {
      success: false,
      message: data.failedreason || "Failed to initialize payment gateway",
    };
  } catch (error) {
    console.error("SSLCommerz API Network Error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

/**
 * Validate payment with SSLCommerz Order Validation API
 * CRITICAL SECURITY FUNCTION: Never trust incoming POST body alone.
 *
 * @param {string} val_id - SSLCommerz Validation ID
 * @returns {Promise<{isValid: boolean, data: Object}>}
 */
const validateSSLCommerzPayment = async (val_id) => {
  const config = getSSLCommerzConfig();
  const validatorUrl = new URL(`${config.baseUrl}/validator/api/validationserverAPI.php`);
  validatorUrl.searchParams.set("val_id", val_id);
  validatorUrl.searchParams.set("store_id", config.storeId);
  validatorUrl.searchParams.set("store_passwd", config.storePassword);
  validatorUrl.searchParams.set("v", "1");
  validatorUrl.searchParams.set("format", "json");

  try {
    const response = await fetch(validatorUrl.toString(), {
      method: "GET",
    });
    const data = await response.json();

    const isValid = data.status === "VALID" || data.status === "VALIDATED";

    return {
      isValid,
      data,
    };
  } catch (error) {
    console.error("SSLCommerz Validator API Error:", error);
    return {
      isValid: false,
      data: { error: error.message },
    };
  }
};

module.exports = {
  getSSLCommerzConfig,
  initSSLCommerzPayment,
  validateSSLCommerzPayment,
};
