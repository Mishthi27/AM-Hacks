import React, { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import { useNavigate } from "react-router-dom";
import { BrowserProvider, Contract, parseUnits } from "ethers";
import MEMOXTokenABI from "../../abi/MEMOXToken.json";
import "./login.css";

export default function LoginPage() {
  const MEMOX_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const tiltRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
        glare: true,
      });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Simple check for this example, you can add API calls for actual authentication
    if (email === "Advika_Singhal" && password === "password") {
      // Save the username or email to localStorage
      localStorage.setItem("username", email);
      try {
        // Prompt MetaMask to connect
        if (!window.ethereum) {
          alert("MetaMask not found!");
          return;
        }
  
        await window.ethereum.request({ method: "eth_requestAccounts" });
  
        const provider = new BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
  
        const memoxContract = new Contract(
          MEMOX_CONTRACT_ADDRESS,
          MEMOXTokenABI,
          signer
        );
  
        // Transfer 5 MEMOX tokens to user
        const tx = await memoxContract.transfer(userAddress, parseUnits("5", 18));
        await tx.wait();
  
        console.log("5 MEMOX credited to:", userAddress);

      navigate("/dashboard"); // Redirect to Dashboard after successful login
      }catch (error) {
        console.error("Token credit failed:", error);
        alert("Error crediting MEMOX");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div ref={tiltRef} className="box">
          <div className="elements logo"></div>
          <div className="elements name">
            <h2>Login</h2>
          </div>
          <div className="elements content">
            <form 
            onSubmit={handleLogin}
            >
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login" type="submit">
                Login
              </button>
            </form>
          </div>
          <div className="card"></div>
        </div>
      </div>
    </div>
  );
}
