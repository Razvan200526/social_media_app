import { Route, Routes } from "react-router-dom"
import SignInForm from "./auth/forms/SignInForm"
import SignUpForm from "./auth/forms/SignUpForm"
import AuthLayout from "./auth/AuthLayout"
import { RootLayout } from "./root/RootLayout"
import { Home } from "./root/Pages/Home"
export const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* {public routes} */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>
        {/* {private routes} */}
        <Route element={<RootLayout />} >
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </main>
  )
}

