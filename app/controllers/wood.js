import { prisma } from "../../app.js";

export const getAll = async (req, res) => {
	try {
		const woods = await prisma.wood.findMany();
		res.json(woods);
	} catch (error) {
		res.status(error.status || 500).json(error.message || "Error on getting all woods");
	}
};

export const create = async (req, res) => {
	try {
		const { datas, ...body } = req.body;
		const data = datas ? JSON.parse(datas) : body;

		const woodData = { ...data };

		if (req.file) {
			woodData.image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
		}

		const wood = await prisma.wood.create({ data: woodData });

		res.status(201).json(wood);
	} catch (error) {
		res.status(error.status || 500).json(error.message || "Error on creating wood");
	}
};

export const readByHardness = async (req, res) => {
	try {
		const woods = await prisma.wood.findMany({
			where: { hardness: req.params.hardness },
		});
		res.json(woods);
	} catch (error) {
		res.status(error.status || 500).json(error.message || "Error on getting woods by hardness");
	}
};
