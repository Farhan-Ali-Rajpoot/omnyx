// "use client";

// import React, { useState, useEffect } from "react";
// import Breadcrumb from "@/components/UI/Breadcrumb";
// import { Tooltip } from "@/components/UI/Tooltip";
// import { 
//   FiAlertCircle, 
//   FiBookOpen, 
//   FiEdit3, 
//   FiCheck, 
//   FiCamera, 
//   FiUser, 
//   FiMail,
//   FiHash,
//   FiCpu,
//   FiCheckCircle
// } from "react-icons/fi";

// // --- Interfaces ---
// interface UserType {
//   _id: string;
//   email: string;
//   name: string;
//   provider: string;
//   createdAt?: Date;
//   picture: string;
// }

// interface AccountProps {
//   user: Omit<UserType, "password" | "verified" | "name_normalized">;
//   pathname: string;
// }

// // --- Theme Configuration ---
// // Using specific colors that are eye-soothing or distinct as requested
// const THEMES = [
//   { id: "light", label: "Light", bg: "#F4F4F4", border: "#d4d4d4", ring: "#d4d4d4" },
//   { id: "dark", label: "Dark", bg: "#201d1d", border: "#404040", ring: "#525252" },
//   { id: "eye-saver", label: "Eye Saver", bg: "#fef3c7", border: "#fcd34d", ring: "#d97706" }, // Warm Yellowish
//   { id: "nature", label: "Nature", bg: "#ecfccb", border: "#bef264", ring: "#65a30d" }, // Lime
//   { id: "royal", label: "Royal", bg: "#312e81", border: "#4f46e5", ring: "#818cf8" }, // Indigo/Gold feel
// ];

// const Account = ({ user, pathname }: AccountProps) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [showSaved, setShowSaved] = useState(false);
//   const [activeTheme, setActiveTheme] = useState("dark"); 
  
//   const [formData, setFormData] = useState({
//     name: user.name,
//     email: user.email,
//   });

//   const handleSave = () => {
//     setIsEditing(false);
//     setShowSaved(true);
//     // Hide "Saved" message after 2 seconds
//     setTimeout(() => setShowSaved(false), 2000);
//   };

//   return (
//     <div className="w-full flex flex-col">
      
//       {/* --- Header Section --- */}
//       <div className="flex items-start justify-between py-[calc(var(--sfu)*1.5)]">
//         <Breadcrumb pathname={pathname} />
//         <div className="flex gap-[calc(var(--sfu)*0.5)]">
//           <Tooltip
//             position="bottom"
//             variant="rich"
//             icon={<FiBookOpen strokeWidth={1.5} />}
//             title="Account Settings"
//             content="Here you can change your account settings and preferences."
//           >
//             <div className="group/i rounded-[calc(var(--sfu)*0.25)] p-[calc(var(--sfu)*0.25)] bg-[var(--color-bg-surface)]">
//               <div className="rounded-[calc(var(--sfu)*0.25)] p-[calc(var(--sfu)*0.75)] group-hover/i:bg-[var(--color-bg-base)] text-[var(--color-text-base)]">
//                 <FiBookOpen strokeWidth={1.5} />
//               </div>
//             </div>
//           </Tooltip>
//           <Tooltip content="Report" position="bottom">
//             <div className="group/i rounded-[calc(var(--sfu)*0.25)] p-[calc(var(--sfu)*0.25)] bg-[var(--color-bg-surface)] cursor-pointer">
//               <div
//                 className="rounded-[calc(var(--sfu)*0.25)] p-[calc(var(--sfu)*0.75)] group-hover/i:bg-[var(--color-bg-base)] flex items-center 
//                           justify-center gap-[calc(var(--sfu)*0.5)] text-[var(--color-text-base)]"
//               >
//                 <FiAlertCircle strokeWidth={1.5}/>
//               </div>
//             </div>
//           </Tooltip>
//         </div>
//       </div>

//       {/* --- Main Content Container --- */}
//       {/* Added bottom padding so user can scroll theme section to center */}
//       <div className="
//         w-full flex flex-col items-center 
//         mt-[calc(var(--sfu)*2)] 
//         pb-[calc(var(--sfu)*15)]
//         gap-[calc(var(--sfu)*3)]
//       ">
        
//         {/* --- 1. Profile Information Card --- */}
//         <div className="
//           w-full max-w-4xl 
//           rounded-[calc(var(--sfu)*0.5)] 
//           bg-[var(--color-bg-surface)] 
//           overflow-hidden
//         ">
          
//           {/* Card Header */}
//           <div className="
//             w-full flex items-center justify-between 
//             p-[calc(var(--sfu)*1.5)] 
//             border-b-[length:calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)]
//           ">
//             {/* Heading: Larger, not just bolder */}
//             <h2 className="text-[calc(var(--sfu)*1.5)] font-medium text-[var(--color-text-base)]">
//               Profile Information
//             </h2>

//             {/* Edit / Save Button */}
//             {showSaved ? (
//               <span className="
//                 px-[calc(var(--sfu)*1)] py-[calc(var(--sfu)*0.5)]
//                 text-[calc(var(--sfu)*0.9)] text-[var(--color-icon-emerald)] font-medium
//                 animate-pulse
//               ">
//                 Saved
//               </span>
//             ) : (
//               <button
//                 onClick={() => isEditing ? handleSave() : setIsEditing(true)}
//                 className={`
//                   flex items-center 
//                   gap-[calc(var(--sfu)*0.5)] 
//                   px-[calc(var(--sfu)*1)] py-[calc(var(--sfu)*0.5)] 
//                   rounded-[calc(var(--sfu)*0.3)] 
//                   transition-all
//                   ${isEditing 
//                     ? "bg-[var(--color-electric-lime)] text-[var(--color-bg-action)]" 
//                     : "bg-[var(--color-bg-surface-emphasis)] text-[var(--color-text-base)] hover:bg-[var(--color-bg-base)]"}
//                 `}
//               >
//                 {/* Icon is 25% larger than text (text 0.85 * 1.25 ≈ 1.06) */}
//                 <span className="text-[calc(var(--sfu)*1.1)]">
//                    {isEditing ? <FiCheck strokeWidth={2.5} /> : <FiEdit3 strokeWidth={2.5} />}
//                 </span>
//                 <span className="text-[calc(var(--sfu)*0.9)] font-medium">
//                   {isEditing ? "Save" : "Edit"}
//                 </span>
//               </button>
//             )}
//           </div>

//           {/* Profile Content Body */}
//           <div className="
//             flex flex-col 
//             p-[calc(var(--sfu)*2)]
//             gap-[calc(var(--sfu)*2)]
//           ">
            
//             {/* Avatar Section - Centered, Large, No Border */}
//             <div className="w-full flex justify-center pb-[calc(var(--sfu)*1)]">
//                <div className="relative group cursor-pointer">
//                   <div className="
//                     w-[calc(var(--sfu)*8)] h-[calc(var(--sfu)*8)] 
//                     rounded-[calc(var(--sfu)*4)] 
//                     bg-[var(--color-bg-surface-emphasis)] 
//                     flex items-center justify-center
//                     text-[calc(var(--sfu)*3)] text-[var(--color-text-secondary)]
//                     overflow-hidden
//                   ">
//                     {user.picture ? (
//                       <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
//                     ) : (
//                       <FiUser />
//                     )}
//                   </div>
//                   {/* Upload Overlay */}
//                   <div className="
//                     absolute inset-0 bg-black/40 
//                     flex items-center justify-center 
//                     opacity-0 group-hover:opacity-100 transition-opacity 
//                     rounded-[calc(var(--sfu)*4)] text-white text-[calc(var(--sfu)*2)]
//                   ">
//                     <FiCamera />
//                   </div>
//                </div>
//                {/* No text under image as requested */}
//             </div>

//             {/* Inputs Grid - Mobile: Col, Desktop: 2-Col Grid */}
//             <div className="
//               grid grid-cols-1 
//               md:grid-cols-2 
//               gap-x-[calc(var(--sfu)*2)]
//               gap-y-[calc(var(--sfu)*1.5)]
//             ">
              
//               <InputGroup 
//                 label="Full Name" 
//                 icon={<FiUser />}
//                 value={formData.name} 
//                 isEditing={isEditing}
//                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//               />
              
//               <InputGroup 
//                 label="Email Address" 
//                 icon={<FiMail />}
//                 value={formData.email} 
//                 isEditing={isEditing} 
//                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//               />

//               <InputGroup 
//                 label="User ID" 
//                 icon={<FiHash />}
//                 value={user._id} 
//                 isEditing={false} 
//                 copyable
//               />

//               <InputGroup 
//                 label="Auth Provider" 
//                 icon={<FiCpu />}
//                 value={user.provider} 
//                 isEditing={false} 
//               />
              
//             </div>
//           </div>
//         </div>

//         {/* --- 2. Appearance & Theme --- */}
//         <div className="
//           w-full max-w-4xl 
//           rounded-[calc(var(--sfu)*0.5)] 
//           bg-[var(--color-bg-surface)] 
//           border-[length:calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)]
//         ">
//           <div className="
//             p-[calc(var(--sfu)*1.5)] 
//             border-b-[length:calc(var(--sfu)*0.0625)] border-[var(--color-border-surface)]
//           ">
//             <h2 className="text-[calc(var(--sfu)*1.5)] font-medium text-[var(--color-text-base)]">
//               Appearance
//             </h2>
//             <p className="
//               text-[calc(var(--sfu)*0.9)] text-[var(--color-text-secondary)] 
//               mt-[calc(var(--sfu)*0.5)]
//             ">
//               Customize how the workspace looks on your device.
//             </p>
//           </div>

//           <div className="p-[calc(var(--sfu)*2)]">
//             {/* Theme Grid: Mobile 2 cols, Desktop 5 cols */}
//             <div className="
//               grid grid-cols-2 
//               md:grid-cols-5 
//               gap-[calc(var(--sfu)*1.5)]
//             ">
//               {THEMES.map((theme) => (
//                 <button
//                   key={theme.id}
//                   onClick={() => setActiveTheme(theme.id)}
//                   className={`
//                     group relative flex flex-col items-center 
//                     gap-[calc(var(--sfu)*1)] 
//                     p-[calc(var(--sfu)*1)] 
//                     rounded-[calc(var(--sfu)*0.5)] 
//                     border-[length:calc(var(--sfu)*0.0625)] 
//                     transition-all duration-200
//                     ${activeTheme === theme.id 
//                       ? "bg-[var(--color-bg-surface-emphasis)]" 
//                       : "bg-transparent border-transparent hover:bg-[var(--color-bg-surface-hover)]"}
//                   `}
//                   // Dynamic border color for selection
//                   style={{
//                     borderColor: activeTheme === theme.id ? theme.ring : 'transparent'
//                   }}
//                 >
//                   {/* Theme Swatch */}
//                   <div 
//                     className="
//                       w-full aspect-square 
//                       rounded-[calc(var(--sfu)*0.4)] 
//                       shadow-sm relative overflow-hidden
//                     "
//                     style={{ 
//                       background: theme.bg, 
//                       border: `calc(var(--sfu)*0.0625) solid ${theme.border}` 
//                     }}
//                   >
//                      {/* Checkmark overlay for active */}
//                      {activeTheme === theme.id && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-white/10">
//                            <div className="
//                               bg-[var(--color-bg-action)] text-[var(--color-text-contrast)] 
//                               rounded-full p-[calc(var(--sfu)*0.25)]
//                             ">
//                               <FiCheck strokeWidth={4} size={14} />
//                            </div>
//                         </div>
//                      )}
//                   </div>
                  
//                   {/* Label */}
//                   <span className={`
//                     text-[calc(var(--sfu)*0.9)] font-medium
//                     ${activeTheme === theme.id ? "text-[var(--color-text-base)]" : "text-[var(--color-text-secondary)]"}
//                   `}>
//                     {theme.label}
//                   </span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// // --- Helper Components ---

// interface InputGroupProps {
//   label: string;
//   value: string;
//   isEditing: boolean;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   icon: React.ReactNode;
//   copyable?: boolean;
// }

// const InputGroup = ({ label, value, isEditing, onChange, icon, copyable }: InputGroupProps) => {
//   return (
//     <div className="flex flex-col gap-[calc(var(--sfu)*0.65)]">
//       <label className="
//         text-[calc(var(--sfu)*0.85)] font-medium 
//         text-[var(--color-text-secondary)] uppercase tracking-[calc(var(--sfu)*0.05)]
//       ">
//         {label}
//       </label>
//       <div className={`
//         relative flex items-center 
//         bg-[var(--color-bg-surface-emphasis)] 
//         rounded-[calc(var(--sfu)*0.3)] 
//         border-[length:calc(var(--sfu)*0.0625)]
//         transition-colors duration-200
//         ${isEditing 
//           ? "border-[var(--color-electric-indigo)] shadow-[0_0_0_1px_var(--color-electric-indigo)]" 
//           : "border-[var(--color-border-surface)]"}
//       `}>
//         <div className="
//           pl-[calc(var(--sfu)*1)] 
//           text-[var(--color-icon-muted)] text-[calc(var(--sfu)*1.1)]
//         ">
//           {icon}
//         </div>
//         <input
//           type="text"
//           value={value}
//           readOnly={!isEditing}
//           onChange={onChange}
//           className="
//             w-full bg-transparent border-none outline-none 
//             text-[var(--color-text-base)] 
//             p-[calc(var(--sfu)*1)] text-[calc(var(--sfu)*1)] font-medium
//           "
//         />
//         {copyable && !isEditing && (
//              <Tooltip content="Copy ID" position="top">
//                 <div className="
//                   pr-[calc(var(--sfu)*1)] 
//                   cursor-pointer text-[var(--color-text-secondary)] 
//                   hover:text-[var(--color-text-base)]
//                   text-[calc(var(--sfu)*1.1)]
//                 ">
//                     <FiCheckCircle /> 
//                 </div>
//             </Tooltip>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Account;