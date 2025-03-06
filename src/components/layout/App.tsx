import { Separator } from "@radix-ui/react-separator";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar";

function App({ title, children }: { children: React.ReactNode, title: string }) {
  return (
    <SidebarInset>
      <header className="flex sticky top-0 gap-2 bg-background h-16 shrink-0 items-center border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <span className="text-2xl">{title}</span>
      </header>
      <div className="p-4">
        {children}
      </div>
    </SidebarInset>
  );
}

export default App;