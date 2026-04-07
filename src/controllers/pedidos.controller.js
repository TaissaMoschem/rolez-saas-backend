const prisma = require("../lib/prisma");

// POST /pedidos
// body: { "mesa_id": 1 }
async function criarPedido(req, res) {
  try {
    const { mesa_id } = req.body;

    if (!mesa_id) {
      return res.status(400).json({ error: "mesa_id é obrigatório" });
    }

    // 1) Verifica se a mesa existe
    const mesa = await prisma.mesas.findUnique({
      where: { id: Number(mesa_id) },
    });

    if (!mesa) {
      return res.status(404).json({ error: "Mesa não encontrada" });
    }

    // 2) Só deixa criar pedido se estiver livre
    if (mesa.status !== "livre") {
      return res.status(400).json({
        error: `Mesa não está livre (status atual: ${mesa.status})`,
      });
    }

    // 3) Cria o pedido
    const pedido = await prisma.pedidos.create({
      data: {
        mesa_id: Number(mesa_id),
        status: "aberto",
      },
    });

    // 4) Atualiza mesa para ocupada
    await prisma.mesas.update({
      where: { id: Number(mesa_id) },
      data: { status: "ocupada" },
    });

    return res.status(201).json(pedido);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar pedido" });
  }
}

module.exports = {
  criarPedido,
};