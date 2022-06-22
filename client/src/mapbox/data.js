export const initViewport = {
  latitude: 49.19,
  longitude: -123.17,
  zoom: 10,
};

export const geojson = {
  type: "FeatureCollection",
  lineMetrics: true,
  features: [],
};

export const drawStyle = {
  position: "top-right",
  displayControlsDefault: false,
  controls: {
    line_string: true,
    trash: true,
  },
  defaultMode: "draw_line_string",
  styles: [
    {
      id: "gl-draw-line",
      type: "line",
      filter: ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#438EE4",
        "line-dasharray": [1, 2],
        "line-width": 4,
        "line-opacity": 0.7,
      },
    },
    {
      id: "gl-draw-polygon-and-line-vertex-halo-active",
      type: "circle",
      filter: [
        "all",
        ["==", "meta", "vertex"],
        ["==", "$type", "Point"],
        ["!=", "mode", "static"],
      ],
      paint: {
        "circle-radius": 12,
        "circle-color": "#FFF",
      },
    },
    {
      id: "gl-draw-polygon-and-line-vertex-active",
      type: "circle",
      filter: [
        "all",
        ["==", "meta", "vertex"],
        ["==", "$type", "Point"],
        ["!=", "mode", "static"],
      ],
      paint: {
        "circle-radius": 8,
        "circle-color": "#438EE4",
      },
    },
  ],
};

export const drawStyleDisable = {
  position: "top-right",
  displayControlsDefault: false,
  controls: {
    line_string: false,
    trash: false,
  },
  styles: [
    {
      id: "gl-draw-line",
      type: "line",
      filter: ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#438EE4",
        "line-dasharray": [1, 2],
        "line-width": 4,
        "line-opacity": 0.7,
      },
    },
    {
      id: "gl-draw-polygon-and-line-vertex-halo-active",
      type: "circle",
      filter: [
        "all",
        ["==", "meta", "vertex"],
        ["==", "$type", "Point"],
        ["!=", "mode", "static"],
      ],
      paint: {
        "circle-radius": 12,
        "circle-color": "#FFF",
      },
    },
    {
      id: "gl-draw-polygon-and-line-vertex-active",
      type: "circle",
      filter: [
        "all",
        ["==", "meta", "vertex"],
        ["==", "$type", "Point"],
        ["!=", "mode", "static"],
      ],
      paint: {
        "circle-radius": 8,
        "circle-color": "#438EE4",
      },
    },
  ],
};



export const layerStyle = {
  id: "route",
  type: "line",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#ffda6c",
    "line-width": 8,
    "line-opacity": 0.8,
  },
};



export const layerStyleRoute = {
  id: "route_optmize",
  type: "line",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "#03AA46",
    "line-width": 8,
    "line-opacity": 0.8,
  },
};

export const geocoderSetting = {
  mapboxAccessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  limit: 5,
  countries: "ca",
  language: "en",
  autocomplete: true,
};

export const featureType = {
    id: "id",
    type: "Feature",
    properties: {},
    geometry: {
      coordinates: [],
      type: "LineString",
    },
  };
