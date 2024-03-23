export class TodoTask {
  public id?: number;
  public title: string;
  public description: string;
  public dueDate: string;
  public category: string;
  public isDeleted?: boolean;
  public created?: string;
  public updated?: string;

  constructor(
    title: string,
    description: string,
    dueDate: string,
    category: string,
    id?: number,
    isDeleted?: boolean,
    created?: string,
    updated?: string
  ) {
    this.id = id;
    this.title = title;
    this.description =description;
    this.dueDate = dueDate;
    this.category = category;
    this.isDeleted = isDeleted;
    this.created = created;
    this.updated = updated;
  }
}
