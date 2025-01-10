import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Define interfaces for request parameters and body
interface TodoParams {
  id: string;
}

interface CreateTodoBody {
  title: string;
  categoryId: string;
}

// Check if server and database are running
router.get("/check", (_req: Request, res: Response) => {
  const categoryount = prisma.category.count();
  if (categoryount) {
    console.log("categories count: ", categoryount);
  }
  res.send("Server and Database are running");
});

// Get all todos and categories
router.get("/", async (_req: Request, res: Response) => {
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
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos and categories" });
  }
});

// Add new todo
router.post(
  "/",
  async (req: Request<{}, {}, CreateTodoBody>, res: Response) => {
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
    } catch (error) {
      res.status(500).json({ error: "Failed to create todo" });
    }
  }
);

// Toggle todo completion status
// @ts-ignore
router.patch("/:id/toggle", async (req: any, res: Response) => {
  try {
    // Validate the ID parameter
    const { id } = req.params;

    // Find the existing todo
    const existingTodo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!existingTodo) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }

    // Update the todo by toggling the completed status
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        completed: !existingTodo.completed,
      },
      // Include the related category in the response
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
  } catch (error) {
    console.error("Error toggling todo:", error);
    return res.status(500).json({
      error: "Failed to toggle todo completion status",
    });
  }
});

// Delete todo
router.delete("/:id", async (req: Request<TodoParams>, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.todo.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Initialize default categories if they don't exist
router.post("/init-categories", async (_req: Request, res: Response) => {
  try {
    const defaultCategories = [
      { name: "Personal", color: "bg-violet-200" },
      { name: "Work", color: "bg-teal-200" },
      { name: "Shopping", color: "bg-yellow-200" },
      { name: "Health", color: "bg-cyan-200" },
    ];

    const categories = await Promise.all(
      defaultCategories.map(async (category) => {
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
      })
    );

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to initialize categories" });
  }
});

export default router;
