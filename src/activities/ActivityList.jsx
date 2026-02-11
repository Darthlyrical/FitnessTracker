import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activities, syncActivities  }) {
  const { token } = useAuth();

 
  if (!token) {
    return <p>You must be logged in to view activities.</p>;
  }


  async function tryDelete(id) {
    try {
      await deleteActivity(token, id);
      console.log("Activity deleted:", id);
      // Ideally you'd also refresh state here
    } catch (err) {
      console.error("Failed to delete activity:", err);
    }
    syncActivities(); 
  }
  
  return (
    <ul>
      {activities.map((activity) => (
        <>
        <li key={activity.id}>
        <p>{activity.name}</p>
        {token && <button onClick={tryDelete(activity.id)}>Delete</button>}
        </li>
        </>
            
      ))}
    </ul>
  );
}
