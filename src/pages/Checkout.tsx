import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [fullName, setFullName] = useState("");
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState<string[]>([]);
  const navigate = useNavigate();

  // Initialize job options
  useEffect(() => {
    setJobs(["Job A", "Job B", "Job C"]);
  }, []);

  // Handle submit
  const handleSubmit = () => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}: Checkout [${fullName} | ${job}]`);
    navigate("/checkout-success");
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Full Name */}
        <label htmlFor="fullName">ชื่อ-นามสกุล:</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />

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
  );
};

export default Checkout;
