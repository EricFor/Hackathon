"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Category_1 = __importDefault(require("../../entities/Category"));
const Goal_1 = __importDefault(require("../../entities/Goal"));
const User_1 = __importDefault(require("../../entities/User"));
const authenticate_1 = __importDefault(require("../../middlewares/authenticate"));
const UserRouter = (0, express_1.Router)();
UserRouter.use(authenticate_1.default);
UserRouter.get('/me', async (req, res) => {
    const id = req.userId;
    if (!id)
        return;
    const user = await User_1.default.findOne({
        where: {
            id,
        },
        relations: ['categories'],
    });
    if (!user)
        return res.status(404).send({ error: 'Invalid user. ' });
    res.status(200).send(user.toJson());
});
UserRouter.get('/categories', async (req, res) => {
    const id = req.userId;
    if (!id)
        return;
    const user = await User_1.default.findOne({
        where: {
            id,
        },
        relations: ['categories'],
    });
    if (!user)
        return res.status(404).send({ error: 'Invalid user. ' });
    res.status(200).send(user.categories.map((e) => e.toJson()));
});
UserRouter.get('/category', async (req, res) => {
    const categoryId = req.query.id;
    if (typeof categoryId !== 'string')
        return;
    const category = await Category_1.default.findOne({
        where: {
            id: parseInt(categoryId),
        },
        relations: ['owner', 'goals'],
    });
    if (!category)
        return res.status(404).send({ error: 'Invalid category. ' });
    const id = req.userId;
    if (category.owner.id !== id)
        return res.status(403).send({ error: 'No ownership of category. ' });
    return res.status(200).send(category.toJson());
});
UserRouter.post('/category/create', async (req, res) => {
    const id = req.userId;
    const { name } = req.body;
    const user = await User_1.default.findOne({
        where: {
            id,
        },
    });
    if (!user)
        return res.status(404).send({ error: 'Invalid user. ' });
    const category = Category_1.default.create({
        name,
        owner: user,
        goals: [],
    });
    await user.save();
    await category.save();
    return res.status(200).send({ message: `Successfully created category, ${name}` });
});
UserRouter.post('/category/delete', async (req, res) => {
    const userId = req.userId;
    const { id } = req.body;
    const user = await User_1.default.findOne({
        where: {
            id: userId,
        },
    });
    if (!user)
        return res.status(404).send({ error: 'Invalid user. ' });
    const category = await Category_1.default.findOne({
        where: {
            id,
        },
    });
    category?.remove();
    return res.status(200).send({ message: `Successfully deleted category with id, ${id}` });
});
UserRouter.post('/category/createGoal', async (req, res) => {
    const userId = req.userId;
    const { name, description, categoryId } = req.body;
    const user = await User_1.default.findOne({
        where: {
            id: userId,
        },
    });
    if (!user)
        return res.status(404).send({ error: 'Invalid user. ' });
    const category = await Category_1.default.findOne({
        where: {
            id: categoryId,
        },
    });
    if (!category)
        return res.status(404).send({ error: 'Category does not exist. ' });
    const goal = Goal_1.default.create({
        name,
        description,
        parentCategory: category,
        parentGoal: undefined,
        goals: [],
    });
    await goal.save();
    await category.save();
    const test = await Goal_1.default.findOne({
        where: {
            name,
        },
    });
    return res.status(200).send({ message: 'Goal successfully created. ' });
});
UserRouter.post('/category/removeGoal', async (req, res) => {
    const userId = req.userId;
    const { goalId } = req.body;
    const user = await User_1.default.findOne({
        where: {
            id: userId,
        },
    });
    if (!user)
        return res.status(404).send({ error: 'Invalid user. ' });
    const goal = await Goal_1.default.findOne({
        where: {
            id: goalId,
        },
    });
    if (!goal)
        return res.status(404).send({ error: 'Goal does not exist. ' });
    await goal.remove();
    return res.status(200).send({ message: 'Goal successfully removed. ' });
});
UserRouter.post('/goals/createSubgoal', async (req, res) => {
    const userId = req.userId;
    const { name, description, goalId } = req.body;
    const user = await User_1.default.findOne({
        where: {
            id: userId,
        },
    });
    if (!user)
        return res.status(404).send({ error: 'Invalid user. ' });
    const goal = await Goal_1.default.findOne({
        where: {
            id: goalId,
        },
    });
    if (!goal)
        return res.status(404).send({ error: 'Goal does not exist. ' });
    const subGoal = Goal_1.default.create({
        name,
        description,
        parentCategory: undefined,
        parentGoal: goal,
        goals: [],
    });
    await subGoal.save();
    return res.status(200).send({ message: 'Subgoal successfully created. ' });
});
UserRouter.get('/goal', async (req, res) => {
    const goalId = req.query.goalId;
    if (typeof goalId !== 'string')
        return;
    const goal = await Goal_1.default.findOne({
        where: {
            id: parseInt(goalId),
        },
        relations: ['goals'],
    });
    if (!goal)
        return res.status(404).send({ error: 'Goal does not exist. ' });
    return res.status(200).send(goal.toJson());
});
exports.default = UserRouter;
