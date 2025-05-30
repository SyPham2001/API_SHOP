// script/updateImages.js
const mongoose = require("mongoose")
const Product = require("./models/ProductModel") // chỉnh đúng path đến model của bạn
mongoose.set("strictQuery", true)

const MONGO_URI =
  "mongodb+srv://phamvansy112:phamvansy123@cluster0.o3qki.mongodb.net/"

async function updateImages() {
  await mongoose.connect(MONGO_URI)

  const products = await Product.find({})
  console.log(`🔍 Found ${products.length} products`)

  for (const product of products) {
    if (typeof product.image === "string") {
      product.image = [
        {
          url: product.image,
          alt: product.name || "", // hoặc null
        },
      ]
      await product.save()
      console.log(`Updated product ${product._id}`)
    }
  }

  await mongoose.disconnect()
  console.log("✅ All done!")
}

updateImages().catch(console.error)
