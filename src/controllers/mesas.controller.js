const prisma = require("../lib/prisma");

// GET /mesas
async function listarMesas(req, res) {
  try {
    const mesas = await prisma.mesas.findMany({
      orderBy: { numero: "asc" },
    });

    return res.json(mesas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar mesas" });
  }
}

// POST /mesas
async function criarMesa(req, res) {
  try {
    const { numero } = req.body;

    const mesa = await prisma.mesas.create({
      data: { numero },
    });

    return res.status(201).json(mesa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar mesa" });
  }
}

// PATCH /mesas/:id/status
async function atualizarStatusMesa(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const statusPermitidos = ["livre", "ocupada", "fechada"];

    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({
        error: "Status inválido. Use: livre, ocupada ou fechada",
      });
    }

    const mesa = await prisma.mesas.update({
      where: { id: Number(id) },
      data: { status },
    });

    return res.json(mesa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar status da mesa" });
  }
}

// GET /mesas/disponiveis
async function listarMesasDisponiveis(req, res) {
  try {
    const mesas = await prisma.mesas.findMany({
      where: { status: "livre" },
      orderBy: { numero: "asc" },
    });

    return res.json(mesas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao listar mesas disponíveis" });
  }
}

// GET /mesas/:id
async function buscarMesaPorId(req, res) {
  try {
    const { id } = req.params;

    const mesa = await prisma.mesas.findUnique({
      where: { id: Number(id) },
    });

    if (!mesa) {
      return res.status(404).json({ error: "Mesa não encontrada" });
    }

    return res.json(mesa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar mesa" });
  }
}

module.exports = {
  listarMesas,
  criarMesa,
  atualizarStatusMesa,
  listarMesasDisponiveis,
  buscarMesaPorId,
};
