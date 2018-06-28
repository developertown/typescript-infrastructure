import { Model } from "sequelize-typescript";
export default abstract class BaseModel<T> extends Model<T> {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
