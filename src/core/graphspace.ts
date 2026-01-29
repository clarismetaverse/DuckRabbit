import { Identification, EntityRef, RoleRef } from "./types";

export class GraphSpace {
  private readonly identifications: Identification[] = [];

  constructor(initial: Identification[] = []) {
    this.identifications = [...initial];
  }

  addIdentification(identification: Identification): void {
    if (!this.identifications.find((item) => item.id === identification.id)) {
      this.identifications.push(identification);
    }
  }

  getIdentifications(): Identification[] {
    return [...this.identifications];
  }

  findIdentificationsByEntity(entityRef: EntityRef): Identification[] {
    return this.identifications.filter((identification) => {
      return (
        (this.isEntityRef(identification.from) &&
          this.matchEntityRef(identification.from, entityRef)) ||
        (this.isEntityRef(identification.to) &&
          this.matchEntityRef(identification.to, entityRef))
      );
    });
  }

  findIdentificationsByRole(roleRef: RoleRef): Identification[] {
    return this.identifications.filter((identification) => {
      return (
        (this.isRoleRef(identification.from) &&
          this.matchRoleRef(identification.from, roleRef)) ||
        (this.isRoleRef(identification.to) &&
          this.matchRoleRef(identification.to, roleRef))
      );
    });
  }

  findIdentifications(ref: EntityRef | RoleRef): Identification[] {
    return this.identifications.filter((identification) => {
      return (
        this.matchRef(identification.from, ref) ||
        this.matchRef(identification.to, ref)
      );
    });
  }

  private isEntityRef(ref: EntityRef | RoleRef): ref is EntityRef {
    return ref.kind === "EntityRef";
  }

  private isRoleRef(ref: EntityRef | RoleRef): ref is RoleRef {
    return ref.kind === "RoleRef";
  }

  private matchRef(a: EntityRef | RoleRef, b: EntityRef | RoleRef): boolean {
    if (this.isEntityRef(a) && this.isEntityRef(b)) {
      return this.matchEntityRef(a, b);
    }
    if (this.isRoleRef(a) && this.isRoleRef(b)) {
      return this.matchRoleRef(a, b);
    }
    return false;
  }

  private matchEntityRef(a: EntityRef, b: EntityRef): boolean {
    return a.spaceId === b.spaceId && a.entityId === b.entityId;
  }

  private matchRoleRef(a: RoleRef, b: RoleRef): boolean {
    return a.spaceId === b.spaceId && a.role === b.role;
  }
}
