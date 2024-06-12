import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const [user, setUser] = useState({ name: '', email: '' }); // Initialize user state with empty name and email
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setUser(json.user || { name: '', email: '' }); // Fallback to empty user if none is returned
      } catch (error) {
        console.error("Fetch error:", error.message);
      }
    };

    fetchUser();
  }, [id]);

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updatedUser = { name, email };

    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/user/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      if (data.status === "success") {
        alert("User updated successfully!");
        navigate("/"); // Navigate to the home page
      } else {
        throw new Error('Failed to update the user');
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error updating user. See console for more details.");
    }
  };

  return (
    <div>
      <h2>Update User: {user.name}</h2>
      <form onSubmit={handleUserUpdate}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" defaultValue={user.name} required />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" defaultValue={user.email} required />
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;
