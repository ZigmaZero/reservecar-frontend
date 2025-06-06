import { useEffect } from "react";
import { useAdmin } from "../../contexts/AdminContext";
import { useNavigate } from "react-router-dom";

const Forbidden = () => {
    const { admin } = useAdmin();
    const navigate = useNavigate();

    useEffect(() => {
        if(admin) {
            navigate("/admin/dashboard");
        }
    })

    return (
        <div className="container forbidden">
            <h1>403 - Forbidden</h1>
        </div>
    )
}
export default Forbidden;