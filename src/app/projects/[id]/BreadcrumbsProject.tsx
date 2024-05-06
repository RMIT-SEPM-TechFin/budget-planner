'use client'

import { FC } from "react";

import Breadcrumbs from "@/components/Breadcrumbs";

import { useProject } from "./context";

const BreadcrumbProject: FC<{}> = () => {
    const { name } = useProject();

    return (
        <Breadcrumbs
            items={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: name}
            ]}
        />
    );
}

export default BreadcrumbProject;