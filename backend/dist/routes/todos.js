"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get("/", async (_req, res) => {
    try {
        const [todos, categories] = await Promise.all([
            prisma.todo.findMany({
                include: {
                    category: true,
                },
            }),
            prisma.category.findMany(),
        ]);
        res.json({ todos, categories });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch todos and categories" });
    }
});
router.post("/", async (req, res) => {
    try {
        const { title, categoryId } = req.body;
        const todo = await prisma.todo.create({
            data: {
                title,
                categoryId,
            },
            include: {
                category: true,
            },
        });
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create todo" });
    }
});
router.patch("/:id/toggle", async (req, res) => {
    try {
        const { id } = req.params;
        const existingTodo = await prisma.todo.findUnique({
            where: { id },
        });
        if (!existingTodo) {
            return res.status(404).json({
                error: "Todo not found",
            });
        }
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: {
                completed: !existingTodo.completed,
            },
            include: {
                category: {
                    select: {
                        name: true,
                        color: true,
                    },
                },
            },
        });
        return res.json(updatedTodo);
    }
    catch (error) {
        console.error("Error toggling todo:", error);
        return res.status(500).json({
            error: "Failed to toggle todo completion status",
        });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.todo.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete todo" });
    }
});
router.post("/init-categories", async (_req, res) => {
    try {
        const defaultCategories = [
            { name: "Personal", color: "bg-violet-200" },
            { name: "Work", color: "bg-teal-200" },
            { name: "Shopping", color: "bg-yellow-200" },
            { name: "Health", color: "bg-cyan-200" },
        ];
        const categories = await Promise.all(defaultCategories.map(async (category) => {
            return prisma.category.upsert({
                where: {
                    name: category.name,
                },
                update: {
                    color: category.color,
                },
                create: {
                    name: category.name,
                    color: category.color,
                },
            });
        }));
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to initialize categories" });
    }
});
exports.default = router;
//# sourceMappingURL=todos.js.map