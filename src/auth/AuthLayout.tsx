import { useState } from "react"
import { Outlet, Navigate } from "react-router-dom"
const AuthLayout = () => {
  const [isAuth, _setIsAuth] = useState<boolean>(false);
  return (
    <>
      {isAuth ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 items-center justify-center flex-col py-10">
            <Outlet />
          </section>
          <img src="/public/assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" />
        </>
      )}
    </>
  )
}

export default AuthLayout
