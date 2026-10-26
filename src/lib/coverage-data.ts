import { FeatureCollection, Polygon } from "geojson";

// 5 Zones from original KML/map-coverage.tsx
// With specific colors:
// AIRE zones: Blue tones
// FIBRA zone: Green tone
export const COVERAGE_GEOJSON: FeatureCollection<Polygon> = {
  type: "FeatureCollection",
  features: [
    // Zona 1: Aire (Barrio Las Victorias / Este aprox)
    {
      type: "Feature",
      properties: { name: "Cobertura Aire 1", type: "aire", color: "#3b82f6" }, // Blue-500
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.300364, -41.146496],
            [-71.288673, -41.13888],
            [-71.311976, -41.136502],
            [-71.313083, -41.145009],
            [-71.300364, -41.146496],
          ],
        ],
      },
    },
    // Zona 2: Aire (Centro / Belgrano aprox)
    {
      type: "Feature",
      properties: { name: "Cobertura Aire 2", type: "aire", color: "#60a5fa" }, // Blue-400
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.308471, -41.149779],
            [-71.305738, -41.150086],
            [-71.304858, -41.145993],
            [-71.31309, -41.145141],
            [-71.312807, -41.146892],
            [-71.315353, -41.151482],
            [-71.31419, -41.151553],
            [-71.308471, -41.149779],
          ],
        ],
      },
    },
    // Zona 3: Aire (San Francisco / Este)
    // {
    //   type: "Feature",
    //   properties: { name: "Cobertura Aire 3", type: "aire", color: "#2563eb" }, // Blue-600
    //   geometry: {
    //     type: "Polygon",
    //     coordinates: [
    //       [
    //         [-71.26816, -41.146764],
    //         [-71.276804, -41.153021],
    //         [-71.270073, -41.157527],
    //         [-71.262344, -41.158466],
    //         [-71.252038, -41.159967],
    //         [-71.249711, -41.159028],
    //         [-71.25578, -41.142384],
    //         [-71.260765, -41.142697],
    //         [-71.26816, -41.146764],
    //       ],
    //     ],
    //   },
    // },
    // Zona: Aire (Omega, El Frutillar, Nahuel Hue y El Maitén)
    {
      type: "Feature",
      properties: { name: "Cobertura Aire Omega", type: "aire", color: "#3b82f6" }, // Blue-500
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.33945, -41.154891],
            [-71.32271, -41.154891],
            [-71.309834, -41.157996],
            [-71.306615, -41.161877],
            [-71.311121, -41.174977],
            [-71.329149, -41.174977],
            [-71.342025, -41.16964],
            [-71.343313, -41.161877],
            [-71.33945, -41.154891],
          ],
        ],
      },
    },
    // Zona 4: FIBRA OPTICA (La zona verde)
    {
      type: "Feature",
      properties: {
        name: "Zona Fibra Óptica",
        type: "fibra",
        color: "#10b981", // Emerald-500
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.321586, -41.13259],
            [-71.322358, -41.137318],
            [-71.316285, -41.139974],
            [-71.313422, -41.139393],
            [-71.311439, -41.135827],
            [-71.296681, -41.137236],
            [-71.29591, -41.13624],
            [-71.288201, -41.133834],
            [-71.321586, -41.13259],
          ],
        ],
      },
    },
    // Zona 5: Aire (Cerca de la costa)
    // {
    //   type: "Feature",
    //   properties: { name: "Cobertura Aire 4", type: "aire", color: "#93c5fd" }, // Blue-300
    //   geometry: {
    //     type: "Polygon",
    //     coordinates: [
    //       [
    //         [-71.277156, -41.135185],
    //         [-71.260591, -41.134053],
    //         [-71.258926, -41.130054],
    //         [-71.276949, -41.131014],
    //         [-71.277156, -41.135185],
    //       ],
    //     ],
    //   },
    // },
  ],
};

// Center point for initial map view (Bariloche Centro)
export const INITIAL_VIEW_STATE = {
  latitude: -41.14,
  longitude: -71.3,
  zoom: 12.5,
};
