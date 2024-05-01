import { HiArrowRightOnRectangle } from "react-icons/hi2";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogOut from "../../hooks/useLogOut";

function Logout() {
  const { handleLogout, isLoggingout,} = useLogOut();
  return (
    <div>
      <h3><button onClick={()=>handleLogout()} disabled={isLoggingout}>Logout</button></h3>
    </div>
  )
}

export default Logout
