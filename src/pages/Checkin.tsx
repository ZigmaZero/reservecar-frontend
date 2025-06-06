import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../widgets/Navbar";
import { useUser } from "../contexts/UserContext";
import getTeams from "../api/teams/getTeams";
import type { Car, Team } from "../api/types";
import getCarsOfTeam from "../api/cars/getCarsOfTeam";

const Checkin = () => {
  const { user, token } = useUser();
  const [description, setDescription] = useState("");
  const [cars, setCars] = useState<Car[]>([]);
  const [carId, setCarId] = useState<number | "">("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamId, setTeamId] = useState<number | "">("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.verified) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  // Initialize team options and set default selection to user's team
  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }
    getTeams(token).then((teamsList: Team[]) => {
      setTeams(teamsList);
      // Set default selection to user's teamId if present
      if (user.teamId && teamsList.some(t => t.teamId === user.teamId)) {
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
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}: [${user?.name} | carId: ${carId} | teamId: ${teamId} | ${description}]`);
    navigate("/checkin-success");
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
              <option key={t.teamId} value={t.teamId}>
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
              <option key={c.carId} value={c.carId}>
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