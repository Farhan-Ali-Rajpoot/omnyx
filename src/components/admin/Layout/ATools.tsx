import Link from "next/link";
import { SiGmail } from "react-icons/si";
import { BiImage, BiLinkExternal } from 'react-icons/bi';

const ATools = () => {
  return (
    <div className="w-full min-h-screen bg-neutral-950 p-6 md:pt-9">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Tools</h1>
          <p className="text-neutral-400 mt-2">Essential utilities for system management</p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <GmailTool />
          <ImageToTextTool />
          <FetchUrlTool />
        </div>
      </div>
    </div>
  );
};

export default ATools;

const ToolCard = ({ 
  children,
  icon,
  title,
  hoverBorderColor = 'neutral-600',
  href 
}: {
  children: React.ReactNode,
  icon: React.ReactNode,
  title: React.ReactNode,
  hoverBorderColor?: string,
  href: string
}) => (
  <Link
    href={href}
    className={`group block h-full rounded-xl border border-neutral-800 p-6 bg-neutral-900 hover:border-${hoverBorderColor} transition-colors duration-200`}
  >
    <div className="mb-4 flex items-center gap-3">
      <div className="text-3xl">
        {icon}
      </div>
      <h2 className="text-xl font-semibold text-white">
        {title}
      </h2>
    </div>
    <p className="text-neutral-400 text-sm leading-relaxed">
      {children}
    </p>
  </Link>
);

const GmailTool = () => (
  <ToolCard
    href="/admin/dashboard/tools/gmail"
    icon={<SiGmail className="text-[#EA4335]" />}
    title={
      <span className="flex gap-[1px]">
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#EA4335" }}>m</span>
        <span style={{ color: "#FBBC05" }}>a</span>
        <span style={{ color: "#34A853" }}>i</span>
        <span style={{ color: "#EA4335" }}>l</span>
      </span>
    }
    hoverBorderColor="red-500"
  >
    Send styled Gmail messages with customizable templates and tracking.
  </ToolCard>
);

const FetchUrlTool = () => (
  <ToolCard
    href="/admin/dashboard/tools/fetch-url"
    icon={<BiLinkExternal className="text-purple-400" />}
    title="Fetch URL"
    hoverBorderColor="red-500"
  >
    Send requests to any public URL and inspect the raw response. A minimal Postman-style fetcher.
  </ToolCard>
);

const ImageToTextTool = () => (
  <ToolCard
    href="/admin/dashboard/tools/image-to-text"
    icon={<BiImage className="text-sky-400" />}
    title="Image to Text"
    hoverBorderColor="red-500"
  >
    Extract text from images instantly using in-browser OCR. No storage, no upload—everything runs locally and privately.
  </ToolCard>
);

