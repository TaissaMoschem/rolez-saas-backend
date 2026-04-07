const { Router } = require("express");

const { health } = require("../controllers/health.controller");
const {
  listarMesas,
  criarMesa,
  atualizarStatusMesa,
  listarMesasDisponiveis,
  buscarMesaPorId,
} = require("../controllers/mesas.controller");

const { criarPedido } = require("../controllers/pedidos.controller");

const router = Router();

// health check
router.get("/health", health);

// mesas
router.get("/mesas", listarMesas);
router.get("/mesas/disponiveis", listarMesasDisponiveis);
router.get("/mesas/:id", buscarMesaPorId);
router.post("/mesas", criarMesa);
router.patch("/mesas/:id/status", atualizarStatusMesa);

module.exports = router;
