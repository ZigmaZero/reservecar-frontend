import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../widgets/Navbar";
import { useUser } from "../contexts/UserContext";

const Checkout = () => {
  const { user, token } = useUser();
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState<string[]>([]);
  const navigate = useNavigate();

  if(!user || !user.verified) {
    navigate("/login");
    return null;
  }

  // Initialize job options
  useEffect(() => {
    setJobs(["Job A", "Job B", "Job C"]);
  }, []);

  // Handle submit
  const handleSubmit = () => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}: Checkout [${user.name} | ${job}]`);
    navigate("/checkout-success");
  };

  return (
    <>
    <Navbar />
    <div className="container">
      <h1>Checkout</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        
        {/* Job Selection */}
        <label htmlFor="job">เลขงาน:</label>
        <select
          id="job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        >
          <option value="">Select a job</option>
          {jobs.map((prod, index) => (
            <option key={index} value={prod}>
              {prod}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button type="submit">Checkout</button>
      </form>
    </div>
    </>
  );
};

export default Checkout;
