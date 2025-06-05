import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkin = () => {
  const [fullName, setFullName] = useState("");
  const [car, setCar] = useState("");
  const [description, setDescription] = useState("");
  const [cars, setCars] = useState<string[]>([]);
  const navigate = useNavigate();

  // Initialize car options
  useEffect(() => {
    setCars(["Car A", "Car B", "Car C"]);
  }, []);

  // Handle submit
  const handleSubmit = () => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}: [${fullName} | ${car} | ${description}]`);
    navigate("/checkin-success");
  };

  return (
    <div className="container">
      <h1>Checkin</h1>
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

        {/* Car Selection */}
        <label htmlFor="car">เลขทะเบียนรถ:</label>
        <select
          id="car"
          value={car}
          onChange={(e) => setCar(e.target.value)}
          required
        >
          <option value="">Select a car</option>
          {cars.map((prod, index) => (
            <option key={index} value={prod}>
              {prod}
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
  );
};

export default Checkin;
