// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Link } from "react-router-dom";
// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log(email);

//     // هنا بعدين تبعت API
//   };

//   return (
//     <Card className="w-full max-w-sm mx-auto mt-20">
//       <CardHeader>
//         <CardTitle>Forgot Password?</CardTitle>
//       </CardHeader>

//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <Label className=" text-sm mb-2">Email Address</Label>

//             <Input
//               type="email"
//               placeholder="example@gmail.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <Button className="w-full cursor-pointer">Send Reset Link</Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${SERVER_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage(data.message);

      // ننتقل لصفحة إدخال الكود
      setTimeout(() => {
        navigate("/verify-reset-code", {
          state: {
            email: email.trim().toLowerCase(),
          },
        });
      }, 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-20">
      {" "}
      <CardHeader>
        {" "}
        <CardTitle>Forgot Password?</CardTitle>{" "}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label className="text-sm mb-2">Email Address</Label>

            <Input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {message && <p className="text-sm text-green-600">{message}</p>}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
