export async function fetchAllTrails() {
  try {
    const response = await fetch("/api/trails/mostlike");

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

export async function fetchReviewsbyTrail(id) {
  try {
    const response = await fetch(`/api/reviews/review?trail_id=${id}`);

    if (!response.ok) {
      throw Error("Fetch failed");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
}

export async function fetchReviewsbyUser(id) {
  try {
    const response = await fetch(`/api/reviews/review?user_id=${id}`)
    if (!response.ok) {
      throw Error("Fetch failed");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("err", err);
  }
}


export async function fetchUser(id) {
  try {
    const response = await fetch(
      `/api/users/${id}`);
    if (!response.ok) {
      throw Error("Fetch failed: user infomation");
    }
    const data = await response.json();
    return data;
  }catch (err) {
    console.log("err", err);
  }
}

