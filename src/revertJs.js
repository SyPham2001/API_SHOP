const mongoose = require("mongoose")
const Product = require("./models/ProductModel") // chỉnh đúng path đến model của bạn
mongoose.set("strictQuery", true)

const MONGO_URI =
  "mongodb+srv://phamvansy112:phamvansy123@cluster0.o3qki.mongodb.net/"

async function revertImages() {
  await mongoose.connect(MONGO_URI)

  const products = await Product.find({})
  console.log(`🔍 Found ${products.length} products`)

  for (const product of products) {
    // Nếu image là mảng, revert về string (lấy url đầu tiên)
    if (Array.isArray(product.image) && product.image.length > 0) {
      // Trường hợp image là [{url: ...}], revert về string
      if (typeof product.image[0] === "object" && product.image[0].url) {
        product.image = product.image[0].url
        await product.save()
        console.log(`Reverted product ${product._id}`)
      }
    }
  }

  await mongoose.disconnect()
  console.log("✅ All done revert!")
}

revertImages().catch(console.error)
