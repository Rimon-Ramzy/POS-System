export class Menu {
  public category: string;
  public image: string;
  public name: string;
  public price: number;

  constructor(category: string, image: string, name: string, price: number) {
    this.category = category,
      this.image = image,
      this.name = name,
      this.price = price
  }
}
