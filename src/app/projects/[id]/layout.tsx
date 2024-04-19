import { ReactNode } from "react";
import fetchItemData from "./fetch";
import { Button } from "@/components/ui/button";

export default async function Layout({ params, children }: { params: { id: string }, children: ReactNode }) {
    const { id } = params;
    const { name, items, categories } = await fetchItemData(id);
    return (
        <div className="space-y-6">
            <h1>{name}</h1>
            <div className="justify-between items-center flex gap-5">
                <Breadcrumb>
                    
                </Breadcrumb>
                <div className="justify-between items-center flex gap-2">
                    <Button variant={"secondary"}>
                        View Chart Chart
                    </Button>
                    <Button variant={"secondary"}>
                        Compare
                    </Button>
                </div>
            </div>
            <div className="relative">
                {children}
            </div>
        </div>
    )

}