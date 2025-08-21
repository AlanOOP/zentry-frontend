import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import { getUser } from "@/services/AuthService";
import { Spinner } from "@/components/Spinner";
import DevTree from "@/components/DevTree";
import { useEffect } from "react";

export default function AppLayout() {

    const setUser = useUserStore((state) => state.setUser);
    const setIsLoading = useUserStore((state) => state.setIsLoading);

    const { data, isError, isLoading: queryLoading, isFetching } = useQuery({
        queryFn: getUser,
        queryKey: ['user'],
        retry: false,
        refetchOnWindowFocus: false
    })

    useEffect(() => {
        setIsLoading(queryLoading || isFetching);
  }, [queryLoading, isFetching, setIsLoading]);

    useEffect(() => {
        if (data) setUser(data);
    }, [data, setUser]);

    

    if (queryLoading) {
        return <Spinner />
    }

    if (isError) {
        return <Navigate to="auth/login" replace={true} />
    }

    if (data) return (

        <DevTree data={data} />
    )
}