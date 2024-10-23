import { TonClient } from "ton";
import { useInit } from "./useInit";

export function useTonClient() {
    return useInit(
        async () =>
            new TonClient({
                endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
                apiKey: "509a1c3746f03dd5cb9d8192209467d47d8f0392faa7077427520b2774e45dee"
            })
    );
}