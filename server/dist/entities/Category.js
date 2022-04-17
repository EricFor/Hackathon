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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Goal_1 = __importDefault(require("./Goal"));
const User_1 = __importDefault(require("./User"));
let Category = class Category extends typeorm_1.BaseEntity {
    id;
    owner;
    name;
    goals;
    toJson() {
        return {
            id: this.id,
            name: this.name,
            goals: this.goals?.map((e) => e.toJson()),
        };
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.default, (u) => u.categories),
    __metadata("design:type", User_1.default)
], Category.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Goal_1.default, (goal) => goal.parentCategory),
    __metadata("design:type", Array)
], Category.prototype, "goals", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)()
], Category);
exports.default = Category;
