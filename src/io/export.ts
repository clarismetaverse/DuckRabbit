import { writeFileSync } from "fs";
import { GraphSpace } from "../core/graphspace";

export function exportGraph(graph: GraphSpace, path: string): void {
  const payload = {
    identifications: graph.getIdentifications(),
  };
  writeFileSync(path, JSON.stringify(payload, null, 2), "utf8");
}
