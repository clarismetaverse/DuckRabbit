import { Identification, EntityRef, RoleRef } from "./types";

export class GraphSpace {
  private readonly identifications: Identification[] = [];

  constructor(initial: Identification[] = []) {
    this.identifications = [...initial];
  }

  addIdentification(identification: Identification): void {
    this.identifications.push(identification);
  }

  getIdentifications(): Identification[] {
    return [...this.identifications];
  }

  findIdentificationsByEntity(entityRef: EntityRef): Identification[] {
    return this.identifications.filter((identification) => {
      return (
        this.isEntityRef(identification.from) &&
        this.matchEntityRef(identification.from, entityRef)
      ) ||
        (this.isEntityRef(identification.to) &&
          this.matchEntityRef(identification.to, entityRef));
    });
  }

  findIdentificationsByRole(roleRef: RoleRef): Identification[] {
    return this.identifications.filter((identification) => {
      return (
        this.isRoleRef(identification.from) &&
        this.matchRoleRef(identification.from, roleRef)
      ) ||
        (this.isRoleRef(identification.to) &&
          this.matchRoleRef(identification.to, roleRef));
    });
  }

  private isEntityRef(ref: EntityRef | RoleRef): ref is EntityRef {
    return (ref as EntityRef).entityId !== undefined;
  }

  private isRoleRef(ref: EntityRef | RoleRef): ref is RoleRef {
    return (ref as RoleRef).role !== undefined;
  }

  private matchEntityRef(a: EntityRef, b: EntityRef): boolean {
    return a.spaceId === b.spaceId && a.entityId === b.entityId;
  }

  private matchRoleRef(a: RoleRef, b: RoleRef): boolean {
    return a.spaceId === b.spaceId && a.role === b.role;
  }
}
