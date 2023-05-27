import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
    // useSWR previne uso de Redux e não importa onde será usado, o fetch não irá acontecer novamente
    const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher)

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useCurrentUser;