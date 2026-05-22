const jsonServer = require('json-server')

const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.get('/products', (req, res) => {
  const db = router.db
  let products = db.get('products').value()

  const { search, status, stock_status, page = 1, per_page = 10 } = req.query

  // SEARCH
  if (search) {
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()),
    )
  }

  // STATUS
  if (status === 'active') {
    products = products.filter((p) => p.is_active)
  }

  if (status === 'inactive') {
    products = products.filter((p) => !p.is_active)
  }

  // STOCK STATUS
  if (stock_status === 'in_stock') {
    products = products.filter((p) => p.stock_quantity > 0)
  }

  if (stock_status === 'out_of_stock') {
    products = products.filter((p) => p.stock_quantity === 0)
  }

  // PAGINATION
  const currentPage = Number(page)
  const perPage = Number(per_page)

  const start = (currentPage - 1) * perPage
  const end = start + perPage

  const paginated = products.slice(start, end)

  res.json({
    data: paginated,
    meta: {
      current_page: currentPage,
      last_page: Math.ceil(products.length / perPage),
      total: products.length,
    },
  })
})

server.patch('/products/:id/stock', (req, res) => {
  const db = router.db

  const product = db
    .get('products')
    .find({ id: Number(req.params.id) })
    .value()

  if (!product) {
    return res.status(404).json({
      message: 'Product not found',
    })
  }

  db.get('products')
    .find({ id: Number(req.params.id) })
    .assign({
      stock_quantity: req.body.stock_quantity,
      updated_at: new Date().toISOString(),
    })
    .write()

  res.json({
    success: true,
  })
})

server.listen(3001, () => {
  console.log('Mock API running on port 3001')
})
