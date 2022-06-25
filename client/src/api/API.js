export async function fetchAllTrails() {
  try {
    const response = await fetch("/api/trails");

    if (!response.ok) {
      throw Error("Fetch failed");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
}

export async function fetchTrailsByMode(mode) {
  try {
    const response = await fetch(`/api/trails/search/mode/${mode}`);

    if (!response.ok) {
      throw Error("Fetch failed");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
}
