import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Dashboard from "./pages/Home/Dashboard";
// import Messages from "./pages/Messages";
import Messages from "./pages/chat/Messages";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import GloabalStyles from "./styles/GlobalStyles";
// import FriendsList from "./pages/FriendsList";
import Settings from "./pages/Settings";

import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProfileLayout from "./pages/profile components/ProfileLayout";
import Posts from "./pages/profile components/ProfilePosts";
import Saved from "./pages/Saved";
import SuggestedUsers from "./pages/SuggestedUsers/SuggestedUsers";
import ProtectedRoute from "./ui/ProtectedRoute";
import CreatePost from "./pages/Search";
import useAuthStore from "./store/authStore";
import Following from "./pages/profile components/Following";
import Followers from "./pages/profile components/Followers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
function App() {
  const authUser = useAuthStore((state) => state.user);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GloabalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                authUser ? (
                  <Navigate replace to="/dashboard" />
                ) : (
                  <Navigate replace to="/login" />
                )
              }
            />
            <Route path="dashboard" element={<Dashboard />} />
            {/* <Route path="create" element={<Notification />} /> */}
            <Route path="search" element={<CreatePost />} />
            <Route path="messages" element={<Messages />} />
            <Route path="saved" element={<Saved />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
            <Route path="suggested" element={<SuggestedUsers />} />
            <Route path="/:username" element={<ProfileLayout />}>
              <Route index element={<Navigate replace to="posts" />} />
              <Route path="posts" element={<Posts />} />
              <Route path="following" element={<Following/>} />
              <Route path="followers" element={<Followers/>} />
            </Route>
          </Route>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

