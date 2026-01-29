import { Entity } from "./types";

export class Space {
  readonly id: string;
  readonly entities: Record<string, Entity>;
  readonly roles: Record<string, string[]>;
  readonly metadata?: unknown;

  constructor(params: {
    id: string;
    entities?: Record<string, Entity>;
    roles?: Record<string, string[]>;
    metadata?: unknown;
  }) {
    this.id = params.id;
    this.entities = params.entities ?? {};
    this.roles = params.roles ?? {};
    this.metadata = params.metadata;
  }
}

export class BlendSpace extends Space {
  readonly inputs: string[];

  constructor(params: {
    id: string;
    inputs: string[];
    entities?: Record<string, Entity>;
    roles?: Record<string, string[]>;
    metadata?: unknown;
  }) {
    super({
      id: params.id,
      entities: params.entities,
      roles: params.roles,
      metadata: params.metadata,
    });
    this.inputs = params.inputs;
  }
}
