import { Link } from "react-router-dom";
import { Eye, EyeOff, Check, Briefcase, UserRound } from "lucide-react";
import FooterRegister from "./FooterRegister";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
  const navigate = useNavigate();
  const [role, setRole] = useState("client");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [fromRegister, setFromRegister] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (fromRegister.password !== fromRegister.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!fromRegister.terms) {
      setError("Please accept Terms of Service");
      return;
    }
    const { confirmPassword, terms, ...userData } = fromRegister;

    const data = {
      ...userData,
      role,
    };

    try {
      if (
        !fromRegister.fullName ||
        !fromRegister.userName ||
        !fromRegister.email ||
        !fromRegister.password
      ) {
        alert("Please fill all fields");
        return;
      }
      setLoading(true);
      const response = await axios.post(
        `${SERVER_URL}/api/auth/register`,
        data,
      );

      console.log(response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFBFE] text-gray-900 min-h-screen flex flex-col">
      {/* Main */}

      <main className="flex-grow flex items-center justify-center pt-10 pb-20 px-4">
        <div className="w-full max-w-2xl">
          <div className=" bg-white/70 backdrop-blur-xl    shadow-xl  rounded-3xl p-8 md:p-12  inset-shadow-sm inset-shadow-indigo-500  ">
            <div className="text-center mb-8">
              <h1 className=" text-4xl  font-bold   mb-2  ">Join the Elite</h1>

              <p className="text-gray-500">
                Create your professional profile to start collaborating with top
                global talent.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handelSubmit}>
              {/* Role */}

              <div>
                <label className=" text-sm  font-semibold block  mb-3  ">
                  Select Your Path
                </label>

                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole("client")}
                    className={`   relative  p-6 
                      ${role === "client" ? "border-purple-700" : "border-gray-300"}
                      rounded-xl  border-2  transition `}
                  >
                    <Briefcase
                      className="  mx-auto mb-4  text-purple-700  "
                      size={45}
                    />

                    <h3 className="font-bold text-xl">I am a Client</h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Hiring the world's best freelancers.
                    </p>

                    {role === "client" && (
                      <Check className="  absolute  top-3 right-3  text-green-600  " />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("freelancer")}
                    className={`  relative   p-6  rounded-xl border-2 
                      ${role === "freelancer" ? "border-purple-700" : "border-gray-300"}
                      transition  `}
                  >
                    <UserRound
                      className="  mx-auto mb-4  text-purple-700  "
                      size={45}
                    />

                    <h3 className="font-bold text-xl">I am a Freelancer</h3>

                    <p className="text-sm text-gray-500 mt-2">
                      Working on elite global projects.
                    </p>
                    {role === "freelancer" && (
                      <Check
                        className="
            absolute
            top-3 right-3
            text-green-600
            "
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Inputs */}

              <div className="grid md:grid-cols-2 gap-4">
                {/* FullName */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>

                  <input
                    name="fullName"
                    type="text"
                    value={fromRegister.fullName}
                    onChange={(e) =>
                      setFromRegister({
                        ...fromRegister,
                        fullName: e.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                    className="  w-full   bg-gray-50  border rounded-lg  px-4 py-3 outline-none  focus:ring-2  focus:ring-purple-600  "
                  />
                </div>
                {/* UserName */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Username
                  </label>

                  <input
                    name="userName"
                    value={fromRegister.userName}
                    onChange={(e) =>
                      setFromRegister({
                        ...fromRegister,
                        userName: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="elitelancer_01"
                    className="  w-full  bg-gray-50  border  rounded-lg  px-4 py-3  outline-none  focus:ring-2  focus:ring-purple-600            "
                  />
                </div>
              </div>
              {/* email */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address
                </label>

                <input
                  name="email"
                  type="email"
                  value={fromRegister.email}
                  onChange={(e) =>
                    setFromRegister({
                      ...fromRegister,
                      email: e.target.value,
                    })
                  }
                  placeholder="name@company.com"
                  className="  w-full bg-gray-50   border   rounded-lg    px-4 py-3   outline-none   focus:ring-2   focus:ring-purple-600  "
                />
              </div>
              {/* password */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      name="password"
                      value={fromRegister.password}
                      onChange={(e) =>
                        setFromRegister({
                          ...fromRegister,
                          password: e.target.value,
                        })
                      }
                      type={showPassword ? "text" : "password"}
                      minLength={6}
                      placeholder="••••••••"
                      className="  w-full  bg-gray-50 border rounded-lg  px-4 py-3 pr-12 outline-none   focus:ring-2 focus:ring-purple-600   "
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className=" absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 "
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Confirm Password
                  </label>

                  <input
                    name="confirmPassword"
                    type="password"
                    minLength={6}
                    value={fromRegister.confirmPassword}
                    onChange={(e) =>
                      setFromRegister({
                        ...fromRegister,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="••••••••"
                    className="    w-full   bg-gray-50   border   rounded-lg   px-4 py-3   outline-none   focus:ring-2  focus:ring-purple-600 "
                  />
                </div>
              </div>

              {/* Terms */}

              <div className="flex items-start gap-3">
                <input
                  name="terms"
                  type="checkbox"
                  checked={fromRegister.terms}
                  onChange={(e) =>
                    setFromRegister({
                      ...fromRegister,
                      terms: e.target.checked,
                    })
                  }
                  className=" mt-1 w-5 h-5  "
                />

                <p className="text-sm text-gray-500">
                  I agree to the
                  <a className="  text-purple-700   font-semibold   mx-1  ">
                    Terms of Service
                  </a>
                  and
                  <a className="  text-purple-700  font-semibold mx-1 ">
                    Privacy Policy
                  </a>
                </p>
              </div>

              {/* Submit Button */}

              <button
                disabled={loading}
                type="submit"
                className=" disabled:opacity-50 disabled:cursor-not-allowed
                cursor-pointer  w-full bg-purple-700  text-white   py-3   rounded-xl  font-semibold  text-lg  hover:bg-purple-800  transition  "
              >
                {loading ? "Creating Account" : "  Create Account"}
              </button>
              {error && <p className="text-red-500 text-center">{error}</p>}
              {/* Login Link */}

              <div className=" text-center  pt-5 border-t ">
                <p className="text-sm text-gray-500">
                  Already have an account?
                  <Link
                    to="/login"
                    className="  text-purple-700 font-semibold   ml-1  "
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Trust Badges */}

          <div className="   mt-8   flex  flex-wrap  justify-center gap-8 text-gray-500  text-sm  ">
            <div>🔒 Secure Data Encryption</div>

            <div>✅ Elite Talent Verification</div>

            <div>💳 Escrow Protected Payments</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <FooterRegister />
    </div>
  );
}
