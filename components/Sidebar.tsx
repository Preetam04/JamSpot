"use client";
import { Menu, PanelRightOpen } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      <div className=" py-5 px-8 flex items-center gap-2.5">
        <Menu
          size={30}
          className="cursor-pointer text-foreground/60"
          onClick={() => {
            setSidebarOpen((prev) => !prev);
          }}
        />
        <Logo />
      </div>
      <motion.div
        className="h-screen w-4/5 max-w-72 bg-slate-900 fixed top-0 px-4 py-6"
        animate={!sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        <div className=" flex items-center justify-between">
          <Logo />
          <PanelRightOpen
            className="text-foreground/60 cursor-pointer "
            onClick={() => {
              setSidebarOpen((prev) => !prev);
            }}
            size={24}
          />
        </div>
      </motion.div>
      {/* {sidebarOpen && (
      )} */}
    </>
  );
};

export default Sidebar;
