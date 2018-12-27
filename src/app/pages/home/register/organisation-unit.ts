export class OrganisationUnit {
  constructor(
    public id: string,
    public name: string,
    public shortName: string,
    public code: string,
    public description: string,
    public openingDate: string,
    public closedDate: string,
    public comment: string,
    public contactPerson: string,
    public phone: string,
    public address: string,
    public latitute: number,
    public longitude: number,
    public dataSets: any,
    public programs: any,
    public services: any,
  ) {  }
}
