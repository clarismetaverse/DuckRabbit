import { readFileSync } from "fs";
import { BlendSpace, Space } from "../core/space";
import { GraphSpace } from "../core/graphspace";
import { Identification } from "../core/types";

type SpaceLike = {
  id: string;
  entities?: Space["entities"];
  roles?: Space["roles"];
  metadata?: unknown;
  inputs?: string[];
};

type LoadPayload = {
  spaces?: Record<string, SpaceLike> | SpaceLike[];
  graph?: { identifications?: Identification[] };
};

export function loadSpacesAndGraph(jsonPath: string): {
  spaces: Map<string, Space | BlendSpace>;
  graph: GraphSpace;
} {
  const raw = readFileSync(jsonPath, "utf8");
  const payload = JSON.parse(raw) as LoadPayload;
  const spaces = new Map<string, Space | BlendSpace>();
  const spaceEntries: SpaceLike[] = Array.isArray(payload.spaces)
    ? payload.spaces
    : payload.spaces
      ? Object.values(payload.spaces)
      : [];

  for (const entry of spaceEntries) {
    if (!entry.id) {
      continue;
    }
    const space = entry.inputs
      ? new BlendSpace({
          id: entry.id,
          inputs: entry.inputs,
          entities: entry.entities,
          roles: entry.roles,
          metadata: entry.metadata,
        })
      : new Space({
          id: entry.id,
          entities: entry.entities,
          roles: entry.roles,
          metadata: entry.metadata,
        });
    spaces.set(space.id, space);
  }

  const identifications = payload.graph?.identifications ?? [];
  const graph = new GraphSpace(identifications);

  return { spaces, graph };
}
