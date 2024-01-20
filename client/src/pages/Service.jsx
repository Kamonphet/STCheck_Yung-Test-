import React from "react";
import { categories } from "../data";
import Categories from "../component/Categories";
import { motion } from "framer-motion";


const Service = () => {
  const container = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      },
    },
  }
  return (
    <div className='section' id='service'>
      <div className="text-center">
        <div className="sm:text-3xl text-2xl font-bold mb-5 text-blue-500">
          Service
        </div>
        <p className="text-md text-gray leading-7 max-w-[700px] mx-auto ">
          We want STCheck Yung to be more than just a name checker. which is in the process of developing the system Currently the following services are available:
        </p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        className="grid md:grid-cols-2 sm:grid-cols-2 mt-12 gap-8"
      >
        {categories.map((category) => {
          return <Categories key={category.id} {...category} />;
        })}
      </motion.div>
    </div>
  )
}

export default Service