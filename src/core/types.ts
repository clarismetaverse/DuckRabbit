export interface Point {
  label: string;
}

export interface Segment {
  a: string;
  b: string;
  oriented?: boolean;
}

export interface Ray {
  origin: string;
  through: string;
}

export interface Angle {
  a: string;
  v: string;
  c: string;
}

export interface Triangle {
  order: [string, string, string];
}

export interface Role {
  name: string;
}

export type Entity =
  | { kind: "Point"; data: Point }
  | { kind: "Segment"; data: Segment }
  | { kind: "Ray"; data: Ray }
  | { kind: "Angle"; data: Angle }
  | { kind: "Triangle"; data: Triangle };

export interface EntityRef {
  spaceId: string;
  entityId: string;
}

export interface RoleRef {
  spaceId: string;
  role: string;
}

export interface Identification {
  id: string;
  type: "e2e" | "r2r" | "e2r";
  from: EntityRef | RoleRef;
  to: EntityRef | RoleRef;
  reason?: string;
}
