import React, { useState } from "react"
// import { MenuIcon, XIcon } from "@heroicons/react/outline";

import { signOut, useSession } from "next-auth/react"

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false)
  const { data: session, status } = useSession()

  return <div>s</div>
}

export default Navbar
