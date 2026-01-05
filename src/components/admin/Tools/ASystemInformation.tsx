"use client";

import React, { useEffect, useState } from "react";
import {
  FaMicrochip,
  FaBatteryFull,
  FaClock,
  FaLanguage,
  FaMemory,
  FaTabletAlt,
  FaSignal,
  FaMobileAlt,
  FaRegCopy,
} from "react-icons/fa";
import { MdOutlineScreenSearchDesktop } from "react-icons/md";
import { SiNvidia, SiWebgl, SiAmd, SiIntel } from "react-icons/si";
import { FiCpu } from "react-icons/fi";
import ABackButton from "./ABackButton";

interface BatteryInfo {
  level: number;
  charging: boolean;
}

interface GPUInfo {
  vendor: string;
  renderer: string;
}

interface SystemInfo {
  os?: string;
  browser?: string;
  language?: string;
  online?: boolean;
  cores?: number;
  memory?: number;
  screen?: string;
  colorDepth?: number;
  timezone?: string;
  touchSupport?: boolean;
  battery?: BatteryInfo;
  gpu?: GPUInfo;
}

const ASystemInformation: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({});

  useEffect(() => {
    const getInfo = async () => {
      const battery = await (navigator as any).getBattery();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl");
      const debugInfo = gl?.getExtension("WEBGL_debug_renderer_info");

      const gpuVendor = debugInfo ? gl?.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : "N/A";
      const gpuRenderer = debugInfo ? gl?.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "N/A";

      setSystemInfo({
        os: navigator.platform,
        browser: navigator.userAgent,
        language: navigator.language,
        online: navigator.onLine,
        cores: navigator.hardwareConcurrency,
        memory: (navigator as any).deviceMemory,
        screen: `${screen.width} x ${screen.height}`,
        colorDepth: screen.colorDepth,
        timezone,
        touchSupport: "ontouchstart" in window,
        battery: {
          level: Math.round(battery.level * 100),
          charging: battery.charging,
        },
        gpu: {
          vendor: gpuVendor,
          renderer: gpuRenderer,
        },
      });
    };

    getInfo();
  }, []);

  const getGPUIcon = (vendor: string = "") => {
    if (vendor.includes("NVIDIA")) return <SiNvidia className="text-green-500" />;
    if (vendor.includes("AMD")) return <SiAmd className="text-red-500" />;
    if (vendor.includes("Intel")) return <SiIntel className="text-blue-400" />;
    return <SiWebgl className="text-purple-400" />;
  };

  const infoItems = [
    { icon: <FaTabletAlt className="text-blue-400" />, label: "OS / Platform", value: systemInfo.os },
    { icon: <MdOutlineScreenSearchDesktop className="text-purple-400" />, label: "Browser", value: systemInfo.browser },
    { icon: <FaLanguage className="text-green-400" />, label: "Language", value: systemInfo.language },
    { icon: <FiCpu className="text-amber-400" />, label: "CPU Cores", value: systemInfo.cores?.toString() },
    { icon: <FaMemory className="text-red-400" />, label: "Memory (GB)", value: systemInfo.memory?.toString() },
    { icon: <FaMobileAlt className="text-cyan-400" />, label: "Screen Resolution", value: systemInfo.screen },
    { icon: <FaSignal className={systemInfo.online ? "text-emerald-400" : "text-rose-400"} />, 
      label: "Online Status", 
      value: systemInfo.online ? "Connected" : "Offline" 
    },
    { icon: <FaClock className="text-violet-400" />, label: "Timezone", value: systemInfo.timezone },
    { 
      icon: <FaBatteryFull className={
        systemInfo?.battery?.level 
          ? systemInfo.battery.level < 20 
            ? "text-rose-400" 
            : systemInfo.battery.level < 50 
              ? "text-amber-400" 
              : "text-emerald-400"
          : "text-neutral-400"
      } />, 
      label: "Battery", 
      value: systemInfo?.battery 
        ? `${systemInfo.battery.level}% (${systemInfo.battery.charging ? "⚡ Charging" : "Not charging"})` 
        : "N/A" 
    },
    { 
      icon: systemInfo?.gpu?.vendor ? getGPUIcon(systemInfo.gpu.vendor) : <SiWebgl className="text-purple-400" />, 
      label: "GPU Vendor", 
      value: systemInfo?.gpu?.vendor 
    },
    { 
      icon: <SiWebgl className="text-indigo-400" />, 
      label: "GPU Renderer", 
      value: systemInfo?.gpu?.renderer 
    },
    { 
      icon: <FaMicrochip className={systemInfo.touchSupport ? "text-teal-400" : "text-neutral-400"} />, 
      label: "Touch Support", 
      value: systemInfo.touchSupport ? "✅ Supported" : "❌ Not supported" 
    },
  ];

  return (
    <div className="w-full min-h-screen bg-neutral-950 p-6">
      <ABackButton />














        
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white">System Information</h1>
          <p className="text-neutral-400 mt-2">Detailed hardware and software specifications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {infoItems.map((item, index) => (
            <InfoCard
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value }) => {
  const copyToClipboard = () => {
    if (value) {
      navigator.clipboard.writeText(value);
    }
  };

  return (
    <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-5 hover:border-neutral-600 transition-colors group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-xl">
            {icon}
          </div>
          <h3 className="font-medium text-white">{label}</h3>
        </div>
        {value && (
          <button
            onClick={copyToClipboard}
            className="text-neutral-500 hover:text-neutral-300 transition-colors opacity-0 group-hover:opacity-100"
            title="Copy to clipboard"
          >
            <FaRegCopy className="text-sm" />
          </button>
        )}
      </div>
      <p className="mt-3 text-neutral-300 text-sm break-words">
        {value || "Loading..."}
      </p>
    </div>
  );
};

export default ASystemInformation;