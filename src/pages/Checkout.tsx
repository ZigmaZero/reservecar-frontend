import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../widgets/Navbar";
import { useUser } from "../contexts/UserContext";
import getJobsOfUser from "../api/reservations/getJobsOfUser";
import type { Reservation } from "../api/types";
import userCheckout from "../api/userCheckout";

const Checkout = () => {
  const { user, token } = useUser();
  const [jobId, setJobId] = useState<number | "">("");
  const [jobs, setJobs] = useState<Reservation[]>([]);
  const navigate = useNavigate();

  // Initialize job options
  useEffect(() => {
    if(!user || !user.verified || !token) {
      navigate("/login");
      return;
    }
    getJobsOfUser(token)
      .then((jobsList) => {
        setJobs(jobsList);
      })
  }, []);

  // Handle submit
  const handleSubmit = () => {
    if (!token) {
      alert("You must be logged in to checkout.");
      return;
    }
    userCheckout(jobId as number, token)
      .then(() => {
        navigate("/checkout-success");
      }
      )
      .catch((error) => {
        console.error("Checkout error:", error);
        alert("An error occurred during checkout. Please try again later.");
      }
      );
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
          value={jobId}
          onChange={(e) => setJobId(Number(e.target.value))}
          required
        >
          <option value="">Select a job</option>
          {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.carId} @ {j.checkinTime}
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
