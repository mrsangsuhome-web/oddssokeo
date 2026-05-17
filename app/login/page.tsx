"use client"

import { useState } from "react"

export default function LoginPage() {

  console.log("LOGIN PAGE ACTIVE")

  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [message, setMessage] =
    useState("")

  const login = async () => {

    console.log("LOGIN CLICKED")

    try {

      const res = await fetch(

        "http://127.0.0.1:5000/login",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({

            username,

            password

          })

        }

      )

      const data = await res.json()

      console.log(data)

      if (data.success) {

        localStorage.setItem(

          "loggedIn",

          "true"

        )

        window.location.href = "/"

      } else {

        setMessage(data.message)

      }

    } catch (err) {

      console.log(err)

      setMessage(

        "Cannot connect server"

      )

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#eef1f5]">

      <div className="bg-white p-10 rounded-2xl border border-zinc-300 w-[420px]">

        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">

          Login

        </h1>

        <input
          type="text"
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border border-zinc-300 rounded-xl px-4 py-3 mb-4"
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
        >

          LOGIN

        </button>

        {message && (

          <div className="mt-5 text-center text-red-500 font-bold">

            {message}

          </div>

        )}

        <button
          onClick={() => {

            window.location.href =
              "/register"

          }}
          className="w-full mt-5 bg-green-600 text-white py-3 rounded-xl font-bold"
        >

          CREATE ACCOUNT

        </button>

      </div>

    </div>

  )

}