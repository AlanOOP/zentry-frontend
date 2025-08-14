import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/AuthService";
import { Spinner } from "@/components/Spinner";
import DevTree from "@/components/DevTree";

export default function AppLayout() {

    const { data, isError, isLoading } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: 1,
        refetchOnWindowFocus: false
    })

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <Navigate to="auth/login" replace={true} />
    }

    if (data) return (
        <DevTree data={data} />
    )
}