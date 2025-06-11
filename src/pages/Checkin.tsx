import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../widgets/Navbar";
import { useUser } from "../contexts/UserContext";
import getTeams from "../api/teams/getTeams";
import type { CarExternal, TeamExternal } from "../api/externalTypes";
import getCarsOfTeam from "../api/cars/getCarsOfTeam";
import userCheckin from "../api/user/userCheckin";

const Checkin = () => {
  const { user, token } = useUser();
  const [description, setDescription] = useState<string>("");
  const [cars, setCars] = useState<CarExternal[]>([]);
  const [carId, setCarId] = useState<number | "">("");
  const [teams, setTeams] = useState<TeamExternal[]>([]);
  const [teamId, setTeamId] = useState<number | "">("");
  const navigate = useNavigate();

  // Initialize team options and set default selection to user's team
  useEffect(() => {
    if (!user || !user.verified || !token) {
      navigate("/login?action=checkin");
      return;
    }
    getTeams(token).then((teamsList: TeamExternal[]) => {
      setTeams(teamsList);
      // Set default selection to user's teamId if present
      if (user.teamId && teamsList.some(t => t.id === user.teamId)) {
        setTeamId(user.teamId);
      } else {
        setTeamId("");
      }
    });
  }, [token, navigate]);

  // When the teamId changes, update the car options
  useEffect(() => {
    if (teamId && token) {
      getCarsOfTeam(teamId, token)
        .then((carsList) => {
          setCars(carsList);
        }).catch((error) => {
          console.error("Error fetching cars:", error);
          setCars([]); // Clear car options on error
          alert("Failed to load cars. Please try again later.");
        });
      
      setCarId(""); // Reset car selection
    } else {
      setCars([]); // Clear car options if no team is selected
      setCarId(""); // Reset car selection
    }
  }
  , [token, teamId]);

  // Handle submit
  const handleSubmit = () => {
    
    if(!token) {
      alert("You have been logged out. Please log in again.");
      navigate("/login");
      return;
    }
    userCheckin(carId as number, description, token)
      .then(() => {
        console.log(`Checkin successful for car ID: ${carId}`);
        navigate("/checkin-success");
      }
      ).catch((error) => {
        console.error("Checkin failed:", error);
        alert("Checkin failed. Please try again later.");
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Checkin</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Team Selection */}
          <label htmlFor="team">ทีม:</label>
          <select
            id="team"
            className="mini-select"
            value={teamId}
            onChange={(e) => setTeamId(Number(e.target.value))}
            required
          >
            <option value="">Select a team</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          {/* Car Selection */}
          <label htmlFor="car">เลขทะเบียนรถ:</label>
          <select
            id="car"
            value={carId}
            onChange={(e) => setCarId(Number(e.target.value))}
            required
          >
            <option value="">Select a car</option>
            {cars.map((c) => (
              <option key={c.id} value={c.id}>
                {c.plateNumber}
              </option>
            ))}
          </select>

          {/* Description */}
          <label htmlFor="description">รายละเอียดงาน:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button type="submit">Checkin</button>
        </form>
      </div>
    </>
  );
};

export default Checkin;