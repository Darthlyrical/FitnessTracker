const API = import.meta.env.VITE_API;

/** Fetches an array of activities from the API. */
export async function getActivities() {
  try {
    const response = await fetch(API + "/activities");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function  deleteActivity(token,id){
  if(!token){
    throw Error('You must be signed it to delete activites.')
  }
  try{
    const res = await fetch(API + 'activities/'+ id,{
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer' + token
      }
    });
    if(!res.ok){
      const result = await res.json();
      throw Error(result.message)
    }
    

  }catch(e){
    console.log(e);
    return [];

  }
}



/**
 * Sends a new activity to the API to be created.
 * A valid token is required.
 */
export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  const response = await fetch(API + "/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(activity),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
