import { useState } from "react";
const ControlledInputs = () => {
  const [key, setKey] = useState("");
  const [email, setEmail] = useState("");

  // const handleChange = (e) => {
  //   // for now we won't use it
  //   const name = e.target.name;
  //   const value = e.target.value;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // do something
    console.log(key, email);
    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, email }),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h4>Enter the details</h4>

      <div className="form-row">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-input"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label htmlFor="key" className="form-label">
          Key
        </label>
        <input
          type="text"
          className="form-input"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          id="key"
        />
      </div>
      <button type="submit" className="btn btn-block">
        submit
      </button>
    </form>
  );
};
export default ControlledInputs;
