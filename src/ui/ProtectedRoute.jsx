import styled from "styled-components";

import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import useAuthStore from "../store/authStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useAuthStore from "../store/authStore";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.user);
  const [user, loading] = useAuthState(auth);
  // console.log(user);
  // const isAuthenticated = user;

  // console.log(isAuthenticated);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/login");
      }
    },
    [isAuthenticated, navigate]
  );

  if (loading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;

// function ProtectedRoute({ children }) {
//   // const { isLoading, isAuthenticated } = useUser();/
//   const isAuthenticated = useAuthStore((state) => state.user);

//   const navigate = useNavigate();

//   useEffect(
//     function () {
//       if (!isAuthenticated && !isLoading) navigate("/login");
//     },
//     [isAuthenticated, isLoading, navigate]
//   );

//   if (isLoading)
//     return (
//       <FullPage>
//         <Spinner />;
//       </FullPage>
//     );

//   if (isAuthenticated) return children;
// }

// export default ProtectedRoute;
