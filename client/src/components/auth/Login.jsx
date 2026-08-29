import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ShieldUser } from "lucide-react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;

  const [showPassword, setShowPassword] = useState(false);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRememberChange = (checked) => {
    setFormLogin((prev) => ({
      ...prev,
      remember: checked,
    }));
  };

  const redirectUser = (user) => {
    if (!user) {
      setError("User data not found");
      return;
    }
    // Admin
    if (user.role === "admin") {
      navigate("/admin/dashboard");
      return;
    }

    // Client
    if (user.role === "client") {
      if (!user.profileCompleted) {
        navigate("/complete-profile-client");
        return;
      }
      navigate("/client/dashboard");
      return;
    }

    if (user.role === "freelancer") {
      if (!user.profileCompleted) {
        navigate("/complete-profile-freelancer");
        return;
      }
      navigate("/freelancer/dashboard");
      return;
    }

    setError("Invalid user role");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/login`, formLogin, {
        withCredentials: true,
      });

      console.log("Login Response:", response.data);
      console.log("Login id:", response.data.user._id);

      const user = response.data.user;

      redirectUser(user);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-15 inset-shadow-sm inset-shadow-blue-500">
      <CardHeader className="text-center">
        <ShieldUser className="mx-auto h-12 w-12" />

        <CardTitle className="font-[700] text-2xl">EliteLancer</CardTitle>

        <CardDescription>
          Secure access for high-end professionals
        </CardDescription>
      </CardHeader>

      <form className="space-y-1" onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>

              <Input
                id="email"
                name="email"
                value={formLogin.email}
                onChange={handleChange}
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

                <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-muted-foreground"
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  required
                  value={formLogin.password}
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2 pb-4">
              <Checkbox
                id="remember"
                checked={formLogin.remember}
                onCheckedChange={handleRememberChange}
              />

              <Label htmlFor="remember">Remember me for 30 days</Label>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          {/* Login Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 cursor-pointer"
          >
            {loading ? "Loading..." : "Login"}
          </Button>

          {/* Error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Divider */}
          <div className="flex items-center gap-2 w-full py-2">
            <hr className="flex-1 border-gray-300" />

            <span className="text-sm font-normal leading-none tracking-[0.25em] text-gray-400">
              OR CONTINUE WITH
            </span>

            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Login */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              // onClick={() => {
              // window.location.href = `${apiUrl}/api/auth/google`;
              // }}
              className="flex-1 py-2 px-4 text-sm font-semibold cursor-pointer bg-[#4285F4] text-white hover:bg-[#4285F4]/90"
            >
              <FaGoogle />

              <span className="hidden sm:inline">Google</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              // onClick={() => {
              //   window.location.href = `${apiUrl}/api/auth/github`;
              // }}
              className="flex-1 py-2 px-4 text-sm font-semibold cursor-pointer bg-[#24292f] text-white hover:bg-[#24292f]/90"
            >
              <FaGithub />

              <span className="hidden sm:inline">GitHub</span>
            </Button>
          </div>

          {/* Register */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
