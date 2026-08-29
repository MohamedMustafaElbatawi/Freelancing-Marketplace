import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Sparkles, Lightbulb } from "lucide-react";
const suggestedSkills = [
  "React",
  "Node",
  "MySQL",
  "MongoDB",
  "Tailwind CSS",
  "Python",
  "UX Design",
  "UI Design",
  "Frontend",
  "Backend",
  "Fullstack",
];
function SkillsInfo({ formData, setFormData }) {
  const [customSkill, setCustomSkill] = useState("");
  const [searchSkill, setSearchSkill] = useState("");
  const [open, setOpen] = useState(false);

  const handleAddSkill = () => {
    addSkill(customSkill);
    setCustomSkill("");

    setOpen(false);
  };
  const addSkill = (skill) => {
    const newSkill = skill.trim();

    if (!newSkill) return;

    const exists = formData.skills.some(
      (item) => item.toLowerCase() === newSkill.toLowerCase(),
    );

    if (!exists) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
    }
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item !== skill),
    }));
  };

  return (
    <div className="w-full h-full bg-white rounded-xl p-5">
      <div>
        <h1 className="font-bold text-xl mb-2">What skills are required?</h1>
        <p className="text-sm text-gray-500">
          We'll use these to match you with the best-fit freelancers for your
          project.
        </p>
      </div>

      <div className="mt-4">
        <h1 className="font-bold text-sm mb-2"> Skills</h1>

        <div className="border border-gray-300 rounded-lg p-3  flex flex-wrap gap-2 focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-500/20 ">
          {formData.skills.map((skill) => (
            <div
              key={skill}
              className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}

              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-red-500 transition-all duration-300 cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}

          <input
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            className="flex-1 outline-none min-w-[150px]"
          />
        </div>
      </div>

      {/* Suggested Skills */}
      <div className="bg-white rounded-xl  mt-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold text-gray-900">
            Suggested based on your job category
          </h3>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={
                <button className="text-indigo-600 hover:underline cursor-pointer">
                  Click to add
                </button>
              }
            />

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Custom Skill</DialogTitle>
                <DialogDescription>
                  Add a custom skill for your project.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-2">
                <Label htmlFor="skill">Skill</Label>

                <Input
                  id="skill"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  placeholder="Enter skill"
                />
              </div>

              <DialogFooter>
                <DialogClose
                  render={
                    <Button variant="outline" className={"cursor-pointer"}>
                      Cancel
                    </Button>
                  }
                />

                <Button onClick={handleAddSkill} className={"cursor-pointer"}>
                  Add Skill
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-wrap gap-3">
          {suggestedSkills.map((skill) => (
            <button
              key={skill}
              disabled={formData.skills.includes(skill)}
              onClick={() => addSkill(skill)}
              className={`${
                formData.skills.includes(skill)
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              } flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all`}
            >
              <Plus size={18} />
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Add Custom Skill */}
        <div className="bg-white rounded-xl shadow border p-6">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
            <Sparkles className="text-indigo-600" size={22} />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Can't find a skill?
          </h3>

          <p className="text-gray-500 mb-5">
            You can add your own custom skill if it isn't available in our
            database.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 text-indigo-600 font-semibold hover:gap-3 transition-all cursor-pointer"
          >
            Add Custom Skill
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Pro Tip */}
        <div className="relative overflow-hidden rounded-xl border border-indigo-200 bg-indigo-50 p-6">
          {/* Background decoration */}
          <div
            className="
    absolute 
    -right-10 
    -bottom-10 
    h-40 
    w-40 
    rounded-full 
    bg-indigo-200 
    opacity-20 
    blur-3xl
    "
          />

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-3">
              <Lightbulb size={20} />

              <span className="text-sm uppercase tracking-wide">Pro Tip</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Quality over quantity
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              Selecting{" "}
              <strong className="text-gray-900">3-5 high-impact skills</strong>{" "}
              attracts higher-quality freelancers than adding a long list of
              unrelated skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsInfo;
