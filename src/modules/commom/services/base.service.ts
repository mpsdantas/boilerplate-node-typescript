import { Types } from "mongoose";
import { InstanceType, ModelType, Typegoose } from "typegoose";

export abstract class BaseService<T extends Typegoose> {
  protected model: ModelType<T>;

  constructor(model: ModelType<T>) {
    this.model = model;
  }

  async findAll(filter = {} as Partial<T>): Promise<InstanceType<T>[]> {
    return this.model.find(filter).exec();
  }

  async findOne(filter = {} as Partial<T>): Promise<InstanceType<T> | null> {
    return this.model.findOne(filter).exec();
  }

  async findById(id: string | Types.ObjectId): Promise<InstanceType<T> | null> {
    return this.model.findById(this.formatId(id)).exec();
  }

  async create(item: Partial<T>): Promise<InstanceType<T>> {
    return this.model.create(item);
  }

  async delete(id: string | Types.ObjectId): Promise<InstanceType<T> | null> {
    return this.model.findByIdAndRemove(this.formatId(id)).exec();
  }

  async update(
    id: string | Types.ObjectId,
    item: Partial<T>
  ): Promise<InstanceType<T> | null> {
    return this.model
      .findByIdAndUpdate(this.formatId(id), item, { new: true })
      .exec();
  }

  async findManyByIds(ids: Types.ObjectId[]): Promise<InstanceType<T>[]> {
    return this.model.find({ _id: { $in: ids } }).exec();
  }

  async findOneAndUpdate(
    id: string | Types.ObjectId,
    updatePayment: Partial<T>,
    newObject: boolean = true
  ): Promise<InstanceType<T> | null> {
    return this.model.findOneAndUpdate(
      { _id: this.formatId(id) },
      { $set: updatePayment },
      { new: newObject }
    );
  }

  protected formatId(id: string | Types.ObjectId): Types.ObjectId {
    return typeof id === "string" ? this.toObjectId(id) : id;
  }
  protected toObjectId(id: string): Types.ObjectId {
    return Types.ObjectId(id);
  }
}
