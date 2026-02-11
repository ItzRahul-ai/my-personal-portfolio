import React from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", level: 95 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "React", level: 75 },
  { name: "Tailwind CSS", level: 85 },
  { name: "Node.js", level: 70 },
  { name: "Java", level: 60 },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative min-h-screen bg-[#06121e] text-white py-24 px-6 overflow-hidden"
    >
      {/* Animated Background Glow */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-cyan-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full animate-pulse"></div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl font-bold tracking-wide">
          My <span className="text-cyan-400">Skills</span>
        </h2>
        <p className="text-gray-400 mt-4">
          Technologies I work with & love
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="relative z-10 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-[#0f2236]/80 backdrop-blur-lg p-6 rounded-2xl border border-cyan-400/20 
                       hover:border-cyan-400 hover:shadow-cyan-500/30 
                       hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-between mb-3">
              <span className="font-semibold text-lg">{skill.name}</span>
              <span className="text-cyan-400">{skill.level}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1.2, delay: 0.3 }}
                viewport={{ once: true }}
                className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md shadow-cyan-500/50"
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
