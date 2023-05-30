import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useDataList = (url: string) => {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading };
};

export default useDataList;