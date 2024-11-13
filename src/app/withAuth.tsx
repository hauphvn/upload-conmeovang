'use client';

import {ComponentType, useEffect} from "react";
import {isLoggedIn} from "@/auth";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    const AuthenticatedComponent: React.FC<P> = (props) => {
        useEffect(() => {
            // Check component is mounted
                if (!isLoggedIn()) {
                    window.location.href = '/'
                }

        }, []);
        return <WrappedComponent {...props}/>
    };
    return AuthenticatedComponent;
}
export default withAuth;
