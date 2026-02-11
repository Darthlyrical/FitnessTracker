import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activities }) {
  const { token } = useAuth();




  async function tryDelete(){
    

      await deleteActivity(token, activities.id )


  if (!token) {
    return <p>You must be logged in to view activities.</p>;
  }
  
  return (
    <ul>
      {activities.map((activity) => (
        <>
        <li key={activity.id}>
        <p>{activity.name}</p>
        {token && <button onClick={tryDelete}>Delete</button>}
        </li>
        </>
            
      ))}
    </ul>
  );
}
