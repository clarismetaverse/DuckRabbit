import { loadSpacesAndGraph } from "../io/load";
import { BlendSpace, Space } from "../core/space";

function describeSpace(space: Space | BlendSpace): string {
  const entityCount = Object.keys(space.entities).length;
  const roleNames = Object.keys(space.roles);
  const roleDetails = roleNames.length
    ? roleNames
        .map((role) => {
          const entities = space.roles[role] ?? [];
          return `${role}=[${entities.join(", ")}]`;
        })
        .join("; ")
    : "(none)";
  const blendInfo = space instanceof BlendSpace
    ? ` inputs=[${space.inputs.join(", ")}]`
    : "";

  return `Space ${space.id}${blendInfo}: entities=${entityCount}, roles=${roleDetails}`;
}

function run(): void {
  const [jsonPath] = process.argv.slice(2);
  if (!jsonPath) {
    console.error("Usage: ts-node src/examples/run_example.ts <path-to-json>");
    process.exit(1);
  }

  const { spaces, graph } = loadSpacesAndGraph(jsonPath);

  console.log(`Loaded ${spaces.size} spaces:`);
  for (const space of spaces.values()) {
    console.log(`- ${describeSpace(space)}`);
  }

  console.log(`Total identifications: ${graph.getIdentifications().length}`);
}

run();
