import Breadcrumb from "@/components/UI/Breadcrumb";
import { FrontendRoutes } from "@/config/urls";
import { headers } from "next/headers";

export default async function page() {
  const pathname = (await headers()).get("x-pathname") || FrontendRoutes.app.base;
  return (
    <>
      <div className="w-full">
        {/* Header */}
        <div className="py-[calc(var(--sfu)*1.5)]">
          <Breadcrumb pathname={pathname} />
        </div>
        <p className="text-9xl p-32 tracking-tighter min-h-[300vh]">
          The platform
        </p>
      </div>
    </>
  );
}
