import { prisma } from "../../app.js";

const addWoodLinks = (req, wood) => {
	const baseUrl = `${req.protocol}://${req.get("host")}`;
	return {
		...wood,
		links: [
			{ rel: "self", method: "GET", href: `${baseUrl}/api/woods/${wood.id}` },
			{ rel: "sameHardness", method: "GET", href: `${baseUrl}/api/woods/${wood.hardness}` },
		],
	};
};

export const getAll = async (req, res) => {
	try {
		const woods = await prisma.wood.findMany();
		res.status(200).json(woods.map((wood) => addWoodLinks(req, wood)));
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

		res.status(201).json(addWoodLinks(req, wood));
	} catch (error) {
		res.status(error.status || 500).json(error.message || "Error on creating wood");
	}
};

export const readByHardness = async (req, res) => {
	try {
		const woods = await prisma.wood.findMany({
			where: { hardness: req.params.hardness },
		});
		res.status(200).json(woods.map((wood) => addWoodLinks(req, wood)));
	} catch (error) {
		res.status(error.status || 500).json(error.message || "Error on getting woods by hardness");
	}
};
