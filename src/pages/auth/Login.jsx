import React from "react";
import { Button, Label, TextInput, Checkbox, Card } from "flowbite-react";

function Login() {
  return (
    <div className="pt-32">
      <Card className="w-full max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>

        <form className="space-y-4">
          {/* Contact Number Input */}
          <div>
            <Label htmlFor="contact" value="Contact Number" />
            <TextInput
              id="contact"
              type="tel"
              placeholder="0712345678"
              required
              pattern="[0-9]{10}" // Ensures only 10 digits are accepted
            />
          </div>

          {/* Password Input */}
          <div>
            <Label htmlFor="password" value="Your Password" />
            <TextInput
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" value="Remember me" />
          </div>

          {/* Submit Button */}
          <Button  type="submit" className="w-full bg-blue-500">
            Login
          </Button>
        </form>

        {/* Divider */}
        <div className="text-center text-gray-500 text-sm">
          <p className="mt-4">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Login;
