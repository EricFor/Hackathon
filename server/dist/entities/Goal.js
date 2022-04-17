"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Goal_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Category_1 = __importDefault(require("./Category"));
let Goal = Goal_1 = class Goal extends typeorm_1.BaseEntity {
    id;
    name;
    description;
    parentCategory;
    parentGoal;
    goals;
    toJson() {
        return {
            id: this.id,
            name: this.name,
            description: this.description || '',
            goals: this.goals?.map((e) => e.toJson()),
        };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Goal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Goal.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Goal.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.default, (category) => category.goals, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Category_1.default)
], Goal.prototype, "parentCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Goal_1, (goal) => goal.goals, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Goal)
], Goal.prototype, "parentGoal", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Goal_1, (goal) => goal.parentGoal),
    __metadata("design:type", Array)
], Goal.prototype, "goals", void 0);
Goal = Goal_1 = __decorate([
    (0, typeorm_1.Entity)()
], Goal);
exports.default = Goal;
