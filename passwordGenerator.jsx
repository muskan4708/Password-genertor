import React, { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [length, setLength] = useState(8);
const passwordRef=useRef(null)
  const PasswordGenerate = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()";
    }
    for (let i = 0; i < length; i++) {
      let char = str.charAt(Math.floor(Math.random() * str.length));
      pass += char;
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPassword =useCallback(()=>{
    passwordRef.current?.select()
window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => {
    PasswordGenerate();
  }, [length, numberAllowed, charAllowed, PasswordGenerate]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 my-9 mt-16 text-orange-500 bg-gray-300 py-3">
      <h1 className="text-white-400 text-center font-cursive">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button 
        onClick={copyPassword}
        className="outline-none bg-blue-300 text-white px-3 py-0.5 shrink-0 rounded-lg">
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(Number(e.target.value));
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            checked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
