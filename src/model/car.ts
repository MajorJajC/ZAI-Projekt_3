/**
 * Model class, which represent single product on table.
 */
export class Car {
  public id:number;

  constructor(
    public name: string,
    public price: number,
    public image: string,
    public description: string,
    public horsepower: number,
	  public engcap: number,
    public airconditioning: boolean
  ) {  }
}
