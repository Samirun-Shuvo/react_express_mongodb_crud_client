import { Link, useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const handleUserAdd = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          alert("User Added Successfully!!!");
          e.target.reset(); // Reset form fields
          navigate("/");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <div>
        <h2>Please Add A User!!</h2>
        <form onSubmit={handleUserAdd}>
          <input type="text" name="name" placeholder="Name" required />
          <br />
          <input type="email" name="email" placeholder="Email" required />
          <br />
          <input type="submit" value="Submit" />
        </form>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default AddUser;
